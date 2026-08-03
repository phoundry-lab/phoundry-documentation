import manifest from '$lib/generated/manifest.json';
import type { DocsManifest } from '$lib/docs/types';
import type { LayoutLoad } from './$types';

export const prerender = true;
export const trailingSlash = 'never';

export const load: LayoutLoad = () => ({ manifest: manifest as unknown as DocsManifest });
