<script lang="ts">
	import { Kbd } from "phoundry-ui";
</script>

<div class="space-y-3">
	<p class="text-xs text-txt-secondary">
		Create a manager, register shortcuts, and display formatted key combos.
	</p>
	<div class="flex items-center gap-3">
		<span class="text-xs text-txt-secondary">Save:</span>
		<Kbd keys="Mod+S" />
		<span class="text-xs text-txt-secondary">New:</span>
		<Kbd keys="Mod+N" />
	</div>
	<p class="text-[11px] text-txt-tertiary">
		The manager listens to keyboard events via <code>handleKeyDown()</code>.
		Wire it up in your layout's <code>onkeydown</code>.
	</p>
</div>
