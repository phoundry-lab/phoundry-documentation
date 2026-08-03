import manifest from '$lib/generated/manifest.json';
import { sitemapDocPaths } from '$lib/docs/build-manifest';
import type { DocsManifest } from '$lib/docs/types';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = () => {
	const entries = sitemapDocPaths(manifest as unknown as DocsManifest)
		.map(({ path, lastmod }) => {
			const modified = lastmod ? `<lastmod>${lastmod}</lastmod>` : '';
			return `<url><loc>https://docs.phoundry.app${path}</loc>${modified}</url>`;
		})
		.join('');
	return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`, {
		headers: { 'content-type': 'application/xml; charset=utf-8' }
	});
};
