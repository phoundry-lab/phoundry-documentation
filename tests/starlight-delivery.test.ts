import { describe, expect, it } from "vitest";
import {
	webDocumentationHref,
	remarkDocumentation,
} from "../src/lib/site/remark-documentation.mjs";
import { aliasHtml } from "../src/lib/site/integration.mjs";

describe("Starlight canonical source projection", () => {
	it("preserves case, query strings, and fragments when resolving portable source links", () => {
		const current = "/repo/content/phials-developer/get-started/index.md";
		expect(
			webDocumentationHref(
				"../reference/sdk-type-reference/PluginIdentity.md?from=guide#signature",
				current,
			),
		).toBe(
			"/phials-developer/reference/sdk-type-reference/PluginIdentity?from=guide#signature",
		);
		expect(
			webDocumentationHref("/phoundry-ui/inputs/checkbox.mdx", current),
		).toBe("/phoundry-ui/inputs/checkbox");
		expect(webDocumentationHref("./index.md#intro", current)).toBe(
			"/phials-developer/get-started#intro",
		);
	});
	it("projects media URLs without changing external links or local anchors", () => {
		const current = "/repo/content/phials/get-started/index.md";
		expect(
			webDocumentationHref("../_media/window screenshot.png", current),
		).toBe("/docs-assets/phials/_media/window%20screenshot.png");
		expect(webDocumentationHref("https://example.com/a.md", current)).toBe(
			"https://example.com/a.md",
		);
		expect(webDocumentationHref("#selection", current)).toBe("#selection");
	});
	it("keeps the original article title anchor while letting Starlight render the H1", () => {
		const tree = {
			type: "root",
			children: [
				{
					type: "heading",
					depth: 1,
					children: [{ type: "text", value: "PluginIdentity" }],
				},
			],
		};
		remarkDocumentation()(tree, {
			path: "/repo/content/phials-developer/reference/PluginIdentity.md",
		});
		expect(tree.children[0]).toEqual({
			type: "html",
			value: '<span id="pluginidentity"></span>',
		});
	});
	it("generates indexable canonical metadata and a noindex alias that preserves navigation state", () => {
		const html = aliasHtml("/phials/get-started");
		expect(html).toContain("https://docs.phoundry.app/phials/get-started");
		expect(html).toContain('content="noindex"');
		expect(html).toContain("location.search+location.hash");
	});
});
