import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { generateDocIcons } from "../ui/generate-icons.mjs";

const exec = promisify(execFile);
const root = fileURLToPath(new URL("../../../", import.meta.url));
const escapeHtml = (value) =>
	value
		.replaceAll("&", "&amp;")
		.replaceAll('"', "&quot;")
		.replaceAll("<", "&lt;");

export function aliasHtml(destination) {
	const canonical = escapeHtml(`https://docs.phoundry.app${destination}`);
	const target = JSON.stringify(destination).replaceAll("<", "\\u003c");
	return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>Redirecting…</title><link rel="canonical" href="${canonical}"><script>location.replace(${target}+location.search+location.hash)</script><noscript><meta http-equiv="refresh" content="0;url=${escapeHtml(destination)}"></noscript></head><body><a href="${escapeHtml(destination)}">Continue to the documentation</a></body></html>`;
}

export function documentationIntegration(manifest) {
	const aliases = new Map(
		Object.values(manifest).flatMap((set) =>
			Object.entries(set.aliasesBySlug).map(([alias, slug]) => [
				`/${set.id}/${alias}`,
				set.pagesBySlug[slug].href,
			]),
		),
	);
	return {
		name: "phoundry-documentation-delivery",
		hooks: {
			"astro:config:setup": ({ addWatchFile }) => {
				addWatchFile(new URL("../generated/manifest.json", import.meta.url));
			},
			"astro:server:setup": ({ server }) => {
				server.middlewares.use((req, res, next) => {
					const url = new URL(req.url ?? "/", "http://localhost");
					const destination = aliases.get(
						decodeURI(url.pathname).replace(/\/$/, ""),
					);
					if (!destination) return next();
					res.statusCode = 302;
					res.setHeader("Location", destination + url.search);
					res.end();
				});
				let pending;
				let running = Promise.resolve();
				server.watcher.add(path.join(root, "content"));
				const refresh = (file) => {
					if (
						!file.startsWith(path.join(root, "content") + path.sep) ||
						!/\.(md|mdx|json|svelte)$/.test(file)
					)
						return;
					generateDocIcons();
					if (file.endsWith(".svelte")) return;
					clearTimeout(pending);
					pending = setTimeout(() => {
						running = running
							.then(async () => {
								await exec(
									process.execPath,
									["--import", "tsx", "scripts/generate-documentation.ts"],
									{ cwd: root },
								);
							})
							.catch((error) => server.config.logger.error(error.message));
					}, 100);
				};
				for (const event of ["add", "unlink", "change"])
					server.watcher.on(event, refresh);
				server.httpServer?.once("close", () => {
					clearTimeout(pending);
					for (const event of ["add", "unlink", "change"])
						server.watcher.off(event, refresh);
				});
			},
			"astro:build:done": async ({ dir }) => {
				for (const [alias, destination] of aliases) {
					const file = fileURLToPath(new URL(`.${alias}/index.html`, dir));
					await fs.mkdir(path.dirname(file), { recursive: true });
					await fs.writeFile(file, aliasHtml(destination));
				}
				console.log(`Emitted ${aliases.size} static documentation aliases.`);
			},
		},
	};
}
