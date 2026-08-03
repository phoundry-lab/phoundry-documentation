import type { DocPage, DocSection, DocSet } from './types';

export type DocSidebarRow =
	| {
			kind: 'group';
			group: DocSection;
			depth: number;
			expanded: boolean;
			active: boolean;
			ancestorOfActive: boolean;
	  }
	| {
			kind: 'page';
			page: DocPage;
			depth: number;
			fallbackIcon?: string;
			active: boolean;
	  };

export type DocBreadcrumb = {
	label: string;
	href: string | null;
};

function groupContainsSlug(group: DocSection, slug: string): boolean {
	return slug === group.id || slug.startsWith(`${group.id}/`);
}

export function findDocSectionPath(set: DocSet, page: DocPage): DocSection[] {
	const visit = (sections: DocSection[], ancestors: DocSection[]): DocSection[] | null => {
		for (const section of sections) {
			const path = [...ancestors, section];
			if (
				section.indexPage?.slug === page.slug ||
				section.pages.some((entry) => entry.slug === page.slug)
			) {
				return path;
			}
			const nested = visit(section.sections, path);
			if (nested) return nested;
		}
		return null;
	};
	return visit(set.sections, []) ?? [];
}

export function buildDocBreadcrumbs(set: DocSet, page: DocPage): DocBreadcrumb[] {
	const breadcrumbs: DocBreadcrumb[] = [
		{ label: set.title, href: page.slug === set.home.slug ? null : set.home.href }
	];
	if (page.slug === set.home.slug) return breadcrumbs;
	for (const section of findDocSectionPath(set, page)) {
		if (section.indexPage?.slug === page.slug) break;
		breadcrumbs.push({
			label: section.title,
			href: section.indexPage?.href ?? null
		});
	}
	breadcrumbs.push({ label: page.title, href: null });
	return breadcrumbs;
}

export function buildDocSidebarRows(
	set: DocSet,
	currentSlug: string,
	expansionOverrides: Readonly<Record<string, boolean>>
): DocSidebarRow[] {
	const rows: DocSidebarRow[] = [];
	const appendGroup = (group: DocSection, depth: number) => {
		const active = group.indexPage?.slug === currentSlug;
		const ancestorOfActive = !active && groupContainsSlug(group, currentSlug);
		const expanded = expansionOverrides[group.id] ?? ancestorOfActive;
		rows.push({
			kind: 'group',
			group,
			depth,
			expanded,
			active,
			ancestorOfActive
		});
		if (!expanded) return;
		for (const page of group.pages) {
			if (page.hidden) continue;
			rows.push({
				kind: 'page',
				page,
				depth: depth + 1,
				fallbackIcon: group.icon,
				active: page.slug === currentSlug
			});
		}
		for (const child of group.sections) appendGroup(child, depth + 1);
	};
	for (const section of set.sections) appendGroup(section, 0);
	return rows;
}
