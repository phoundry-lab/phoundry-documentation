import type { DocSetMeta } from './types';

/** Per-set metadata; used by the doc-set param matcher and manifest. */
export const docSets: DocSetMeta[] = [
	{
		id: 'phials',
		title: 'Phials documentation',
		productSite: 'phials',
		root: '/content/phials'
	},
	{
		id: 'phials-developer',
		title: 'Phials plugin documentation',
		productSite: 'phials',
		root: '/content/phials-developer'
	},
	{
		id: 'phoundry-ui',
		title: 'Phoundry UI',
		tagline: 'Svelte 5 component library with live demos',
		root: '/content/phoundry-ui'
	}
];
