import type { SiteId } from '$lib/site-ids';
import type { DocPageStatus } from './doc-page-status.js';

/** Top-level folder under `content/`. */
export type DocSetId = 'phials' | 'phials-developer' | 'phoundry-ui';

export interface DocSetMeta {
	id: string;
	title: string;
	tagline?: string;
	/** Owning product host. Omitted for standalone sets (e.g. the phoundry-ui library) that are not a product. */
	productSite?: SiteId;
	/** e.g. `/content/phials` */
	root: string;
}

export interface DocPage {
	slug: string;
	/** Legacy slugs that permanently redirect to this canonical page. */
	aliases: string[];
	/** On-wire public path, e.g. `/phials/vials/notes` (no /docs; docs host is implicit). */
	href: string;
	title: string;
	description?: string;
	/** Present only when front matter sets numeric `order`. */
	order?: number;
	hidden: boolean;
	/** Project-relative, slash-separated: `content/phials/.../file.md` */
	filePath: string;
	/** Frontmatter `section` (sidebar group label) when set */
	section?: string;
	/** ISO date from frontmatter `updated` (fallback `date`); drives sitemap lastmod + dateModified. */
	lastmod?: string;
	/** Frontmatter `status` when set (v1: `experimental` only). */
	status?: DocPageStatus;
	/**
	 * Frontmatter `ai_disclosure` — required for `phials` / `phials-developer`.
	 * Omitted for other doc sets (e.g. phoundry-ui).
	 */
	aiDisclosure?: boolean;
	/** Frontmatter `icon` — Iconify id for sidebar. */
	icon?: string;
}

export interface DocSection {
	/** Full directory slug, e.g. `get-started/phials-basics`. */
	id: string;
	title: string;
	/** From `index.json` or index page front matter when set. */
	order?: number;
	pages: DocPage[];
	sections: DocSection[];
	/** `index.md` / `README.md` landing for this section */
	indexPage?: DocPage;
	/** From section `index.json` `icon` — Iconify id for sidebar group + page fallback. */
	icon?: string;
}

export interface DocSet {
	id: DocSetId;
	title: string;
	/** Optional schema version from `content/{set}/docset.json`. */
	schemaVersion?: number;
	/** Owning product host. Omitted for standalone sets (e.g. the phoundry-ui library). */
	productSite?: SiteId;
	/** e.g. `/content/phials` */
	rootDir: string;
	home: DocPage;
	looseTopPages: DocPage[];
	sections: DocSection[];
	pagesBySlug: Record<string, DocPage>;
	/** Legacy slug to canonical slug. */
	aliasesBySlug: Record<string, string>;
	/** In-order for prev/next; includes hidden. */
	flatPageOrder: DocPage[];
	/**
	 * When `content/{id}/_media/og.png` exists, URL to its generated static asset.
	 */
	ogImageUrl?: string;
}

export type DocsManifest = Partial<Record<DocSetId, DocSet>>;
