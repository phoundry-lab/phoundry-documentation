<script lang="ts">
	import { onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import Select from '$phoundry/components/inputs/Select.svelte';
	import type {
		SelectOption,
		SelectOptionGroup
	} from '$phoundry/components/inputs/Select.svelte';
	import { getThemeManager, registerBuiltinThemes, DEFAULT_DARK_THEME } from '$phoundry/theme/index.js';

	const tm = getThemeManager();
	registerBuiltinThemes(tm);

	const initialTheme = tm.activeThemeId ?? DEFAULT_DARK_THEME;
	let current = $state(initialTheme);
	tm.apply(initialTheme);

	$effect(() => {
		if (!browser) return;
		// Apply the chosen palette for the phoundry-ui set.
		tm.apply(current);
	});

	// When the user navigates away from the phoundry-ui set, drop the inline
	// theme variables so the standard docs light/dark theme takes over again.
	onDestroy(() => {
		if (browser) tm.clearTheme();
	});

	const darkOptions = $derived(
		tm.getThemesByMode('dark').map((t) => ({ value: t.id, label: t.name }))
	);
	const lightOptions = $derived(
		tm.getThemesByMode('light').map((t) => ({ value: t.id, label: t.name }))
	);

	const options = $derived(
		[
			...(darkOptions.length ? [{ label: 'Dark', options: darkOptions }] : []),
			...(lightOptions.length ? [{ label: 'Light', options: lightOptions }] : [])
		] as (SelectOption<string> | SelectOptionGroup<string>)[]
	);
</script>

<Select
	id="ui-theme"
	aria-label="Theme"
	{options}
	value={current}
	onchange={(v: string | undefined) => {
		if (v) current = v;
	}}
	variant="outline"
	size="md"
	shrink
	placeholder="Theme"
/>
