import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fg from "fast-glob";

const root = fileURLToPath(new URL("../../../", import.meta.url));

/** Include only custom icons referenced by examples and the library's icon map. */
export function generateDocIcons() {
	const files = [
		"node_modules/phoundry-ui/dist/icons.js",
		...fg.sync("content/phoundry-ui/**/*.{mdx,svelte}", { cwd: root }),
	];
	const ids = new Set(
		files.flatMap((file) =>
			[
				...fs
					.readFileSync(path.join(root, file), "utf8")
					.matchAll(/phoundry-(?:mono|colored):[a-zA-Z0-9_-]+/g),
			].map((match) => match[0]),
		),
	);
	const collections = ["phoundry-mono", "phoundry-colored"].map((prefix) => {
		const original = JSON.parse(
			fs.readFileSync(
				path.join(root, `node_modules/phoundry-ui/dist/icons/${prefix}.json`),
				"utf8",
			),
		);
		const icons = {};
		const aliases = {};
		function add(name) {
			if (original.icons[name]) icons[name] = original.icons[name];
			else if (original.aliases?.[name] && !aliases[name]) {
				aliases[name] = original.aliases[name];
				add(original.aliases[name].parent);
			}
		}
		for (const id of ids)
			if (id.startsWith(prefix + ":")) add(id.slice(prefix.length + 1));
		return {
			prefix,
			width: original.width ?? 24,
			height: original.height ?? 24,
			icons,
			aliases,
		};
	});
	const file = path.join(root, "src/lib/generated/doc-icons.json");
	const content = JSON.stringify(collections) + "\n";
	if (!fs.existsSync(file) || fs.readFileSync(file, "utf8") !== content)
		fs.writeFileSync(file, content);
}
