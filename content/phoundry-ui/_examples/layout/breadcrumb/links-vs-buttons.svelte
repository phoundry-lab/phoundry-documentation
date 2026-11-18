<script lang="ts">
	import { Breadcrumb } from "phoundry-ui";
	import type { BreadcrumbItem } from "phoundry-ui";
	import { PhiIcons } from "phoundry-ui";

	const hrefItems: BreadcrumbItem[] = [
		{ id: "home", label: "Home", href: "#bc-h-home", icon: PhiIcons.folder },
		{ id: "docs", label: "Docs", href: "#bc-h-docs" },
		{ id: "here", label: "Current page" },
	];
</script>

<p class="mb-2 text-xs text-txt-secondary">
	Segments with <code>href</code> render as real links for middle crumbs; the
	last segment stays plain text. Use <code>onnavigate</code> when you route with a
	SPA helper instead.
</p>
<Breadcrumb items={hrefItems} />
