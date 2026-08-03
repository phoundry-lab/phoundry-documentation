import { describe, expect, it } from 'vitest';
import { transformHref } from './doc-link-paths.js';

describe('docs Markdown link paths', () => {
	it('keeps root-index links inside the doc set on host and loopback routes', () => {
		expect(transformHref('./get-started/index.md', 'content/phials/index.md')).toBe(
			'phials/get-started'
		);
	});

	it('keeps section-index links inside their current route', () => {
		expect(
			transformHref('./what-is-phials/index.md', 'content/phials/get-started/index.md')
		).toBe('get-started/what-is-phials');
	});

	it('resolves parent, sibling, and same-page links without trailing-slash assumptions', () => {
		const current = 'content/phials/get-started/phials-basics/browsing-in-phials.md';
		expect(transformHref('../index.md', current)).toBe('../../get-started');
		expect(transformHref('./the-phials-window.md', current)).toBe('the-phials-window');
		expect(transformHref('./browsing-in-phials.md#selection', current)).toBe('#selection');
	});

	it('leaves external and non-Markdown root links unchanged', () => {
		const current = 'content/phials/index.md';
		expect(transformHref('https://example.com/docs', current)).toBe('https://example.com/docs');
		expect(transformHref('/pricing', current)).toBe('/pricing');
	});
});
