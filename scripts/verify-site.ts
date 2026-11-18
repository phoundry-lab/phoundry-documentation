import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import fg from "fast-glob";
import { parse, type DefaultTreeAdapterTypes as Html } from "parse5";
import manifest from "../src/lib/generated/manifest.json" with { type: "json" };
import type { DocSet } from "../src/lib/docs/types";

const output = path.resolve("build");
type Page = {
	html: string;
	ids: Set<string>;
	links: string[];
	h1s: number;
	examples: string[];
};
const pages = new Map<string, Page>();
for (const file of fg.sync("**/*.html", { cwd: output })) {
	const html = fs.readFileSync(path.join(output, file), "utf8");
	const page: Page = { html, ids: new Set(), links: [], h1s: 0, examples: [] };
	function walk(node: Html.Node) {
		if ("tagName" in node) {
			const attrs = Object.fromEntries(
				node.attrs.map((attr) => [attr.name, attr.value]),
			);
			if (attrs.id) page.ids.add(attrs.id);
			if (node.tagName === "h1") page.h1s++;
			if (node.tagName === "a" && attrs.href) page.links.push(attrs.href);
			if (["img", "iframe"].includes(node.tagName) && attrs.src)
				page.links.push(attrs.src);
			if (attrs["data-example"]) page.examples.push(attrs["data-example"]);
		}
		if ("childNodes" in node) for (const child of node.childNodes) walk(child);
	}
	walk(parse(html));
	pages.set("/" + file.replace(/index\.html$/, "").replace(/\/$/, ""), page);
}

const sets = Object.values(manifest) as unknown as DocSet[];
const canonical = [
	"/",
	...sets.flatMap((set) =>
		Object.values(set.pagesBySlug).map((page) => page.href),
	),
];
const failures: string[] = [];
const normalize = (route: string) => decodeURI(route).replace(/\/$/, "") || "/";
for (const route of canonical) {
	const page = pages.get(route);
	if (!page) {
		failures.push(`Missing canonical page ${route}`);
		continue;
	}
	if (page.h1s !== 1)
		failures.push(`${route}: expected one H1, found ${page.h1s}`);
	for (const link of page.links) {
		const url = new URL(link, `https://docs.phoundry.app${route}`);
		if (url.origin !== "https://docs.phoundry.app") continue;
		const target = pages.get(normalize(url.pathname));
		if (!target && !fs.existsSync(path.join(output, decodeURI(url.pathname))))
			failures.push(`${route}: missing local target ${link}`);
		if (
			target &&
			url.hash &&
			!target.ids.has(decodeURIComponent(url.hash.slice(1)))
		)
			failures.push(`${route}: missing anchor ${link}`);
	}
	for (const example of page.examples) {
		if (
			!fs.existsSync(
				path.join("content/phoundry-ui/_examples", `${example}.svelte`),
			)
		)
			failures.push(`${route}: missing example source ${example}`);
	}
}
let aliases = 0;
for (const set of sets)
	for (const [alias, slug] of Object.entries(set.aliasesBySlug)) {
		const route = `/${set.id}/${alias}`;
		const page = pages.get(route);
		if (!page) {
			failures.push(`Missing alias ${route}`);
			continue;
		}
		const script = page.html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
		let destination = "";
		if (!script) failures.push(`Missing redirect script ${route}`);
		else
			vm.runInNewContext(
				script,
				{
					location: {
						search: "?source=help",
						hash: "#signature",
						replace: (url: string) => {
							destination = url;
						},
					},
				},
				{ timeout: 100 },
			);
		if (destination !== `${set.pagesBySlug[slug]!.href}?source=help#signature`)
			failures.push(`${route}: query/fragment redirect mismatch`);
		aliases++;
	}
const sitemap = fg
	.sync("sitemap-*.xml", { cwd: output })
	.map((file) => fs.readFileSync(path.join(output, file), "utf8"))
	.join("\n");
assert(
	!sitemap.includes("/examples/"),
	"Isolated example routes must not appear in the sitemap.",
);
assert(
	fs.existsSync(path.join(output, "pagefind/pagefind.js")),
	"Pagefind index was not built.",
);
assert.equal(failures.length, 0, failures.slice(0, 40).join("\n"));
console.log(
	`Verified ${canonical.length} canonical pages, ${aliases} query/fragment-preserving aliases, local links, anchors, example sources, sitemap, and search index.`,
);
