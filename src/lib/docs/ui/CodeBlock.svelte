<script lang="ts">
	import CodeBlock from '$phoundry/components/display/CodeBlock.svelte';
	import type { ComponentProps } from 'svelte';

	let props: ComponentProps<typeof CodeBlock> = $props();
</script>

<CodeBlock {...props} />
