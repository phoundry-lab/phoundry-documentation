import { toHtml } from 'hast-util-to-html';
import { visit } from 'unist-util-visit';

/** Escape characters that break Svelte `{@html \`…\`}` template literals. */
/** @param {string} str */
function escapeSvelty(str) {
	return str
		.replace(/[{}`]/g, (c) => {
			if (c === '{') return '&#123;';
			if (c === '}') return '&#125;';
			return '&#96;';
		})
		.replace(/\\([trn])/g, '&#92;$1');
}

/**
 * Wrap Shiki `<pre>` output in `{@html}` so Svelte does not parse `{` / `}` in highlighted code.
 * Must run immediately after `@shikijs/rehype`.
 */
export function rehypeShikiHtml() {
	/** @param {any} tree */
	return (tree) => {
		visit(tree, 'element', (node, index, parent) => {
			if (!parent || index == null || node.tagName !== 'pre') return;

			const html = toHtml(node, { allowDangerousHtml: true });
			parent.children[index] = {
				type: 'html',
				value: `{@html \`${escapeSvelty(html)}\`}`
			};
		});
	};
}
