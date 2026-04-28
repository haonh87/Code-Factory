import test from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";

import {
  inspectRepository,
  parseGitLabRemote,
  pushCurrentBranch,
  pullCurrentBranch,
  resolveRepoPath,
} from "../src/core.js";

async function runCommand(command, args, options = {}) {
  return await new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: options.cwd,
      env: {
        ...process.env,
        ...options.env,
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

    child.on("error", reject);
    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(stderr.trim() || stdout.trim() || `Command failed: ${command}`));
        return;
      }

      resolve({
        stdout: stdout.trim(),
        stderr: stderr.trim(),
      });
    });
  });
}

async function runGit(repoPath, args, options = {}) {
  const hooksPath = options.hooksPath ?? path.join(repoPath, ".no-hooks");

  return await runCommand("git", ["-C", repoPath, "-c", `core.hooksPath=${hooksPath}`, ...args], options);
}

async function configureIdentity(repoPath) {
  await runGit(repoPath, ["config", "user.name", "Codex Test"]);
  await runGit(repoPath, ["config", "user.email", "codex@example.com"]);
}

async function createRemoteFixture(rootDir) {
  const bareRemotePath = path.join(rootDir, "remote.git");
  const seedPath = path.join(rootDir, "seed");
  const localClonePath = path.join(rootDir, "local");
  const peerClonePath = path.join(rootDir, "peer");

  await runCommand("git", ["init", "--bare", "--initial-branch", "main", bareRemotePath]);
  await runCommand("git", ["init", "--initial-branch", "main", seedPath]);
  await configureIdentity(seedPath);

  await writeFile(path.join(seedPath, "README.md"), "seed\n", "utf8");
  await runGit(seedPath, ["add", "README.md"]);
  await runGit(seedPath, ["commit", "-m", "test: seed"]);
  await runGit(seedPath, ["remote", "add", "origin", bareRemotePath]);
  await runGit(seedPath, ["push", "-u", "origin", "main"]);
  await runCommand("git", [`--git-dir=${bareRemotePath}`, "symbolic-ref", "HEAD", "refs/heads/main"]);

  await runCommand("git", ["clone", bareRemotePath, localClonePath]);
  await runCommand("git", ["clone", bareRemotePath, peerClonePath]);
  await configureIdentity(localClonePath);
  await configureIdentity(peerClonePath);

  await runGit(localClonePath, ["config", "remote.origin.pushurl", "git@gitlab.ggg.com.vn:team/demo.git"]);

  return {
    bareRemotePath,
    localClonePath,
    peerClonePath,
  };
}

test("resolveRepoPath rejects repository outside allowed root", () => {
  const allowedRoot = "D:\\workspace\\root";

  assert.throws(
    () => resolveRepoPath("D:\\workspace\\other\\repo", allowedRoot),
    /allowed root/i,
  );
});

test("parseGitLabRemote parses scp style ssh remotes", () => {
  const parsed = parseGitLabRemote("git@gitlab.ggg.com.vn:team/demo.git", "gitlab.ggg.com.vn");

  assert.equal(parsed.host, "gitlab.ggg.com.vn");
  assert.equal(parsed.protocol, "ssh-scp");
  assert.equal(parsed.ownerPath, "team/demo.git");
  assert.equal(parsed.hostMatchesExpected, true);
});

test("inspectRepository reports upstream and gitlab remote metadata", async (t) => {
  const rootDir = await mkdtemp(path.join(os.tmpdir(), "gitlab-mcp-"));
  const previousAllowedRoot = process.env.GITLAB_ALLOWED_ROOT;
  const previousHost = process.env.GITLAB_HOST;
  t.after(async () => {
    process.env.GITLAB_ALLOWED_ROOT = previousAllowedRoot;
    process.env.GITLAB_HOST = previousHost;
    await rm(rootDir, { recursive: true, force: true });
  });

  const { localClonePath } = await createRemoteFixture(rootDir);
  process.env.GITLAB_ALLOWED_ROOT = rootDir;
  process.env.GITLAB_HOST = "gitlab.ggg.com.vn";

  const inspected = await inspectRepository(localClonePath);

  assert.equal(inspected.branch, "main");
  assert.equal(inspected.upstream.remoteName, "origin");
  assert.equal(inspected.upstream.branch, "main");
  assert.equal(inspected.gitLabRemote.hostMatchesExpected, true);
});

