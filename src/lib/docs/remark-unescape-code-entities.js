import { visit } from 'unist-util-visit';

/** Reverse mdsvex `escape_code` entity encoding on fenced code blocks before rehype-shiki runs. */
const ENTITY_PAIRS = [
	['&#123;', '{'],
	['&#125;', '}'],
	['&lt;', '<'],
	['&gt;', '>']
];

export function remarkUnescapeCodeEntities() {
	/** @param {any} tree */
	return (tree) => {
		visit(tree, 'code', (node) => {
			for (const [entity, char] of ENTITY_PAIRS) {
				node.value = node.value.split(entity).join(char);
			}
		});
	};
}
