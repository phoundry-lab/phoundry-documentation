import { fileURLToPath } from "node:url";
import fs from "node:fs";
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";
import sidebarTopics from "starlight-sidebar-topics";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import { documentationIntegration } from "./src/lib/site/integration.mjs";
import { remarkDocumentation } from "./src/lib/site/remark-documentation.mjs";
import { remarkUnescapeCodeEntities } from "./src/lib/docs/remark-unescape-code-entities.js";

// Read at config evaluation time so Astro's watched config restart gets fresh
// navigation rather than Node's cached JSON module from the previous config.
const manifest = JSON.parse(
	fs.readFileSync(
		new URL("./src/lib/generated/manifest.json", import.meta.url),
		"utf8",
	),
);

const labels = {
	phials: "Phials",
	"phials-developer": "Plugin SDK",
	"phoundry-ui": "Phoundry UI",
};
const icons = {
	phials: "open-book",
	"phials-developer": "puzzle",
	"phoundry-ui": "setting",
};
const sitemapPages = new Map(
	Object.values(manifest).flatMap((set) =>
		set.flatPageOrder
			.filter((page) => !page.hidden)
			.map((page) => [page.href, page]),
	),
);
sitemapPages.set("/", {});
const pageLink = (page) => ({
	label: page.title,
	link: page.href,
	...(page.status ? { badge: { text: page.status, variant: "caution" } } : {}),
});
const group = (section) => ({
	label: section.title,
	collapsed: true,
	items: [
		...(section.indexPage && !section.indexPage.hidden
			? [pageLink(section.indexPage)]
			: []),
		...section.pages.filter((page) => !page.hidden).map(pageLink),
		...section.sections.map(group),
	],
});

export default defineConfig({
	site: "https://docs.phoundry.app",
	output: "static",
	outDir: "./build",
	publicDir: "./static",
	trailingSlash: "never",
	markdown: {
		processor: unified({
			remarkPlugins: [remarkDocumentation, remarkUnescapeCodeEntities],
		}),
	},
	integrations: [
		sitemap({
			filter: (page) =>
				sitemapPages.has(new URL(page).pathname.replace(/\/$/, "") || "/"),
			serialize: (item) => ({
				...item,
				lastmod: sitemapPages.get(
					new URL(item.url).pathname.replace(/\/$/, "") || "/",
				)?.lastmod,
			}),
		}),
		starlight({
			title: "Phoundry docs",
			description:
				"Phials user documentation, the Plugin SDK, and Phoundry UI.",
			favicon: "/icons/phials-icon-32.svg",
			social: [
				{
					icon: "github",
					label: "GitHub",
					href: "https://github.com/phoundry-lab/phoundry-documentation",
				},
			],
			customCss: ["./src/styles/docs.css"],
			components: {
				SiteTitle: "./src/components/SiteTitle.astro",
				MarkdownContent: "./src/components/ArticleContent.astro",
				ThemeProvider: "./src/components/ThemeProvider.astro",
			},
			routeMiddleware: "./src/lib/site/route-middleware.ts",
			plugins: [
				sidebarTopics(
					Object.values(manifest).map((set) => ({
						label: labels[set.id],
						link: `/${set.id}`,
						icon: icons[set.id],
						items: [
							pageLink(set.home),
							...set.looseTopPages.filter((page) => !page.hidden).map(pageLink),
							...set.sections.map(group),
						],
					})),
				),
			],
		}),
		svelte(),
		documentationIntegration(manifest),
	],
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				"@docs": fileURLToPath(
					new URL("./src/components/docs", import.meta.url),
				),
				$lib: fileURLToPath(new URL("./src/lib", import.meta.url)),
				$phoundry: fileURLToPath(
					new URL("./node_modules/phoundry-ui/dist", import.meta.url),
				),
			},
			dedupe: ["svelte", "phoundry-ui", "@iconify/svelte"],
		},
		server: { strictPort: true },
	},
});
