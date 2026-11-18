<script lang="ts">
	import { Select } from "phoundry-ui";
	import type { SelectOption } from "phoundry-ui";
	import { Badge } from "phoundry-ui";
	import { TextInput } from "phoundry-ui";

	let sm = $state<string | undefined>(undefined);

	let snippetVal = $state<string | undefined>(undefined);

	let customStatusText = $state("");

	const statusBadgeColors: Record<string, "green" | "yellow" | "red" | "gray"> =
		{
			online: "green",
			away: "yellow",
			busy: "red",
			offline: "gray",
		};

	const snippetOptions: SelectOption[] = [
		{ value: "online", label: "Online" },
		{ value: "away", label: "Away" },
		{ value: "busy", label: "Busy" },
		{ value: "offline", label: "Offline" },
	];
</script>

{#snippet customInputRow()}
	<TextInput
		value={customStatusText}
		oninput={(v: string) => (customStatusText = v)}
		placeholder="Custom status..."
		size="sm"
		variant="fill"
	/>
{/snippet}

{#snippet statusRow({
	option,
	selected,
}: {
	option: SelectOption;
	selected: boolean;
})}
	<span class="flex min-w-0 flex-1 items-center gap-2">
		<Badge color={statusBadgeColors[option.value]} dot />
		<span class="truncate text-xs" class:font-medium={selected}
			>{option.label}</span
		>
	</span>
{/snippet}

<p class="mb-2 text-xs text-txt-secondary">
	Pass a <code>custom</code> object with a <code>snippet</code> for fully custom
	rendering in both the dropdown and the trigger. Set
	<code>selectable: false</code> to embed interactive content that doesn't trigger
	selection.
</p>
<div class="max-w-xs">
	<Select
		options={[
			...snippetOptions.map((o) => ({ ...o, custom: { snippet: statusRow } })),
			{
				value: "",
				label: "",
				custom: { snippet: customInputRow, selectable: false },
			},
		]}
		value={snippetVal}
		onchange={(v: string | undefined) => {
			snippetVal = v;
		}}
		placeholder="Set status..."
	/>
</div>
<p class="mt-2 text-xs text-txt-tertiary">Selected: {snippetVal ?? "none"}</p>
