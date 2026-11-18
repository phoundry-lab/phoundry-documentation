<script lang="ts">
	import { Avatar } from "phoundry-ui";
	import { PhiIcons } from "phoundry-ui";
</script>

<p class="mb-2 text-xs text-txt-secondary">
	Use any Iconify id or shared tokens from <code>PhiIcons</code> when there is no
	photo or initials.
</p>
<div class="flex items-center gap-3">
	<Avatar icon={PhiIcons.folder} />
	<Avatar icon={PhiIcons.document} />
</div>
