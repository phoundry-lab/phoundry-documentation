<script lang="ts">
	import { Breadcrumb } from "phoundry-ui";
	import type { BreadcrumbItem } from "phoundry-ui";

	const basicItems: BreadcrumbItem[] = [
		{ id: "home", label: "Home" },
		{ id: "docs", label: "Docs" },
		{ id: "breadcrumb", label: "Breadcrumb" },
	];
</script>

<p class="mb-2 text-xs text-txt-secondary">
	Use <code>separator</code> for brand-specific glyphs; <code>size="md"</code> bumps
	text and icon metrics.
</p>
<Breadcrumb items={basicItems} separator="›" size="md" />
