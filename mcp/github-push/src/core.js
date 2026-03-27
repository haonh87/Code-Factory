import { spawn } from "node:child_process";
import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";

function getAllowedRoot() {
  return path.resolve(process.env.GITHUB_PUSH_ALLOWED_ROOT ?? process.cwd());
}

function normalizeGitPath(value) {
  return value.replace(/\\/g, "/");
}

function isPathInside(childPath, parentPath) {
  const relative = path.relative(parentPath, childPath);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

export function resolveRepoPath(repoPath, allowedRoot = getAllowedRoot()) {
  const root = path.resolve(allowedRoot);
  const candidate = path.resolve(repoPath ?? root);

  if (!isPathInside(candidate, root)) {
    throw new Error(`Repository path must stay inside allowed root: ${root}`);
  }

  return candidate;
}

async function runCommand(command, args, options = {}) {
  const {
    cwd,
    env,
    allowedExitCodes = [0],
  } = options;

  return await new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      env: {
        ...process.env,
        ...env,
      },
      shell: false,
      windowsHide: true,
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", (error) => {
      reject(error);
    });

    child.on("close", (code) => {
      const result = {
        code: code ?? -1,
        stdout: stdout.trim(),
        stderr: stderr.trim(),
      };

      if (!allowedExitCodes.includes(result.code)) {
        const message = result.stderr || result.stdout || `Command failed with exit code ${result.code}`;
        reject(new Error(message));
        return;
      }

      resolve(result);
    });
  });
}

async function runGit(args, repoPath, options = {}) {
  const resolvedRepoPath = resolveRepoPath(repoPath);

  return await runCommand(
    "git",
    [
      "-C",
      resolvedRepoPath,
      "-c",
      `safe.directory=${normalizeGitPath(resolvedRepoPath)}`,
      ...args,
    ],
    options,
  );
}

async function isGitRepository(repoPath) {
  const resolvedRepoPath = resolveRepoPath(repoPath);
  const result = await runGit(
    ["rev-parse", "--is-inside-work-tree"],
    resolvedRepoPath,
    { allowedExitCodes: [0, 128] },
  );

  return result.code === 0 && result.stdout === "true";
}

function parseBranchSummary(line) {
  const summary = line.startsWith("## ") ? line.slice(3) : "";
  const branchToken = summary.split(" ")[0] ?? "";

  return {
    summary,
    branch: branchToken.split("...")[0] ?? "",
  };
}

export function parseGitStatusPorcelain(output) {
  const lines = output
    .split(/\r?\n/)
    .filter(Boolean);

  const branchLine = lines[0]?.startsWith("## ") ? lines.shift() : "";
  const branchSummary = parseBranchSummary(branchLine ?? "");
  const staged = [];
  const unstaged = [];
  const untracked = [];

  for (const line of lines) {
    const status = line.slice(0, 2);
    const filePath = line.slice(3);

    if (status === "??") {
      untracked.push(filePath);
      continue;
    }

    if (status[0] && status[0] !== " ") {
      staged.push(filePath);
    }

    if (status[1] && status[1] !== " ") {
      unstaged.push(filePath);
    }
  }

  return {
    branch: branchSummary.branch,
    branchSummary: branchSummary.summary,
    staged,
    unstaged,
    untracked,
    clean: staged.length === 0 && unstaged.length === 0 && untracked.length === 0,
  };
}

export function parseGitRemotes(output) {
  const lines = output
    .split(/\r?\n/)
    .filter(Boolean);

  const remotes = {};

  for (const line of lines) {
    const match = line.match(/^(\S+)\s+(\S+)\s+\((fetch|push)\)$/);

    if (!match) {
      continue;
    }

    const [, name, url, type] = match;

    remotes[name] ??= {};
    remotes[name][type] = url;
  }

  return remotes;
}

export async function ensureRepository(repoPath, options = {}) {
  const {
    initializeIfMissing = false,
    initialBranch = "main",
  } = options;

  const resolvedRepoPath = resolveRepoPath(repoPath);

  if (await isGitRepository(resolvedRepoPath)) {
    return {
      repoPath: resolvedRepoPath,
      initializedRepository: false,
    };
  }

  if (!initializeIfMissing) {
    throw new Error(`No Git repository found at ${resolvedRepoPath}`);
  }

  await fs.mkdir(resolvedRepoPath, { recursive: true });
  await runGit(["init", "--initial-branch", initialBranch], resolvedRepoPath);

  return {
    repoPath: resolvedRepoPath,
    initializedRepository: true,
  };
}

