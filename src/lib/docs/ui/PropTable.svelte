<script lang="ts">
	import Badge from '$phoundry/components/display/Badge.svelte';

	export interface PropDef {
		name: string;
		type: string;
		default?: string;
		description: string;
		required?: boolean;
	}

	interface Props {
		props: PropDef[];
		title?: string;
	}

	let { props, title = 'Props' }: Props = $props();
</script>

<section class="space-y-2">
	<h3 class="text-sm font-medium text-txt-primary">{title}</h3>
	<div class="overflow-hidden rounded-lg border border-border-muted">
		<table class="w-full text-xs">
			<thead>
				<tr class="bg-surface-sunken text-left">
					<th class="px-3 py-2 font-medium text-txt-secondary">Prop</th>
					<th class="px-3 py-2 font-medium text-txt-secondary">Type</th>
					<th class="px-3 py-2 font-medium text-txt-secondary">Default</th>
					<th class="px-3 py-2 font-medium text-txt-secondary">Description</th>
				</tr>
			</thead>
			<tbody>
				{#each props as prop (prop.name)}
					<tr class="border-t border-border-muted">
						<td class="px-3 py-2 font-mono whitespace-nowrap text-accent-secondary">
							{prop.name}
							{#if prop.required}
								<Badge color="red" size="sm">required</Badge>
							{/if}
						</td>
						<td class="px-3 py-2 font-mono whitespace-nowrap text-txt-tertiary">{prop.type}</td>
						<td class="px-3 py-2 font-mono text-txt-tertiary">{prop.default ?? '-'}</td>
						<td class="px-3 py-2 text-txt-secondary">{prop.description}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>
