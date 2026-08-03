<script lang="ts">
	import Badge from '$phoundry/components/display/Badge.svelte';
	import {
		getThemeManager,
		registerBuiltinThemes,
		DEFAULT_DARK_THEME,
		DEFAULT_LIGHT_THEME
	} from '$phoundry/theme/index.js';

	const tm = getThemeManager();
	registerBuiltinThemes(tm);

	const initialTheme = tm.activeThemeId ?? DEFAULT_DARK_THEME;
	let selected = $state(initialTheme);
	tm.apply(initialTheme);

	const darkThemes = $derived(tm.getThemesByMode('dark'));
	const lightThemes = $derived(tm.getThemesByMode('light'));

	function apply(id: string) {
		selected = id;
		tm.apply(id);
	}

	function reset() {
		apply(DEFAULT_DARK_THEME);
	}
</script>

<div class="space-y-4">
	<p class="text-xs text-txt-secondary">
		Click any theme to apply it live. This documentation updates to show the selected palette.
	</p>

	{#each [{ label: 'Dark Themes', themes: darkThemes }, { label: 'Light Themes', themes: lightThemes }] as group (group.label)}
		<div>
			<h3 class="mb-2 text-sm font-medium text-txt-primary">{group.label}</h3>
			<div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
				{#each group.themes as theme (theme.id)}
					{@const isActive = selected === theme.id}
					<button
						type="button"
						class="flex items-center gap-2.5 rounded-lg border px-3 py-2 text-left transition-colors
							{isActive
							? 'border-accent-primary bg-accent-primary/5'
							: 'border-border-muted bg-surface-sunken/30 hover:border-border-default'}"
						onclick={() => apply(theme.id)}
					>
						{#if theme.preview}
							<div class="flex shrink-0 gap-0.5">
								<span
									class="h-3.5 w-3.5 rounded-full border border-border-muted"
									style="background: {theme.preview.background}"
								></span>
								<span
									class="h-3.5 w-3.5 rounded-full border border-border-muted"
									style="background: {theme.preview.accent}"
								></span>
								<span
									class="h-3.5 w-3.5 rounded-full border border-border-muted"
									style="background: {theme.preview.foreground}"
								></span>
							</div>
						{/if}
						<div class="min-w-0">
							<div class="truncate text-xs font-medium text-txt-primary">{theme.name}</div>
							{#if theme.author}
								<div class="truncate text-[10px] text-txt-tertiary">{theme.author}</div>
							{/if}
						</div>
						{#if isActive}
							<Badge size="sm" class="ml-auto shrink-0">active</Badge>
						{/if}
					</button>
				{/each}
			</div>
		</div>
	{/each}

	<button
		type="button"
		class="text-xs text-accent-secondary transition-colors hover:text-accent-primary"
		onclick={reset}
	>
		Reset to Default Dark
	</button>
</div>
