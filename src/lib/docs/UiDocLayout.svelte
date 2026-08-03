<!--
	mdsvex layout for the phoundry-ui doc set (frontmatter `layout: ui`).
	Uses `.ui-doc` (not `.doc-md`) so the heavy prose CSS does not bleed into embedded
	live demo components. Keeps `.md-doc` so DocTOC still scans markdown headings.
-->
<div class="ui-doc md-doc">
	<slot />
</div>
