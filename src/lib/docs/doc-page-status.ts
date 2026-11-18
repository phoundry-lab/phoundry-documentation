/** Supported doc page status values (v1: experimental only). */
export type DocPageStatus = 'experimental';

export function parseDocPageStatus(value: unknown): DocPageStatus | undefined {
	return value === 'experimental' ? 'experimental' : undefined;
}
