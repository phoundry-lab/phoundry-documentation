<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import Button from '$phoundry/components/buttons/Button.svelte';
	import TextInput from '$phoundry/components/inputs/TextInput.svelte';
	import { createFocusTrap } from '$phoundry/utilities/focus/focus-trap.svelte.js';

	let trapActive = $state(false);
	const trap = createFocusTrap({
		escapeDeactivates: true,
		onEscape: () => (trapActive = false)
	});

	const basicCode = `<script lang="ts">
  import { createFocusTrap } from 'phoundry-ui';
  import { Button, TextInput } from 'phoundry-ui';

  let trapActive = $state(false);
  const trap = createFocusTrap({
    escapeDeactivates: true,
    onEscape: () => (trapActive = false),
  });
<${'/'}script>

<Button onclick={() => (trapActive = true)}>Activate Trap</Button>

{#if trapActive}
  <div use:trap.action class="p-4 border rounded-lg space-y-3">
    <TextInput placeholder="First input (auto-focused)" />
    <TextInput placeholder="Second input" />
    <div class="flex gap-2">
      <Button variant="primary">Confirm</Button>
      <Button onclick={() => (trapActive = false)}>Cancel</Button>
    </div>
    <p class="text-xs text-txt-tertiary">
      Tab cycles within this panel. Press Escape to exit.
    </p>
  </div>
{/if}`;
</script>

<Example title="Interactive Focus Trap" code={basicCode}>
	<div class="space-y-3">
		{#if !trapActive}
			<Button onclick={() => (trapActive = true)} variant="primary">Activate Trap</Button>
			<p class="text-xs text-txt-tertiary">Click to open a focus-trapped panel.</p>
		{/if}

		{#if trapActive}
			<div use:trap.action class="space-y-3 rounded-lg border border-accent-primary bg-surface-sunken/50 p-4">
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
</Example>
