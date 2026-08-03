import path from 'node:path';
import posixPath from 'node:path/posix';
import { fileURLToPath } from 'node:url';
import rehypeShiki from '@shikijs/rehype';
import fg from 'fast-glob';
import rehypeAutolink from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import { createCssVariablesTheme } from 'shiki';
import { visit } from 'unist-util-visit';
import { transformHref } from './src/lib/docs/doc-link-paths.js';
import { remarkUnescapeCodeEntities } from './src/lib/docs/remark-unescape-code-entities.js';
import { rehypeShikiHtml } from './src/lib/docs/rehype-shiki-html.js';

const ABS = /^(https?:|data:|mailto:|tel:)/i;
const ABS_LINK = /^(https?:|mailto:|tel:)/i;

/** Dual themes with disjoint prefixes so Shiki can emit `color` + `--shiki-dark` per token. */
const phoundryShikiThemes = {
	light: createCssVariablesTheme({
		name: 'phoundry-light',
		variablePrefix: '--shiki-light-'
	}),
	dark: createCssVariablesTheme({
		name: 'phoundry-dark',
		variablePrefix: '--shiki-dark-'
	})
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const docLayoutPath = path.join(__dirname, 'src', 'lib', 'docs', 'DocLayout.svelte');
/** phoundry-ui doc set: lighter prose wrapper so embedded live demos are not styled by `.doc-md`. */
const uiDocLayoutPath = path.join(__dirname, 'src', 'lib', 'docs', 'UiDocLayout.svelte');

/** @typedef {Record<string, string>} MediaMap */

/** @returns {MediaMap} */
function buildMediaMap() {
	/** @type {MediaMap} */
	const o = {};
	for (const f of fg.sync('content/**/_media/*', {
		cwd: process.cwd(),
		onlyFiles: true,
		dot: false
	})) {
		const k = f.replaceAll(posixPath.sep, '/');
		o[k] = '/docs-assets/' + k.split('/').slice(1).map(encodeURIComponent).join('/');
	}
	return o;
}

const mediaPathToUrl = buildMediaMap();

/** @param {string} absolute */
function toDocumentationRelPath(absolute) {
	const a = absolute.replaceAll('\\', '/');
	const i = a.indexOf('content/');
	if (i >= 0) return a.slice(i);
	if (a.includes('content')) {
		const j = a.lastIndexOf('content/');
		return a.slice(j);
	}
	return a;
}

/**
 * @param {string} docPath
 * @param {string} src
 * @param {MediaMap} [mediaMap]
 */
function mediaUrlForDocFile(docPath, src, mediaMap = mediaPathToUrl) {
	if (!src) return src;
	if (/^(https?:|data:)/i.test(src)) return src;
	const relDoc = toDocumentationRelPath(docPath);
	const dir = posixPath.dirname(relDoc);
	const joined = posixPath.normalize(posixPath.join(dir, src));
	const key = joined.startsWith('content/')
		? joined
		: `content/${joined}`.replace(/^content\/+/, 'content/');
	const u = mediaMap[key] ?? mediaMap[joined];
	if (u) return u;
	throw new Error(`[docs] Missing media: ${key} (src ${src} in ${relDoc}). Add the file or fix the path.`);
}

function remarkDocLinks() {
	return (
		/** @param {import('mdast').Root} tree @param {import('vfile').VFile} file */
		(tree, file) => {
			const fp =
				file.path ??
				file.history?.[0] ??
				/** @type {import('vfile').VFile & { filename?: string }} */ (file).filename;
			visit(tree, 'link', (link) => {
				let u = link.url;
				if (u && !ABS_LINK.test(u) && !u.startsWith('data:') && u.includes('_media') && fp) {
					const h = u.indexOf('#');
					const p = h < 0 ? u : u.slice(0, h);
					const hash = h < 0 ? '' : u.slice(h);
					const resolved = mediaUrlForDocFile(fp, p, mediaPathToUrl);
					u = resolved + hash;
				} else {
					u = transformHref(u, fp);
				}
				if (u != null) link.url = u;
			});
			visit(tree, 'definition', (def) => {
				let u = def.url;
				if (u && !ABS_LINK.test(u) && u.includes('_media') && fp) {
					const h = u.indexOf('#');
					const p = h < 0 ? u : u.slice(0, h);
					const hash = h < 0 ? '' : u.slice(h);
					const resolved = mediaUrlForDocFile(fp, p, mediaPathToUrl);
					u = resolved + hash;
				} else {
					u = transformHref(u, fp);
				}
				if (u != null) def.url = u;
			});
		}
	);
}

function remarkDocImages() {
	return (
		/** @param {import('mdast').Root} tree @param {import('vfile').VFile} file */
		(tree, file) => {
		const p = file.path ?? file.history?.[0];
		if (!p) return;
		visit(tree, 'image', (node) => {
			if (!node.url || ABS.test(node.url)) return;
			const url = mediaUrlForDocFile(p, node.url, mediaPathToUrl);
			if (url) node.url = url;
		});
		}
	);
}

export const mdsvexConfig = {
	extensions: ['.md'],
	smartypants: { quotes: true, ellipses: true, dashes: 'oldschool' },
	remarkPlugins: [remarkUnescapeCodeEntities, remarkDocLinks, remarkDocImages],
	rehypePlugins: [
		rehypeSlug,
		[rehypeAutolink, { behavior: 'wrap' }],
		[
			rehypeShiki,
			{
				themes: phoundryShikiThemes,
				defaultColor: 'light'
			}
		],
		rehypeShikiHtml
	],
	layout: {
		_: docLayoutPath,
		ui: uiDocLayoutPath
	},
	highlight: false
};
