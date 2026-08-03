import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import fg from 'fast-glob';
import type { DocPage, DocSection, DocSet, DocSetId, DocSetMeta } from './types';
import { docSets as docSetConfig } from './registry';
import { parseDocPageStatus } from './doc-page-status.js';
import {
	docSetRequiresAiDisclosure,
	parseDocAliases,
	parseOptionalIcon,
	requireAiDisclosure
} from './doc-page-frontmatter.js';

const FIRST_H1 = /^\s*#\s+(.+?)\s*$/m;
const STRICT_DOC_SCHEMA_VERSION = 2;

type PageSource = {
	relp: string;
	front: Record<string, unknown>;
	body: string;
};

type DirBucket = {
	index?: PageSource;
	readme?: PageSource;
	others: PageSource[];
};

type NavigationGroupMeta = {
	title?: string;
	order?: number;
	icon?: string;
};

function humanizeSegment(segment: string): string {
	if (!segment) return '';
	return segment
		.split(/[-_]/g)
		.filter(Boolean)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(' ');
}

function readFirstHeading(body: string): string | null {
	return body.match(FIRST_H1)?.[1] ?? null;
}

function normalizeFrontmatterDate(value: unknown): string | undefined {
	if (value instanceof Date && !Number.isNaN(value.getTime())) {
		return value.toISOString().slice(0, 10);
	}
	if (typeof value === 'string' && value.trim()) {
		const date = new Date(value.trim());
		if (!Number.isNaN(date.getTime())) return date.toISOString().slice(0, 10);
	}
	return undefined;
}

function compareByOptionalOrder(
	a: { order?: number; title: string },
	b: { order?: number; title: string }
): number {
	const aHasOrder = a.order !== undefined;
	const bHasOrder = b.order !== undefined;
	if (aHasOrder !== bHasOrder) return aHasOrder ? -1 : 1;
	if (aHasOrder && bHasOrder && a.order !== b.order) return a.order! - b.order!;
	return a.title.localeCompare(b.title, 'en');
}

function requireFrontmatterString(
	front: Record<string, unknown>,
	field: 'title' | 'description',
	filePath: string
): string {
	const value = front[field];
	if (typeof value !== 'string' || !value.trim()) {
		throw new Error(`Doc page frontmatter missing required ${field}: ${filePath}`);
	}
	return value.trim();
}

function readDocSetSchemaVersion(projectRoot: string, setId: DocSetId): number | undefined {
	const abs = path.join(projectRoot, 'content', setId, 'docset.json');
	if (!fs.existsSync(abs)) return undefined;
	try {
		const data = JSON.parse(fs.readFileSync(abs, 'utf8')) as Record<string, unknown>;
		if (typeof data.schemaVersion !== 'number') {
			throw new Error('schemaVersion must be a number');
		}
		return data.schemaVersion;
	} catch (error) {
		const detail = error instanceof Error ? error.message : String(error);
		throw new Error(`Invalid content/${setId}/docset.json: ${detail}`);
	}
}

function readNavigationGroupMeta(
	projectRoot: string,
	setId: DocSetId,
	groupId: string,
	strict: boolean
): NavigationGroupMeta {
	const rel = `content/${setId}/${groupId}/index.json`;
	const abs = path.join(projectRoot, rel);
	if (!fs.existsSync(abs) || !fs.statSync(abs).isFile()) {
		if (strict) throw new Error(`Missing navigation group metadata: ${rel}`);
		return {};
	}
	try {
		const data = JSON.parse(fs.readFileSync(abs, 'utf8')) as Record<string, unknown>;
		const title =
			typeof data.title === 'string' && data.title.trim() ? data.title.trim() : undefined;
		const order = typeof data.order === 'number' ? data.order : undefined;
		const icon = parseOptionalIcon(data.icon);
		if (strict && (!title || order === undefined || !icon)) {
			throw new Error('title, order, and icon are required');
		}
		return { title, order, icon };
	} catch (error) {
		const detail = error instanceof Error ? error.message : String(error);
		throw new Error(`Invalid navigation group metadata ${rel}: ${detail}`);
	}
}

