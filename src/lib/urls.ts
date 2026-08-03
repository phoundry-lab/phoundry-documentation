import type { SiteId } from './site-ids';

function normalizePath(path: string): string {
	if (!path || path === '/') return '/';
	return path.startsWith('/') ? path : `/${path}`;
}

export function siteUrl(site: SiteId, path = '/', currentUrl?: URL | string): string {
	const pathname = normalizePath(path);
	if (site === 'docs' && currentUrl) {
		const current = typeof currentUrl === 'string' ? new URL(currentUrl) : currentUrl;
		return new URL(pathname, current.origin).href;
	}
	const host = site === 'main' ? 'phoundry.app' : `${site}.phoundry.app`;
	return `https://${host}${pathname}`;
}

