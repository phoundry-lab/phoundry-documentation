const BASE = 'https://docs.phoundry.app';

export function organizationJsonLd() {
	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'Phoundry Lab',
		url: 'https://phoundry.app'
	};
}

export function docArticleJsonLd(input: {
	title: string;
	description: string;
	url: string;
	lastmod?: string;
}) {
	return {
		'@context': 'https://schema.org',
		'@type': 'TechArticle',
		headline: input.title,
		description: input.description,
		url: input.url,
		mainEntityOfPage: input.url,
		publisher: { '@type': 'Organization', name: 'Phoundry Lab', url: BASE },
		...(input.lastmod ? { dateModified: input.lastmod } : {})
	};
}

