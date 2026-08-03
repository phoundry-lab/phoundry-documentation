/** Parse required / optional doc page frontmatter fields (build-time). */

/**
 * Required boolean `ai_disclosure` for Phials user/developer synced sets.
 * Throws with `filePath` when missing or non-boolean.
 */
export function requireAiDisclosure(front: Record<string, unknown>, filePath: string): boolean {
	const value = front['ai_disclosure'];
	if (typeof value !== 'boolean') {
		throw new Error(`Doc page frontmatter missing required boolean ai_disclosure: ${filePath}`);
	}
	return value;
}

/** Optional non-empty Iconify id (`collection:name`). */
export function parseOptionalIcon(value: unknown): string | undefined {
	if (typeof value !== 'string') return undefined;
	const trimmed = value.trim();
	return trimmed.length > 0 ? trimmed : undefined;
}

/** Optional legacy slug list. Invalid values fail the manifest build. */
export function parseDocAliases(value: unknown, filePath: string): string[] {
	if (value === undefined) return [];
	if (!Array.isArray(value)) {
		throw new Error(`Doc page aliases must be an array: ${filePath}`);
	}
	const aliases = value.map((entry) => {
		if (typeof entry !== 'string') {
			throw new Error(`Doc page aliases must contain strings: ${filePath}`);
		}
		const alias = entry.trim();
		if (!alias || alias.startsWith('/') || alias.endsWith('.md') || alias.includes('#')) {
			throw new Error(`Invalid doc page alias "${alias}": ${filePath}`);
		}
		return alias.replace(/\/+$/, '');
	});
	return [...new Set(aliases)];
}

/** Sidebar resolve: page icon → section icon → none. */
export function resolveDocSidebarIcon(
	pageIcon: string | undefined,
	sectionIcon: string | undefined
): string | undefined {
	return pageIcon ?? sectionIcon;
}

/** Sets that require `ai_disclosure` (synced from Phials). */
export function docSetRequiresAiDisclosure(setId: string): boolean {
	return setId === 'phials' || setId === 'phials-developer';
}
