<script lang="ts">
	import { Button } from "phoundry-ui";
	import { TextInput } from "phoundry-ui";
	import { createFocusTrap } from "phoundry-ui";

	let trapActive = $state(false);

	const trap = createFocusTrap({
		escapeDeactivates: true,
		onEscape: () => (trapActive = false),
	});
</script>

<div class="space-y-3">
	{#if !trapActive}
		<Button onclick={() => (trapActive = true)} variant="primary"
			>Activate Trap</Button
		>
		<p class="text-xs text-txt-tertiary">
			Click to open a focus-trapped panel.
		</p>
	{/if}

	{#if trapActive}
		<div
			use:trap.action
			class="space-y-3 rounded-lg border border-accent-primary bg-surface-sunken/50 p-4"
		>
			<TextInput value="" placeholder="First input (auto-focused)" />
			<TextInput value="" placeholder="Second input" />
			<div class="flex gap-2">
				<Button variant="primary">Confirm</Button>
				<Button onclick={() => (trapActive = false)}>Cancel</Button>
			</div>
			<p class="text-[11px] text-txt-tertiary">
				Tab cycles within this panel. Press <kbd>Escape</kbd> to exit.
			</p>
		</div>
	{/if}
</div>
