import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const version = fs.readFileSync(path.join(root, ".nvmrc"), "utf8").trim();

// The existing static host supplies Node 22. Run the actual build on the same
// pinned runtime as local development and CI, without changing host settings.
if (process.versions.node !== version) {
	execFileSync(
		"npx",
		[
			"--yes",
			`--package=node@${version}`,
			"--",
			"node",
			fileURLToPath(import.meta.url),
		],
		{ cwd: root, stdio: "inherit" },
	);
} else {
	const env = {
		...process.env,
		PATH: `${path.dirname(process.execPath)}${path.delimiter}${process.env.PATH ?? ""}`,
	};
	const run = (args) =>
		execFileSync(process.execPath, args, { cwd: root, stdio: "inherit", env });
	const npm = process.env.npm_execpath;
	if (!npm) throw new Error("Run this build through npm run build:site.");
	run([npm, "run", "generate"]);
	run(["node_modules/astro/bin/astro.mjs", "build"]);
	run(["node_modules/tsx/dist/cli.mjs", "scripts/verify-site.ts"]);
}
