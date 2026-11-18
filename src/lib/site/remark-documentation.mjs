import path from "node:path";
import { visit } from "unist-util-visit";
import GithubSlugger from "github-slugger";

const external = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

/** Convert canonical source links while leaving the offline Markdown untouched. */
export function webDocumentationHref(href, filePath) {
	if (!href || external.test(href) || href.startsWith("#")) return href;
	const suffixIndex = href.search(/[?#]/);
	const pathname = suffixIndex < 0 ? href : href.slice(0, suffixIndex);
	const suffix = suffixIndex < 0 ? "" : href.slice(suffixIndex);
	const normalized = filePath.replaceAll("\\", "/");
	const marker = normalized.lastIndexOf("/content/");
	if (marker < 0) return href;
	const source = normalized.slice(marker + "/content/".length);
	if (/\.mdx?$/i.test(pathname)) {
		const destination = pathname.startsWith("/")
			? pathname.slice(1)
			: path.posix.join(path.posix.dirname(source), pathname);
		return (
			"/" +
			destination.replace(/\.mdx?$/i, "").replace(/\/(index|readme)$/i, "") +
			suffix
		);
	}
	if (pathname.includes("_media/") && !pathname.startsWith("/docs-assets/")) {
		const destination = path.posix.join(path.posix.dirname(source), pathname);
		return (
			"/docs-assets/" +
			destination.split("/").map(encodeURIComponent).join("/") +
			suffix
		);
	}
	return href;
}

export function remarkDocumentation() {
	return (tree, file) => {
		const filePath = file.path ?? file.history?.[0] ?? "";
		if (!filePath.replaceAll("\\", "/").includes("/content/")) return;
		// Starlight owns the visible H1. Keep its old anchor for existing bookmarks.
		const firstHeading = tree.children.findIndex(
			(node) => node.type === "heading" && node.depth === 1,
		);
		if (firstHeading >= 0) {
			const node = tree.children[firstHeading];
			const text = node.children.map((child) => child.value ?? "").join("");
			const id = new GithubSlugger().slug(text);
			tree.children.splice(firstHeading, 1, {
				type: "html",
				value: `<span id="${id}"></span>`,
			});
		}
		visit(tree, (node) => {
			if (
				node.type === "link" ||
				node.type === "definition" ||
				node.type === "image"
			) {
				node.url = webDocumentationHref(node.url, filePath);
			}
		});
	};
}