async function getRemoteUrl(repoPath, remoteName = "origin") {
  const result = await runGit(
    ["remote", "get-url", remoteName],
    repoPath,
    { allowedExitCodes: [0, 2] },
  );

  if (result.code !== 0 || !result.stdout) {
    throw new Error(`Remote '${remoteName}' is not configured`);
  }

  return result.stdout;
}

async function getCurrentBranch(repoPath) {
  const result = await runGit(["branch", "--show-current"], repoPath);

  if (!result.stdout) {
    throw new Error("Cannot determine current branch. Create or checkout a branch before pushing.");
  }

  return result.stdout;
}

export async function inspectRepository(repoPath, options = {}) {
  const {
    initializeIfMissing = false,
    initialBranch = "main",
  } = options;

  const repository = await ensureRepository(repoPath, {
    initializeIfMissing,
    initialBranch,
  });

  const statusResult = await runGit(
    ["status", "--short", "--branch", "--porcelain=v1", "--untracked-files=all"],
    repository.repoPath,
  );
  const remotesResult = await runGit(["remote", "-v"], repository.repoPath);

  return {
    allowedRoot: getAllowedRoot(),
    repoPath: repository.repoPath,
    initializedRepository: repository.initializedRepository,
    ...parseGitStatusPorcelain(statusResult.stdout),
    remotes: parseGitRemotes(remotesResult.stdout),
  };
}

export async function configureRemote(repoPath, remoteUrl, remoteName = "origin") {
  const repository = await ensureRepository(repoPath);
  const resolvedRepoPath = repository.repoPath;
  const hasRemote = await runGit(
    ["remote", "get-url", remoteName],
    resolvedRepoPath,
    { allowedExitCodes: [0, 2] },
  );

  if (hasRemote.code === 0) {
    await runGit(["remote", "set-url", remoteName, remoteUrl], resolvedRepoPath);
  } else {
    await runGit(["remote", "add", remoteName, remoteUrl], resolvedRepoPath);
  }

  return {
    repoPath: resolvedRepoPath,
    remoteName,
    remoteUrl,
  };
}

export async function commitAllChanges(repoPath, message, options = {}) {
  const {
    authorName,
    authorEmail,
  } = options;
  const repository = await ensureRepository(repoPath);
  const resolvedRepoPath = repository.repoPath;

  if ((authorName && !authorEmail) || (!authorName && authorEmail)) {
    throw new Error("authorName and authorEmail must be provided together");
  }

  await runGit(["add", "-A", "--", "."], resolvedRepoPath);

  const diffResult = await runGit(
    ["diff", "--cached", "--quiet"],
    resolvedRepoPath,
    { allowedExitCodes: [0, 1] },
  );

  if (diffResult.code === 0) {
    return {
      repoPath: resolvedRepoPath,
      committed: false,
      message: "No staged changes to commit after git add -A.",
    };
  }

  const commitEnv = authorName
    ? {
        GIT_AUTHOR_NAME: authorName,
        GIT_AUTHOR_EMAIL: authorEmail,
        GIT_COMMITTER_NAME: authorName,
        GIT_COMMITTER_EMAIL: authorEmail,
      }
    : {};

  await runGit(["commit", "-m", message], resolvedRepoPath, { env: commitEnv });
  const headResult = await runGit(["rev-parse", "HEAD"], resolvedRepoPath);

  return {
    repoPath: resolvedRepoPath,
    committed: true,
    commit: headResult.stdout,
    message,
  };
}

function getGitHubToken() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    throw new Error("GITHUB_TOKEN is required for GitHub API operations");
  }

  return token;
}

export async function createGitHubRepository(options) {
  const {
    name,
    description = "",
    privateRepo = true,
    ownerType = "user",
    owner,
    homepage,
  } = options;

  const token = getGitHubToken();

  if (ownerType === "org" && !owner) {
    throw new Error("owner is required when ownerType='org'");
  }

  const endpoint = ownerType === "org"
    ? `https://api.github.com/orgs/${encodeURIComponent(owner)}/repos`
    : "https://api.github.com/user/repos";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "@code-factory/github-push-mcp",
    },
    body: JSON.stringify({
      name,
      description,
      private: privateRepo,
      homepage,
      auto_init: false,
    }),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message ?? `GitHub API returned ${response.status}`);
  }

  return {
    name: payload.name,
    fullName: payload.full_name,
    private: payload.private,
    htmlUrl: payload.html_url,
    cloneUrl: payload.clone_url,
    sshUrl: payload.ssh_url,
    defaultBranch: payload.default_branch,
    owner: payload.owner?.login,
  };
}

