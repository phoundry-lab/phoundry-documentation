import type { Component } from 'svelte';

type DocMod = { default: Component; metadata?: Record<string, unknown> };

// Eager imports let SSR render doc article content. Lazy imports leave the server-rendered article
// empty and are fragile when docs routes are host-rerouted.
const moduleFull = import.meta.glob('/content/**/*.md', {
	eager: true
}) as Record<string, DocMod>;

/** Key used by the glob map (Vite: `/content/...` from project root). */
export function filePathToGlobKey(filePath: string): string {
	const n = filePath.replaceAll('\\', '/').replace(/^\/+/, '');
	if (!n.startsWith('content/')) {
		throw new Error(`Expected filePath under content/: ${filePath}`);
	}
	return `/${n}`;
}

export type LoadedDocPage = {
	Component: Component;
	metadata: Record<string, unknown>;
};

export function getPage(filePath: string): LoadedDocPage {
	const key = filePathToGlobKey(filePath);
	const mod = moduleFull[key] ?? moduleFull[key.replace(/^\//, '')];
	if (!mod) {
		throw new Error(`Missing doc page: ${key}`);
	}
	return {
		Component: mod.default,
		metadata: mod.metadata ?? {}
	};
}

export async function loadPage(filePath: string): Promise<LoadedDocPage> {
	return getPage(filePath);
}
