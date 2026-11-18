import { getAllContexts, setContext } from "svelte";
import { setupOverlays } from "$phoundry/overlay/setup-overlays.js";

let shared: Map<unknown, unknown> | undefined;

/** Public Svelte context APIs let independent Astro islands share one overlay
 * environment. Server renders get fresh providers, never process-wide state. */
export function provideDemoContext() {
	if (import.meta.env.SSR) {
		setupOverlays();
		return;
	}
	if (!shared) {
		setupOverlays();
		shared = new Map(getAllContexts());
	} else {
		for (const [key, value] of shared) setContext(key, value);
	}
}
