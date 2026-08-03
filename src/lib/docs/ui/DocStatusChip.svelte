<script lang="ts">
	import Badge from '$phoundry/components/display/Badge.svelte';
	import type { DocPageStatus } from '$lib/docs/doc-page-status.js';

	interface Props {
		status: DocPageStatus;
	}

	let { status }: Props = $props();
</script>

{#if status === 'experimental'}
	<Badge color="yellow" size="sm">Experimental</Badge>
{/if}