function toDocSetId(value: string): DocSetId | null {
	if (
		value === 'phials' ||
		value === 'phials-developer' ||
		value === 'phoundry-ui'
	) {
		return value;
	}
	return null;
}

function toPage(
	setId: DocSetId,
	slug: string,
	source: PageSource,
	strict: boolean,
	isIndex: boolean
): DocPage {
	const filePath = `content/${setId}/${source.relp}`.replaceAll(path.sep, '/');
	const titleField = typeof source.front.title === 'string' ? source.front.title.trim() : '';
	const descriptionField =
		typeof source.front.description === 'string' ? source.front.description.trim() : '';
	const title = strict
		? requireFrontmatterString(source.front, 'title', filePath)
		: titleField ||
			readFirstHeading(source.body) ||
			humanizeSegment(path.posix.basename(source.relp, '.md'));
	const description = strict
		? requireFrontmatterString(source.front, 'description', filePath)
		: descriptionField || undefined;
	const page: DocPage = {
		slug,
		aliases: parseDocAliases(source.front.aliases, filePath),
		href: slug ? `/${setId}/${slug}` : `/${setId}`,
		title,
		description,
		hidden: source.front.hidden === true,
		filePath,
		section: typeof source.front.section === 'string' ? source.front.section : undefined
	};
	if (typeof source.front.order === 'number') {
		page.order = source.front.order;
	} else if (strict && !isIndex) {
		throw new Error(`Doc child article missing required order: ${filePath}`);
	}
	const lastmod = normalizeFrontmatterDate(source.front.updated ?? source.front.date);
	if (lastmod) page.lastmod = lastmod;
	const status = parseDocPageStatus(source.front.status);
	if (status) page.status = status;
	const icon = parseOptionalIcon(source.front.icon);
	if (icon) page.icon = icon;
	if (docSetRequiresAiDisclosure(setId)) {
		page.aiDisclosure = requireAiDisclosure(source.front, filePath);
	}
	return page;
}

function groupByDir(setId: DocSetId, projectRoot: string, files: string[]): Map<string, DirBucket> {
	const byDir = new Map<string, DirBucket>();
	const setPrefix = `content/${setId}/`.replaceAll('\\', '/');
	for (const file of files) {
		const normalized = file.replaceAll('\\', '/');
		if (!normalized.startsWith(setPrefix)) continue;
		const relp = normalized.slice(setPrefix.length);
		if (relp.split('/').some((part) => part.startsWith('_') || part.startsWith('.'))) continue;
		const dir = path.posix.dirname(relp);
		const dirKey = dir === '.' ? '' : dir;
		const base = path.posix.basename(relp).toLowerCase();
		const bucket = byDir.get(dirKey) ?? { others: [] };
		byDir.set(dirKey, bucket);
		const raw = fs.readFileSync(path.join(projectRoot, normalized), 'utf8');
		const { data, content } = matter(raw, { excerpt: false });
		const source: PageSource = {
			relp,
			front: data as Record<string, unknown>,
			body: content ?? ''
		};
		if (base === 'index.md') {
			if (bucket.index) throw new Error(`Duplicate index in ${setId} ${dirKey || '(root)'}`);
			bucket.index = source;
		} else if (base === 'readme.md') {
			if (bucket.readme) throw new Error(`Duplicate README in ${setId} ${dirKey || '(root)'}`);
			bucket.readme = source;
		} else {
			bucket.others.push(source);
		}
	}
	return byDir;
}

