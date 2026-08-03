<script lang="ts">
	import {
		setupOverlays,
		ComboboxOverlay,
		ContextMenuOverlay,
		ModalOverlay,
		PopoverOverlay,
		TooltipOverlay,
		ToastOverlay
	} from '$phoundry/overlay/index.js';

	setupOverlays();

	let { children } = $props();
</script>

{@render children()}

<ContextMenuOverlay />
<ComboboxOverlay />
<ModalOverlay />
<PopoverOverlay />
<TooltipOverlay />
<ToastOverlay />
