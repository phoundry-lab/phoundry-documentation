import { getContext, setContext } from 'svelte';

/** Supported doc page status values (v1: experimental only). */
export type DocPageStatus = 'experimental';

const DOC_PAGE_STATUS_KEY = Symbol('doc-page-status');

export function provideDocPageStatus(getStatus: () => DocPageStatus | undefined): void {
	setContext(DOC_PAGE_STATUS_KEY, getStatus);
}

export function getDocPageStatus(): DocPageStatus | undefined {
	return getContext<(() => DocPageStatus | undefined)>(DOC_PAGE_STATUS_KEY)?.();
}

export function parseDocPageStatus(value: unknown): DocPageStatus | undefined {
	return value === 'experimental' ? 'experimental' : undefined;
}
