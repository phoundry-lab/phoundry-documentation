import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { DocSet, DocSetId, DocsManifest } from '$lib/docs/types';
import manifest from '$lib/generated/manifest.json';

const docsManifest = manifest as unknown as Required<DocsManifest>;

export const ssr = true;
export const prerender = true;

export const entries = () =>
	(Object.values(docsManifest) as DocSet[]).flatMap((set) => [
		...Object.keys(set.pagesBySlug).map((slug) => ({ set: set.id, slug })),
		...Object.keys(set.aliasesBySlug).map((slug) => ({ set: set.id, slug }))
	]);

export const load: PageLoad = ({ params }) => {
	const set = docsManifest[params.set as DocSetId];
	if (!set) {
		error(404, 'Not found');
	}
	const slug = params.slug ?? '';
	/** `/phials` only: when the doc home is not the set root (e.g. `/phials/collections`), redirect once. */
	if (slug === '' && set.home.slug !== '') {
		redirect(302, set.home.href);
	}
	const canonicalSlug = set.aliasesBySlug[slug];
	if (slug in set.aliasesBySlug) {
		redirect(308, set.pagesBySlug[canonicalSlug]!.href);
	}
	const doc = set.pagesBySlug[slug] ?? (slug ? undefined : set.pagesBySlug['']);
	if (!doc) {
		error(404, 'Not found');
	}
	return { set, docPage: doc };
};
