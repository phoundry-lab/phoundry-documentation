<script lang="ts">
	import { Anchor } from "phoundry-ui";

	let autoContainer = $state<HTMLElement>();
</script>

<div class="flex gap-4">
	<Anchor target={autoContainer} headingSelector="h3" affix={false} />
	<div
		bind:this={autoContainer}
		class="h-48 flex-1 space-y-4 overflow-y-auto rounded-lg border border-border-muted p-4"
	>
		<section>
			<h3 class="text-sm font-medium text-txt-primary">Overview</h3>
			<p class="mt-1 text-xs text-txt-secondary">
				The auto mode scans the container for headings and builds the item list.
			</p>
			<div class="h-24"></div>
		</section>
		<section>
			<h3 class="text-sm font-medium text-txt-primary">Configuration</h3>
			<p class="mt-1 text-xs text-txt-secondary">
				Use headingSelector to control which elements are picked up.
			</p>
			<div class="h-24"></div>
		</section>
		<section>
			<h3 class="text-sm font-medium text-txt-primary">Scroll Tracking</h3>
			<p class="mt-1 text-xs text-txt-secondary">
				Active state updates automatically as the user scrolls.
			</p>
			<div class="h-24"></div>
		</section>
		<section>
			<h3 class="text-sm font-medium text-txt-primary">Events</h3>
			<p class="mt-1 text-xs text-txt-secondary">
				onChange fires whenever the active link changes.
			</p>
			<div class="h-24"></div>
		</section>
	</div>
</div>
