<script lang="ts">
	import { Sheet } from "phoundry-ui";
	import { Button } from "phoundry-ui";

	let modalLikeOpen = $state(false);
</script>

<Button variant="secondary" onclick={() => (modalLikeOpen = true)}
	>Open guarded sheet</Button
>
<Sheet
	open={modalLikeOpen}
	onclose={() => (modalLikeOpen = false)}
	closeOnBackdrop={false}
	title="Confirm"
>
	<div class="space-y-3 px-4 pb-4 text-sm">
		<p class="text-txt-secondary">
			Users cannot dismiss accidentally-, require an explicit action.
		</p>
		<Button size="sm" onclick={() => (modalLikeOpen = false)}
			>Acknowledge</Button
		>
	</div>
</Sheet>
