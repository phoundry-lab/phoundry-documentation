import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { buildManifest, sitemapDocPaths } from './build-manifest.js';
import { buildDocBreadcrumbs, buildDocSidebarRows } from './doc-navigation.logic.js';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');

describe('Phials documentation manifest v2', () => {
	it('builds the recursive tree and canonical alias map', () => {
		const set = buildManifest(projectRoot).phials!;
		expect(set.schemaVersion).toBe(2);
		expect(set.sections).toHaveLength(6);
		expect(Object.keys(set.pagesBySlug)).toHaveLength(146);
		expect(Object.keys(set.aliasesBySlug)).toHaveLength(44);
		expect(set.aliasesBySlug['basic-use/file-explorer']).toBe(
			'get-started/phials-basics/the-phials-window'
		);
		expect(set.sections[0]?.sections[0]?.title).toBe('What is Phials?');
	});

	it('keeps every outcome visible while expanding the active branch', () => {
		const set = buildManifest(projectRoot).phials!;
		const rows = buildDocSidebarRows(set, 'get-started/phials-basics/browsing-in-phials', {});
		const outcomeExpansion = rows.flatMap((row) =>
			row.kind === 'group' && row.depth === 0 ? [row.expanded] : []
		);
		expect(outcomeExpansion).toHaveLength(6);
		expect(outcomeExpansion).toEqual([true, false, false, false, false, false]);
	});

	it('does not unfold an active section or topic-hub landing', () => {
		const set = buildManifest(projectRoot).phials!;
		const sectionRows = buildDocSidebarRows(set, 'get-started', {});
		expect(
			sectionRows.flatMap((row) =>
				row.kind === 'group' && row.depth === 0 ? [`${row.group.id}:${row.expanded}`] : []
			)
		).toEqual([
			'get-started:false',
			'browse-and-manage-files:false',
			'organize-files-with-phials:false',
			'view-and-edit-files:false',
			'arrange-and-customize-phials:false',
			'reference:false'
		]);

		const hubRows = buildDocSidebarRows(set, 'get-started/phials-basics', {});
		expect(
			hubRows.flatMap((row) =>
				row.kind === 'group' &&
				(row.group.id === 'get-started' || row.group.id === 'get-started/phials-basics')
					? [`${row.group.id}:${row.expanded}`]
					: []
			)
		).toEqual(['get-started:true', 'get-started/phials-basics:false']);
	});

	it('builds full ancestry breadcrumbs for a child article', () => {
		const set = buildManifest(projectRoot).phials!;
		const page = set.pagesBySlug['get-started/phials-basics/browsing-in-phials']!;
		expect(buildDocBreadcrumbs(set, page)).toEqual([
			{ label: 'Phials documentation', href: '/phials' },
			{ label: 'Get started', href: '/phials/get-started' },
			{ label: 'Phials basics', href: '/phials/get-started/phials-basics' },
			{ label: 'Browsing in Phials', href: null }
		]);
	});

	it('keeps aliases out of the sitemap', () => {
		const manifest = buildManifest(projectRoot);
		const paths = sitemapDocPaths(manifest).map((entry) => entry.path);
		expect(paths).toContain('/phials/get-started/phials-basics/the-phials-window');
		expect(paths).not.toContain('/phials/basic-use/file-explorer');
	});

	it('builds the synchronized developer tree with valid canonical links and aliases', () => {
		const set = buildManifest(projectRoot)['phials-developer']!;
		expect(set.schemaVersion).toBe(2);
		expect(set.sections).toHaveLength(6);
		expect(Object.keys(set.pagesBySlug)).toHaveLength(289);
		expect(Object.keys(set.aliasesBySlug)).toHaveLength(164);
		expect(set.aliasesBySlug['plugins/public-api-contract']).toBe(
			'reference/plugin-contract-and-compatibility/public-sdk-support-contract'
		);
		expect(set.aliasesBySlug.plugins).toBe('');
		expect(set.pagesBySlug['reference/sdk-type-reference/PluginAPI']?.href).toBe(
			'/phials-developer/reference/sdk-type-reference/PluginAPI'
		);

		for (const page of Object.values(set.pagesBySlug)) {
			const source = fs.readFileSync(page.filePath, 'utf8');
			for (const match of source.matchAll(/\]\(([^)]+\.md)(?:#[^)]+)?\)/g)) {
				if (/^[a-z][a-z0-9+.-]*:/i.test(match[1]!)) continue;
				const target = path.resolve(path.dirname(page.filePath), match[1]!);
				expect(fs.existsSync(target), `${page.filePath} -> ${match[1]}`).toBe(true);
			}
		}
	});
});
