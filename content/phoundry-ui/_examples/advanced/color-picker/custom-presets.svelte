<script lang="ts">
	import type { Component } from "svelte";

	import { ColorPicker } from "phoundry-ui";

	let presetDemo = $state("#06b6d4");

	let managedPresets = $state([
		{ id: "midnight", name: "Midnight", value: "#0f172a" },
		{ id: "slate", name: "Slate", value: "#64748b" },
	]);

	type PickerPreset = { id: string; name: string; value: string };

	type ExpandedPickerProps = {
		value: string;
		onchange: (value: string) => void;
		format?: "hex" | "rgb" | "hsl";
		showInput?: boolean;
		showChannelSummary?: boolean;
		showPresets?: boolean;
		presetColors?: PickerPreset[];
		recentColors?: string[];
		customColors?: {
			label: string;
			description?: string;
			colors: Array<{
				id: string;
				name: string;
				value: string;
				onpick: () => void;
			}>;
		};
		onpresetadd?: (value: string) => void;
		onpresetdelete?: (preset: PickerPreset) => void;
		disabled?: boolean;
		size?: "sm" | "md";
	};

	const ExpandedColorPicker =
		ColorPicker as unknown as Component<ExpandedPickerProps>;

	const themeColors = {
		label: "Theme Colors",
		description: "These colors match the active application theme.",
		colors: [
			{
				id: "theme-blue",
				name: "Blue",
				value: "var(--option-blue)",
				onpick: () => (presetDemo = "var(--option-blue)"),
			},
			{
				id: "theme-green",
				name: "Green",
				value: "var(--option-green)",
				onpick: () => (presetDemo = "var(--option-green)"),
			},
			{
				id: "theme-pink",
				name: "Pink",
				value: "var(--option-pink)",
				onpick: () => (presetDemo = "var(--option-pink)"),
			},
		],
	};
</script>

<ExpandedColorPicker
	value={presetDemo}
	onchange={(c: string) => {
		presetDemo = c;
	}}
	presetColors={managedPresets}
	recentColors={["#f97316", "#8b5cf6"]}
	customColors={themeColors}
	onpresetadd={(value) => {
		managedPresets = [
			...managedPresets,
			{ id: crypto.randomUUID(), name: value, value },
		];
	}}
	onpresetdelete={(preset) => {
		managedPresets = managedPresets.filter((item) => item.id !== preset.id);
	}}
/>
