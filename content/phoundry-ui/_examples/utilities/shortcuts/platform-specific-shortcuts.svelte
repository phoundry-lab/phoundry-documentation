<script lang="ts">
	import { Kbd } from "phoundry-ui";
</script>

<div class="space-y-2">
	<p class="text-xs text-txt-secondary">
		Use per-platform objects for shortcuts that differ across operating systems.
	</p>
	<div class="flex items-center gap-3">
		<span class="text-xs text-txt-tertiary">Mac:</span>
		<Kbd keys="Mod+Backspace" />
		<span class="text-xs text-txt-tertiary">Win/Linux:</span>
		<Kbd keys="Ctrl+Shift+K" />
	</div>
</div>
