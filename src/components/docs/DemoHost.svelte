<script lang="ts">
	import { onMount, type Component } from "svelte";
	import { provideDemoContext } from "../../lib/ui/demo-context";
	let { name }: { name: string } = $props();
	const examples = import.meta.glob<{ default: Component }>(
		"/content/phoundry-ui/_examples/**/*.svelte",
	);
	let Example = $state<Component | null>(null);
	let failure = $state("");
	provideDemoContext();
	onMount(() => {
		let active = true;
		const load = examples[`/content/phoundry-ui/_examples/${name}.svelte`];
		if (!load) {
			failure = `Unknown example: ${name}`;
			return;
		}
		load()
			.then((module) => {
				if (active) Example = module.default;
			})
			.catch((error: Error) => {
				failure = error.message;
			});
		return () => {
			active = false;
		};
	});
</script>

{#if Example}<Example />{:else if failure}<p role="alert">{failure}</p>{:else}<p
		class="example-loading"
	>
		Loading interactive example…
	</p>{/if}