function buildPagesForSet(
	setId: DocSetId,
	byDir: Map<string, DirBucket>,
	strict: boolean
): Map<string, DocPage> {
	const pages = new Map<string, DocPage>();
	for (const [dirKey, bucket] of byDir) {
		const index = bucket.index ?? bucket.readme;
		if (index) {
			const page = toPage(setId, dirKey, index, strict, true);
			if (pages.has(page.slug)) throw new Error(`Duplicate slug ${page.slug} in ${setId}`);
			pages.set(page.slug, page);
		}
		for (const source of bucket.others) {
			const slug = source.relp.replace(/\.md$/i, '');
			const page = toPage(setId, slug, source, strict, false);
			if (pages.has(page.slug)) throw new Error(`Duplicate slug ${page.slug} in ${setId}`);
			pages.set(page.slug, page);
		}
	}
	return pages;
}

function buildAliasesBySlug(pages: Map<string, DocPage>): Record<string, string> {
	const aliases = new Map<string, string>();
	for (const page of pages.values()) {
		for (const alias of page.aliases) {
			if (alias === page.slug || pages.has(alias)) {
				throw new Error(`Doc alias ${alias} collides with canonical slug ${page.slug}`);
			}
			const existing = aliases.get(alias);
			if (existing) {
				throw new Error(`Doc alias ${alias} is assigned to both ${existing} and ${page.slug}`);
			}
			aliases.set(alias, page.slug);
		}
	}
	return Object.fromEntries(aliases);
}

function parentGroupId(groupId: string): string {
	const parent = path.posix.dirname(groupId);
	return parent === '.' ? '' : parent;
}

function buildNavigationGroups(
	projectRoot: string,
	setId: DocSetId,
	byDir: Map<string, DirBucket>,
	pages: Map<string, DocPage>,
	strict: boolean
): DocSection[] {
	const groupIds = [...byDir.keys()].filter(Boolean);
	const buildGroup = (groupId: string): DocSection => {
		const indexPage = pages.get(groupId);
		if (strict && !indexPage) {
			throw new Error(`Navigation group missing index.md: content/${setId}/${groupId}`);
		}
		const meta = readNavigationGroupMeta(projectRoot, setId, groupId, strict);
		const directPages = [...pages.values()]
			.filter(
				(page) =>
					page.slug !== groupId &&
					!groupIds.includes(page.slug) &&
					parentGroupId(page.slug) === groupId
			)
			.sort(compareByOptionalOrder);
		const sections = groupIds
			.filter((candidate) => parentGroupId(candidate) === groupId)
			.map(buildGroup)
			.sort(compareByOptionalOrder);
		const group: DocSection = {
			id: groupId,
			title:
				meta.title ??
				indexPage?.section ??
				indexPage?.title ??
				humanizeSegment(path.posix.basename(groupId)),
			pages: directPages,
			sections,
			indexPage
		};
		if (meta.order !== undefined) group.order = meta.order;
		else if (indexPage?.order !== undefined) group.order = indexPage.order;
		if (meta.icon ?? indexPage?.icon) group.icon = meta.icon ?? indexPage?.icon;
		return group;
	};
	return groupIds
		.filter((groupId) => parentGroupId(groupId) === '')
		.map(buildGroup)
		.sort(compareByOptionalOrder);
}

function flattenNavigation(
	home: DocPage,
	looseTopPages: DocPage[],
	sections: DocSection[]
): DocPage[] {
	const flat: DocPage[] = [home, ...looseTopPages];
	const appendGroup = (group: DocSection) => {
		if (group.indexPage) flat.push(group.indexPage);
		flat.push(...group.pages);
		for (const child of group.sections) appendGroup(child);
	};
	for (const section of sections) appendGroup(section);
	return flat;
}

