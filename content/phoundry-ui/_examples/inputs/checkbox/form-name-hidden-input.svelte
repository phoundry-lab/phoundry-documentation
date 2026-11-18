<script lang="ts">
	import { Checkbox } from "phoundry-ui";

	let agree = $state(false);
</script>

<p class="mb-2 text-xs text-txt-secondary">
	With <code>name</code>, a hidden <code>&lt;input type="checkbox"&gt;</code>
	mirrors state for native submission. Keep <code>id</code> in sync with external
	labels if you do not use the built-in label.
</p>
<Checkbox
	checked={agree}
	onchange={() => (agree = !agree)}
	name="demo-terms"
	label="Demo field name"
/>
