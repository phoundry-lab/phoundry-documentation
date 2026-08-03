<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import Button from '$phoundry/components/buttons/Button.svelte';
	import { tooltip } from '$phoundry/overlay/tooltip/index.js';
	import { PhiIcons } from '$phoundry/icons.js';

	const buttonTitleCode = `<Button title="Save" icon={PhiIcons.check} iconOnly />
<Button title="Search" icon={PhiIcons.search} iconOnly />`;

	const attachmentCode = `<span {@attach tooltip('Hover text')}>Hover me</span>
<span {@attach tooltip({ content: 'Hello', disabled: false })}>Options object</span>`;

	const snippetCode = `{#snippet richTooltip()}
  <span class="text-xs">Rich <strong class="text-txt-primary">snippet</strong> body</span>
{/snippet}

<span {@attach tooltip({ content: richTooltip })}>Hover me</span>`;
</script>

<div class="space-y-8">
	<Example title="Button with Title" code={buttonTitleCode}>
		<div class="flex items-center gap-3">
			<Button title="Save your work" icon={PhiIcons.check} iconOnly />
			<Button title="Edit item" icon={PhiIcons.edit} iconOnly />
			<Button title="Search" icon={PhiIcons.search} iconOnly />
		</div>
	</Example>

	<Example title="Tooltip Attachment" code={attachmentCode}>
		<div class="flex flex-wrap items-center gap-4">
			<span {@attach tooltip('This is a tooltip')} class="cursor-default rounded border border-border-muted px-3 py-1.5 text-sm text-txt-secondary">
				String shorthand
			</span>
			<span
				{@attach tooltip({ content: 'Uses TooltipOptions shape', disabled: false })}
				class="cursor-default rounded border border-border-muted px-3 py-1.5 text-sm text-txt-secondary"
			>
				Options object
			</span>
		</div>
	</Example>

	<Example title="Snippet content" code={snippetCode}>
		<div>
			{#snippet richTooltip()}
				<span class="text-xs">Rich <strong class="text-txt-primary">snippet</strong> body</span>
			{/snippet}
			<span {@attach tooltip({ content: richTooltip })} class="cursor-default rounded border border-border-muted px-3 py-1.5 text-sm text-txt-secondary">
				Hover for snippet
			</span>
		</div>
	</Example>
</div>
