<script lang="ts">
	import { provideDemoContext } from "../../lib/ui/demo-context";
	import { addCollection, type IconifyJSON } from "@iconify/svelte";
	import icons from "../../lib/generated/doc-icons.json";
	import ContextMenuOverlay from "$phoundry/overlay/context-menu/ContextMenuOverlay.svelte";
	import ComboboxOverlay from "$phoundry/overlay/combobox/ComboboxOverlay.svelte";
	import ModalOverlay from "$phoundry/overlay/modal/ModalOverlay.svelte";
	import PopoverOverlay from "$phoundry/overlay/popover/PopoverOverlay.svelte";
	import TooltipOverlay from "$phoundry/overlay/tooltip/TooltipOverlay.svelte";
	import ToastOverlay from "$phoundry/overlay/toast/ToastOverlay.svelte";
	provideDemoContext();
	for (const collection of icons) addCollection(collection as IconifyJSON);
</script>

<ContextMenuOverlay /><ComboboxOverlay /><ModalOverlay /><PopoverOverlay
/><TooltipOverlay /><ToastOverlay />
