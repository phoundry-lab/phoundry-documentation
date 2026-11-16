---
title: "Fix plugin interface and rendering failures"
description: "Isolates component exceptions, missing styles or dependencies, invalid props, container assumptions, focus failures, and accessibility regressions."
ai_disclosure: true
order: 3
---

# Fix plugin interface and rendering failures

When a provider was selected but its interface fails, classify the visible
result before changing the component. A surface-level fallback, a blank
component, missing styles, and incorrect interaction point to different
boundaries.

## Route the visible symptom

| Visible symptom                                                          | Likely cause                                                                                    | Next action                                                                                                | Expected result                                                                          |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| A surface says **_Plugin name_ failed to load** and offers **Try again** | The Svelte component threw while creating or rendering                                          | Preserve the first relevant stack, reduce the component to static content, then restore work incrementally | Static content renders; the first restored step that fails identifies the component path |
| A thumbnail silently falls back                                          | The thumbnail component threw                                                                   | Reproduce with one file and inspect the first relevant console error                                       | The thumbnail renders, while unsupported files continue to use the normal fallback       |
| The surface is blank but has no failure state                            | A branch renders nothing, loading never settles, or size is zero                                | Render a visible shell and inspect all loading, empty, error, and size branches                            | One deliberate state is visible at every point                                           |
| Content is present but unstyled | Plugin CSS was not emitted or installed, a shared component/style contract differs, or an optional utility build is missing | Inspect the relevant CSS and computed styles, rebuild, verify the release, reinstall, and reload | Plugin styles load and shared controls match the host’s available styles |
| The component fails only after interaction                               | An event handler, asynchronous task, or retained resource throws                                | Reproduce one action and handle its failure at the action boundary                                         | The component stays mounted and reports an actionable error                              |
| Content clips, overflows, or breaks after moving surfaces                | The component assumes a viewport size or one destination                                        | Test narrow, wide, short, and resized containers using the supplied props                                  | The component responds to its container without destination-specific host assumptions    |
| Keyboard focus disappears or controls are unusable without a pointer     | Focus is not moved deliberately, semantics are missing, or DOM order differs from visual order  | Walk the complete task by keyboard and inspect names, roles, order, and focus return                       | Every action is reachable, announced, and returns focus predictably                      |

## Reduce to a known-good surface

Replace the failing component body temporarily with the smallest valid
component for that provider:

```svelte
<script lang="ts">
	let { file, destination }: PreviewSurfaceProps = $props();
</script>

<section aria-labelledby="diagnostic-title">
	<h2 id="diagnostic-title">Review surface</h2>
	<p>{file.name}</p>
	<p>Destination: {destination}</p>
</section>
```

Use the exact documented props for the provider. Do not cast an arbitrary object
to the props type or reach for a global host object. If the reduced component
renders, provider selection and mounting are healthy.

Restore in this order:

1. prop normalization and empty states;
2. Phoundry UI components and plugin styles;
3. settings or durable data reads;
4. file reads and provider-specific session work;
5. subscriptions, watches, and asynchronous tasks; and
6. interaction and save behavior.

Reload after each step. The first restored boundary that fails supplies a much
smaller reproduction than the original component.

## Fix dependencies and release styles

Run:

```bash
npm run check
npm run build
npm run release:verify
```

Inspect the release output rather than relying on a source development server.
Runtime dependencies used by the component must be included in `main.js`.
When the plugin emits CSS, install the optional `styles.css` beside the manifest
and module and include it in the release inventory. A plugin with no emitted CSS
does not need that file.

Phials already supplies `phoundry-ui/styles`, including its shared foundation,
component styles, and low-priority native reset. The starter has no `app.css` or
Tailwind setup by default. Do not add a second global style import merely to
repair a missing plugin rule. Check whether the missing appearance comes from
plugin-scoped CSS, a public component hook, or an optional styling tool you have
added. Utility classes only work if your own build generates them.

Inspect computed styles for the current public `--ph-*` hooks, such as
`--ph-text-primary`, `--ph-surface-3`, and `--ph-border-default`. Check the host’s
available component styles against the Phoundry UI APIs your bundle uses. Use
[Style and theme plugin interfaces](../../get-started/use-svelte-and-phoundry-ui/style-and-theme-plugin-interfaces.md)
for the public CSS contract.

The starter’s dependencies provide a starting compatibility set. Dependency
updates and local overrides are valid; there is no exact `phoundry-ui` dependency
string check. Duplicate or incompatible Svelte runtimes can cause mount-time
failures even when TypeScript succeeds, so inspect the resolved dependency graph
and test the built release in your supported Phials versions.

Neither the starter nor the host imposes a CSS policy, selector ban, or token
scanner. Local overrides, `:global(...)`, `:root`, `html`, and `body` rules are not
validation failures. If styling unexpectedly changes outside your surface,
inspect their scope, inheritance, specificity, and source order. Component-scoped
rules or a plugin wrapper often make those effects easier to control.

After rebuilding, use `npm run dev:install` and reload the plugin in
**Settings → Plugins**. Watch mode alone does not install or hot-reload it. The
expected result is a verified release that renders after a fresh install, using
host-supplied shared styles plus any CSS the plugin emits.

## Treat every render state as deliberate

Normalize component props before rendering. Restored state, file metadata, and
stored plugin values can outlive the version that wrote them. Give the
component explicit states for:

- loading;
- empty or unsupported input;
- permission or file-access failure;
- successful content; and
- recoverable save or synchronization failure.

Avoid starting asynchronous work during module evaluation or component render.
Start it from the component lifecycle or an event, cancel or ignore stale work
when the represented file or instance changes, and release watches,
subscriptions, observers, and timers when the component unmounts.

For panel and tab components, remember that a surface may unmount while its
logical instance persists. Keep durable serializable state in the supplied
instance state contract and keep live resources in plugin-owned services with
explicit cleanup.

## Test the container and interaction contract

A plugin surface owns its content, not the surrounding window. Verify:

- narrow and wide widths;
- short and tall heights;
- resizing while work is in progress;
- empty and long labels;
- light and dark theme tokens;
- 100%, increased, and reduced interface scale;
- keyboard-only operation;
- visible focus and logical tab order;
- accessible names for icon-only controls;
- focus placement when opening a dialog; and
- focus return after closing it.

Prefer layout primitives that respond to available size. Use destination
capabilities from public props when behavior genuinely differs; do not infer
placement from viewport dimensions or host DOM structure.

After the surface renders, repeat the original interaction and choose
**Try again** once to verify that a transient error can recover. The fix is
complete when the surface survives reload, resize, remount, and the full
keyboard task without hiding the original failure behind an empty branch.

## Inspect Thumbnail fallback

A Thumbnail failure does not change Preview or Editor selection. Confirm that the Plugin contributes a dedicated [ThumbnailProvider](../../reference/sdk-type-reference/ThumbnailProvider.md), its optional manifest catalog matches, and the executing Host meets its declared platform/capability requirements. Use tracked content reads, captured generation/Settings/variants, static supported output and explicit resource cleanup. A transient read/parser failure should throw; successful deterministic absence may return `{ status: "no-image" }`.

Use Phials' existing debug diagnostics to distinguish memory or disk hits, misses, shared work, invalidation, rejected publication and persistence failure. A valid image can display from bounded Client memory after a failed disk write. Provenance describes captured inputs and identities, without File contents, encoded pixels or Settings values. Check clear, source edits and Plugin retirement on the original Host rather than retrying through a different Host.
