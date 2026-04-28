import { spawn } from "node:child_process";
import path from "node:path";

function getAllowedRoot() {
  return path.resolve(process.env.GITLAB_ALLOWED_ROOT ?? process.cwd());
}

function getExpectedGitLabHost() {
  return String(process.env.GITLAB_HOST ?? "gitlab.ggg.com.vn").trim().toLowerCase();
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
        reject(new Error(result.stderr || result.stdout || `Command failed with exit code ${result.code}`));
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

async function ensureRepository(repoPath) {
  const resolvedRepoPath = resolveRepoPath(repoPath);

  if (!await isGitRepository(resolvedRepoPath)) {
    throw new Error(`No Git repository found at ${resolvedRepoPath}`);
  }

  return resolvedRepoPath;
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

export function parseGitLabRemote(remoteUrl, expectedHost = getExpectedGitLabHost()) {
  if (!remoteUrl) {
    return null;
  }

  const normalizedExpectedHost = String(expectedHost).trim().toLowerCase();
  const scpMatch = remoteUrl.match(/^(?<user>[^@]+)@(?<host>[^:]+):(?<ownerPath>.+)$/);

  if (scpMatch?.groups) {
    const host = scpMatch.groups.host.toLowerCase();

    return {
      url: remoteUrl,
      protocol: "ssh-scp",
      host,
      ownerPath: scpMatch.groups.ownerPath,
      hostMatchesExpected: host === normalizedExpectedHost,
    };
  }

  try {
    const parsed = new URL(remoteUrl);
    const protocol = parsed.protocol.replace(/:$/, "") || "unknown";
    const host = parsed.hostname.toLowerCase();
    const ownerPath = parsed.pathname.replace(/^\/+/, "");

    return {
      url: remoteUrl,
      protocol,
      host,
      ownerPath,
      hostMatchesExpected: host === normalizedExpectedHost,
    };
  } catch {
    return {
      url: remoteUrl,
      protocol: "unknown",
      host: "",
      ownerPath: "",
      hostMatchesExpected: false,
    };
  }
}

async function getCurrentBranch(repoPath) {
  const result = await runGit(["branch", "--show-current"], repoPath);

  if (!result.stdout) {
    throw new Error("Cannot determine current branch. Checkout a branch before using the GitLab MCP.");
  }

  return result.stdout;
}

async function getUpstreamInfo(repoPath, branch) {
  const remoteResult = await runGit(
    ["config", "--get", `branch.${branch}.remote`],
    repoPath,
    { allowedExitCodes: [0, 1] },
  );
  const mergeResult = await runGit(
    ["config", "--get", `branch.${branch}.merge`],
    repoPath,
    { allowedExitCodes: [0, 1] },
  );

  if (!remoteResult.stdout || !mergeResult.stdout) {
    return null;
  }

  const mergeRef = mergeResult.stdout;

  return {
    remoteName: remoteResult.stdout,
    mergeRef,
    branch: mergeRef.startsWith("refs/heads/") ? mergeRef.slice("refs/heads/".length) : mergeRef,
  };
}

function selectRemoteDetails(remotes, remoteName, expectedHost = getExpectedGitLabHost()) {
  const remote = remotes[remoteName];

  if (!remote) {
    return null;
  }

  const candidates = [
    ["push", remote.push],
    ["fetch", remote.fetch],
  ]
    .filter(([, url]) => Boolean(url))
    .map(([direction, url]) => ({
      direction,
      ...parseGitLabRemote(url, expectedHost),
    }));

  const matchingCandidate = candidates.find((candidate) => candidate.hostMatchesExpected) ?? candidates[0] ?? null;

  if (!matchingCandidate) {
    return null;
  }

  return {
    remoteName,
    fetchUrl: remote.fetch ?? "",
    pushUrl: remote.push ?? "",
    selectedDirection: matchingCandidate.direction,
    selectedUrl: matchingCandidate.url,
    protocol: matchingCandidate.protocol,
    host: matchingCandidate.host,
    ownerPath: matchingCandidate.ownerPath,
    hostMatchesExpected: matchingCandidate.hostMatchesExpected,
  };
}

function formatAuthOrHostError(message, remoteDetails) {
  if (!message) {
    return null;
  }

  if (!/Permission denied|Authentication failed|Could not read from remote repository|Could not resolve hostname|access rights/i.test(message)) {
    return null;
  }

  return [
    `GitLab authentication or reachability failed for remote '${remoteDetails.remoteName}'.`,
    `Expected host: ${getExpectedGitLabHost()}.`,
    `Remote URL used by Git: ${remoteDetails.fetchUrl || remoteDetails.pushUrl || remoteDetails.selectedUrl}.`,
    `Original error: ${message}`,
  ].join(" ");
}

function ensureGitLabRemote(remoteDetails) {
  if (!remoteDetails) {
    throw new Error("Cannot resolve tracked remote details for the current branch.");
  }

  if (!remoteDetails.hostMatchesExpected) {
    throw new Error(
      `Tracked remote '${remoteDetails.remoteName}' does not match expected GitLab host '${getExpectedGitLabHost()}'.`,
    );
  }
}

async function loadRepositoryState(repoPath) {
  const resolvedRepoPath = await ensureRepository(repoPath);
  const statusResult = await runGit(
    ["status", "--short", "--branch", "--porcelain=v1", "--untracked-files=all"],
    resolvedRepoPath,
  );
  const remotesResult = await runGit(["remote", "-v"], resolvedRepoPath);
  const status = parseGitStatusPorcelain(statusResult.stdout);
  const branch = status.branch || await getCurrentBranch(resolvedRepoPath);
  const upstream = branch ? await getUpstreamInfo(resolvedRepoPath, branch) : null;
  const remotes = parseGitRemotes(remotesResult.stdout);
  const gitLabRemote = upstream
    ? selectRemoteDetails(remotes, upstream.remoteName)
    : null;

  return {
    repoPath: resolvedRepoPath,
    branch,
    upstream,
    remotes,
    gitLabRemote,
    ...status,
  };
}

export async function inspectRepository(repoPath) {
  const repository = await loadRepositoryState(repoPath);

  return {
    allowedRoot: getAllowedRoot(),
    expectedGitLabHost: getExpectedGitLabHost(),
    repoPath: repository.repoPath,
    branch: repository.branch,
    branchSummary: repository.branchSummary,
    staged: repository.staged,
    unstaged: repository.unstaged,
    untracked: repository.untracked,
    clean: repository.clean,
    remotes: repository.remotes,
    upstream: repository.upstream,
    gitLabRemote: repository.gitLabRemote,
  };
}

export async function pullCurrentBranch(repoPath) {
  const repository = await loadRepositoryState(repoPath);

  if (!repository.clean) {
    throw new Error("Working tree must be clean before pull_current_branch. Commit or stash changes first.");
  }

  if (!repository.upstream) {
    throw new Error(`Current branch '${repository.branch}' does not have an upstream configured.`);
  }

  ensureGitLabRemote(repository.gitLabRemote);

  try {
    const result = await runGit(
      ["pull", "--ff-only", repository.upstream.remoteName, repository.upstream.branch],
      repository.repoPath,
      {
        env: {
          GIT_TERMINAL_PROMPT: "0",
        },
      },
    );

    return {
      repoPath: repository.repoPath,
      branch: repository.branch,
      upstream: repository.upstream,
      gitLabRemote: repository.gitLabRemote,
      output: result.stdout || result.stderr || "Pull completed.",
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const authError = formatAuthOrHostError(message, repository.gitLabRemote);

    if (authError) {
      throw new Error(authError);
    }

    if (/fast-forward|Not possible to fast-forward/i.test(message)) {
      throw new Error(
        `Fast-forward only pull failed for '${repository.branch}' because the local branch is not a fast-forward of '${repository.upstream.remoteName}/${repository.upstream.branch}'.`,
      );
    }

    throw new Error(message);
  }
}

export async function pushCurrentBranch(repoPath, options = {}) {
  const {
    dryRun = false,
  } = options;
  const repository = await loadRepositoryState(repoPath);

  if (!repository.upstream) {
    throw new Error(`Current branch '${repository.branch}' does not have an upstream configured.`);
  }

  ensureGitLabRemote(repository.gitLabRemote);

  try {
    const args = ["push"];

    if (dryRun) {
      args.push("--dry-run");
    }

    args.push(repository.upstream.remoteName, `HEAD:${repository.upstream.branch}`);

    const result = await runGit(args, repository.repoPath, {
      env: {
        GIT_TERMINAL_PROMPT: "0",
      },
    });

    return {
      repoPath: repository.repoPath,
      branch: repository.branch,
      upstream: repository.upstream,
      gitLabRemote: repository.gitLabRemote,
      dryRun,
      output: result.stdout || result.stderr || "Push completed.",
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const authError = formatAuthOrHostError(message, repository.gitLabRemote);

    if (authError) {
      throw new Error(authError);
    }

    throw new Error(message);
  }
}