export function buildSet(projectRoot: string, meta: DocSetMeta, setId: DocSetId): DocSet {
	const setPrefix = `content/${setId}/`.replaceAll('\\', '/');
	const markdownFiles = fg
		.sync('content/**/*.md', { cwd: projectRoot, onlyFiles: true, dot: false })
		.map((file) => file.replaceAll('\\', '/'))
		.filter((file) => file.startsWith(setPrefix))
		.filter((file) =>
			file.split('/').every((part) => !part.startsWith('_') && part !== 'node_modules')
		);
	if (!markdownFiles.length) throw new Error(`No markdown files for doc set ${setId}`);

	const schemaVersion = readDocSetSchemaVersion(projectRoot, setId);
	const strict = schemaVersion === STRICT_DOC_SCHEMA_VERSION;
	const byDir = groupByDir(setId, projectRoot, markdownFiles);
	const bySlug = buildPagesForSet(setId, byDir, strict);
	const pagesBySlug = Object.fromEntries(bySlug);
	const aliasesBySlug = buildAliasesBySlug(bySlug);

	let home = pagesBySlug[''];
	if (!home) {
		if (strict) {
			throw new Error(`Strict documentation requires index.md at its root: content/${setId}`);
		}
		const rootPages = [...bySlug.values()]
			.filter((page) => !page.slug.includes('/'))
			.sort(compareByOptionalOrder);
		home = rootPages[0] ?? [...bySlug.values()][0];
	}
	if (!home) throw new Error(`No documentation home page for ${setId}`);

	const looseTopPages = [...bySlug.values()]
		.filter((page) => {
			if (!page.slug) return false;
			const rel = page.filePath.replace(`content/${setId}/`, '');
			return !rel.includes('/');
		})
		.sort(compareByOptionalOrder);
	const sections = buildNavigationGroups(projectRoot, setId, byDir, bySlug, strict);
	const flatPageOrder = flattenNavigation(home, looseTopPages, sections);

	const ogRel = `content/${setId}/_media/og.png`.replaceAll(path.sep, '/');
	const ogFile = path.join(projectRoot, 'content', setId, '_media', 'og.png');
	let ogImageUrl: string | undefined;
	if (fs.existsSync(ogFile) && fs.statSync(ogFile).isFile()) {
		ogImageUrl = '/docs-assets/' + ogRel.split('/').slice(1).map(encodeURIComponent).join('/');
	}

	return {
		id: setId,
		title: meta.title,
		productSite: meta.productSite,
		schemaVersion,
		rootDir: meta.root,
		home,
		looseTopPages,
		sections,
		pagesBySlug,
		aliasesBySlug,
		flatPageOrder,
		ogImageUrl
	};
}

export function buildManifest(
	projectRoot: string,
	metas: readonly DocSetMeta[] = docSetConfig
): Pick<Record<DocSetId, DocSet | undefined>, DocSetId> {
	const out: Record<string, DocSet | undefined> = {};
	for (const meta of metas) {
		const id = toDocSetId(meta.id);
		if (!id) continue;
		if (!fs.existsSync(path.join(projectRoot, 'content', meta.id))) continue;
		out[id] = buildSet(projectRoot, meta, id);
	}
	if (!out.phials) throw new Error('buildManifest: at least phials is required');
	return out as Pick<Record<DocSetId, DocSet | undefined>, DocSetId>;
}

export type SitemapEntry = { path: string; lastmod?: string };

export function sitemapDocPaths(manifest: {
	phials?: DocSet;
	'phials-developer'?: DocSet;
	'phoundry-ui'?: DocSet;
}): SitemapEntry[] {
	const byPath = new Map<string, SitemapEntry>([['/', { path: '/' }]]);
	for (const set of Object.values(manifest) as (DocSet | undefined)[]) {
		if (!set) continue;
		for (const page of set.flatPageOrder) {
			if (page.hidden) continue;
			if (!byPath.has(page.href)) {
				byPath.set(
					page.href,
					page.lastmod ? { path: page.href, lastmod: page.lastmod } : { path: page.href }
				);
			}
		}
	}
	return [...byPath.values()].sort((a, b) => a.path.localeCompare(b.path, 'en'));
}
