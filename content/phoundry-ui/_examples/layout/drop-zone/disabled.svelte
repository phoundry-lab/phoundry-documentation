<script lang="ts">
	import { DropZone } from "phoundry-ui";
</script>

<DropZone ondrop={() => {}} disabled>
	<div
		class="rounded-lg border-2 border-dashed border-border-muted p-6 text-center text-xs text-txt-tertiary"
	>
		Uploads disabled - drag still shows browser cursor but this zone ignores it.
	</div>
</DropZone>