test("pullCurrentBranch rejects dirty working tree", async (t) => {
  const rootDir = await mkdtemp(path.join(os.tmpdir(), "gitlab-mcp-"));
  const previousAllowedRoot = process.env.GITLAB_ALLOWED_ROOT;
  const previousHost = process.env.GITLAB_HOST;
  t.after(async () => {
    process.env.GITLAB_ALLOWED_ROOT = previousAllowedRoot;
    process.env.GITLAB_HOST = previousHost;
    await rm(rootDir, { recursive: true, force: true });
  });

  const { localClonePath } = await createRemoteFixture(rootDir);
  process.env.GITLAB_ALLOWED_ROOT = rootDir;
  process.env.GITLAB_HOST = "gitlab.ggg.com.vn";
  await writeFile(path.join(localClonePath, "README.md"), "dirty\n", "utf8");

  await assert.rejects(
    () => pullCurrentBranch(localClonePath),
    /working tree must be clean/i,
  );
});

test("pullCurrentBranch rejects diverged branch when ff-only is impossible", async (t) => {
  const rootDir = await mkdtemp(path.join(os.tmpdir(), "gitlab-mcp-"));
  const previousAllowedRoot = process.env.GITLAB_ALLOWED_ROOT;
  const previousHost = process.env.GITLAB_HOST;
  t.after(async () => {
    process.env.GITLAB_ALLOWED_ROOT = previousAllowedRoot;
    process.env.GITLAB_HOST = previousHost;
    await rm(rootDir, { recursive: true, force: true });
  });

  const { localClonePath, peerClonePath } = await createRemoteFixture(rootDir);
  process.env.GITLAB_ALLOWED_ROOT = rootDir;
  process.env.GITLAB_HOST = "gitlab.ggg.com.vn";

  await writeFile(path.join(localClonePath, "local.txt"), "local\n", "utf8");
  await runGit(localClonePath, ["add", "local.txt"]);
  await runGit(localClonePath, ["commit", "-m", "test: local change"]);

  await writeFile(path.join(peerClonePath, "peer.txt"), "peer\n", "utf8");
  await runGit(peerClonePath, ["add", "peer.txt"]);
  await runGit(peerClonePath, ["commit", "-m", "test: peer change"]);
  await runGit(peerClonePath, ["push", "origin", "main"]);

  await assert.rejects(
    () => pullCurrentBranch(localClonePath),
    /fast-forward/i,
  );
});

test("pushCurrentBranch rejects missing upstream", async (t) => {
  const rootDir = await mkdtemp(path.join(os.tmpdir(), "gitlab-mcp-"));
  const repoPath = path.join(rootDir, "repo");
  const previousAllowedRoot = process.env.GITLAB_ALLOWED_ROOT;
  const previousHost = process.env.GITLAB_HOST;
  t.after(async () => {
    process.env.GITLAB_ALLOWED_ROOT = previousAllowedRoot;
    process.env.GITLAB_HOST = previousHost;
    await rm(rootDir, { recursive: true, force: true });
  });

  process.env.GITLAB_ALLOWED_ROOT = rootDir;
  process.env.GITLAB_HOST = "gitlab.ggg.com.vn";

  await runCommand("git", ["init", "--initial-branch", "main", repoPath]);
  await configureIdentity(repoPath);
  await writeFile(path.join(repoPath, "README.md"), "repo\n", "utf8");
  await runGit(repoPath, ["add", "README.md"]);
  await runGit(repoPath, ["commit", "-m", "test: init"]);

  await assert.rejects(
    () => pushCurrentBranch(repoPath),
    /upstream/i,
  );
});