async function createAskPassScript() {
  const fileName = `github-push-askpass-${process.pid}-${Date.now()}${process.platform === "win32" ? ".cmd" : ".sh"}`;
  const filePath = path.join(os.tmpdir(), fileName);
  const script = process.platform === "win32"
    ? "@echo off\r\nset prompt=%~1\r\necho %prompt% | findstr /I \"Username\" >nul\r\nif %errorlevel%==0 (\r\n  echo %GITHUB_PUSH_USERNAME%\r\n) else (\r\n  echo %GITHUB_PUSH_TOKEN%\r\n)\r\n"
    : "#!/usr/bin/env sh\ncase \"$1\" in\n  *Username*) printf \"%s\\n\" \"$GITHUB_PUSH_USERNAME\" ;;\n  *) printf \"%s\\n\" \"$GITHUB_PUSH_TOKEN\" ;;\nesac\n";

  await fs.writeFile(filePath, script, "utf8");

  if (process.platform !== "win32") {
    await fs.chmod(filePath, 0o700);
  }

  return {
    filePath,
    cleanup: async () => {
      await fs.rm(filePath, { force: true });
    },
  };
}

async function buildPushEnvironment(remoteUrl) {
  const baseEnv = {
    GIT_TERMINAL_PROMPT: "0",
  };

  if (!remoteUrl.startsWith("https://github.com/")) {
    return {
      env: baseEnv,
      cleanup: async () => {},
    };
  }

  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return {
      env: baseEnv,
      cleanup: async () => {},
    };
  }

  const username = process.env.GITHUB_USERNAME;

  if (!username) {
    throw new Error("GITHUB_USERNAME is required when using GITHUB_TOKEN for HTTPS GitHub pushes");
  }

  const askPass = await createAskPassScript();

  return {
    env: {
      ...baseEnv,
      GIT_ASKPASS: askPass.filePath,
      GITHUB_PUSH_USERNAME: username,
      GITHUB_PUSH_TOKEN: token,
    },
    cleanup: askPass.cleanup,
  };
}

export async function pushCurrentBranch(repoPath, options = {}) {
  const {
    branch,
    remoteName = "origin",
    setUpstream = true,
    dryRun = false,
  } = options;
  const repository = await ensureRepository(repoPath);
  const resolvedRepoPath = repository.repoPath;
  const resolvedBranch = branch || await getCurrentBranch(resolvedRepoPath);
  const remoteUrl = await getRemoteUrl(resolvedRepoPath, remoteName);
  const pushEnvironment = await buildPushEnvironment(remoteUrl);

  try {
    const args = ["push"];

    if (setUpstream) {
      args.push("-u");
    }

    if (dryRun) {
      args.push("--dry-run");
    }

    args.push(remoteName, resolvedBranch);

    const result = await runGit(args, resolvedRepoPath, { env: pushEnvironment.env });

    return {
      repoPath: resolvedRepoPath,
      branch: resolvedBranch,
      remoteName,
      remoteUrl,
      dryRun,
      output: result.stdout || result.stderr || "Push completed.",
    };
  } finally {
    await pushEnvironment.cleanup();
  }
}

export async function publishRepositoryToGitHub(options) {
  const {
    repoPath,
    initialBranch = "main",
    repoName,
    description = "",
    privateRepo = true,
    ownerType = "user",
    owner,
    remoteName = "origin",
    branch,
    remoteProtocol = "https",
    commitMessage,
    authorName,
    authorEmail,
    setUpstream = true,
    dryRun = false,
  } = options;

  const repository = await ensureRepository(repoPath, {
    initializeIfMissing: true,
    initialBranch,
  });

  const commitResult = commitMessage
    ? await commitAllChanges(repository.repoPath, commitMessage, {
        authorName,
        authorEmail,
      })
    : null;

  const createdRepository = await createGitHubRepository({
    name: repoName,
    description,
    privateRepo,
    ownerType,
    owner,
  });
  const remoteUrl = remoteProtocol === "ssh"
    ? createdRepository.sshUrl
    : createdRepository.cloneUrl;

  await configureRemote(repository.repoPath, remoteUrl, remoteName);

  const pushResult = await pushCurrentBranch(repository.repoPath, {
    branch,
    remoteName,
    setUpstream,
    dryRun,
  });

  return {
    repoPath: repository.repoPath,
    initializedRepository: repository.initializedRepository,
    commit: commitResult,
    repository: createdRepository,
    remoteUrl,
    push: pushResult,
  };
}
