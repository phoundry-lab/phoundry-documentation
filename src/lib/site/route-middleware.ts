import { defineRouteMiddleware } from "@astrojs/starlight/route-data";
import manifest from "../generated/manifest.json";
import type { DocSet } from "../docs/types";

export const onRequest = defineRouteMiddleware((context) => {
	const route = context.locals.starlightRoute;
	const setId = route.id.split("/")[0] as keyof typeof manifest;
	const set = manifest[setId] as DocSet | undefined;
	const page =
		set?.pagesBySlug[route.id.slice(setId.length).replace(/^\//, "")];
	if (page) {
		route.editUrl = new URL(
			`https://github.com/phoundry-lab/phoundry-documentation/edit/main/${page.filePath}`,
		);
		if (page.lastmod) route.lastUpdated = new Date(page.lastmod);
	}
});
