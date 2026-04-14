import { spawn } from "node:child_process";

import { buildLaunchSpec, buildMissingUvxMessage } from "./core.js";

async function launchUpstreamServer() {
  const spec = buildLaunchSpec(process.env, process.argv.slice(2));

  await new Promise((resolve, reject) => {
    const child = spawn(spec.command, spec.args, {
      stdio: "inherit",
      env: process.env,
      shell: false,
      windowsHide: true,
    });

    child.on("error", (error) => {
      if (error && "code" in error && error.code === "ENOENT") {
        reject(new Error(buildMissingUvxMessage(spec.command)));
        return;
      }

      reject(error);
    });

    child.on("close", (code, signal) => {
      if (signal) {
        reject(new Error(`NotebookLM MCP upstream process exited from signal ${signal}`));
        return;
      }

      resolve(code ?? 0);
    });
  }).then((code) => {
    process.exitCode = code;
  });
}

try {
  await launchUpstreamServer();
} catch (error) {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
}
