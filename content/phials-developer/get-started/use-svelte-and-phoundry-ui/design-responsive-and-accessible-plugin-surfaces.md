---
title: "Design responsive and accessible plugin surfaces"
description: "Covers container-responsive layouts, keyboard and focus behavior, accessible labels, and behavior across supported panel and center placements."
ai_disclosure: true
order: 4
---

# Design responsive and accessible plugin surfaces

Design for the space Phials gives the component, not for the application window. A plugin surface may be narrow in a side panel, short in a bottom panel, or wide in a center tab. The user can resize those spaces while the component remains mounted.

Responsive behavior and accessibility are part of the same contract: content must reflow without disappearing, controls must remain reachable, and focus must follow the user’s action rather than the shape of the layout.

## Respond to the component container

Use a size container on the component root and container queries for layout changes:

```svelte
<section class="record-surface" aria-labelledby="record-title">
	<header>
		<div>
			<h2 id="record-title">Record details</h2>
			<p>Review the file before saving.</p>
		</div>
		<div class="actions">
			<button type="button">Cancel</button>
			<button type="button">Save</button>
		</div>
	</header>

	<div class="content">
		<nav aria-label="Record sections">…</nav>
		<main>…</main>
	</div>
</section>

<style>
	.record-surface {
		container-type: inline-size;
		box-sizing: border-box;
		min-width: 0;
		height: 100%;
		overflow: auto;
		padding: 0.75rem;
	}

	header,
	.actions {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	header {
		align-items: start;
		justify-content: space-between;
	}

	.content {
		display: grid;
		gap: 1rem;
		margin-top: 1rem;
	}

	@container (max-width: 30rem) {
		header {
			display: grid;
		}

		.actions {
			display: grid;
			grid-template-columns: 1fr 1fr;
		}
	}

	@container (min-width: 44rem) {
		.content {
			grid-template-columns: minmax(10rem, 14rem) minmax(0, 1fr);
		}
	}
</style>
```

Container queries continue to work when Phials moves the same component between placements. Viewport media queries only describe the window and can leave a side panel using a layout intended for a wide center tab.

Use `min-width: 0` on grid and flex children that may shrink. Allow long paths and filenames to wrap or truncate with an accessible full value. Put scrolling on the region that owns overflow, and avoid nested scroll areas unless each area has a distinct purpose.

## Design for supported placements

Start with the narrowest supported placement and add enhancement as space grows:

- In a left or right panel, use one primary column, compact controls, and progressive disclosure.
- In a bottom panel, account for limited height as well as width.
- In a center tab, use the added width for related columns or supporting detail, not merely larger empty space.
- In an embedded file surface, keep the experience inspection-only and avoid actions that change the underlying file.

If a capability is not usable in one placement, omit that placement from its provider’s supported positions or destinations. Do not render a broken compact version and expect the user to discover the limitation.

## Preserve native keyboard behavior

Use native elements for their intended jobs:

- `<button>` for an action
- `<a>` for navigation
- `<input>`, `<select>`, and `<textarea>` for data entry
- headings and landmarks to describe structure
- lists, tables, and definition lists when the content has those relationships

Do not make a `<div>` clickable when a button supplies activation, disabled state, focus, and keyboard behavior. Phoundry UI controls preserve these semantics while matching Phials styling.

Keep the tab order aligned with the visual and reading order. Do not use positive `tabindex` values to repair an inconvenient DOM order. Arrow-key interactions such as tabs, menus, and listboxes need a complete keyboard pattern; use the corresponding Phoundry UI component instead of recreating only the pointer behavior.

Register app-level shortcuts through the capability’s public shortcut or command contract. A component-level `keydown` handler should respond only while the relevant control or surface has focus, and it should not intercept text editing or assistive-technology commands.

## Move focus only in response to intent

Most plugin surfaces should leave focus where Phials placed it. Move focus when the user has requested a new interaction, such as opening an editor, adding a row, or confirming a dialog.

A file surface can receive the one-shot `focusEditor` request in [PreviewSurfaceProps](../../reference/sdk-type-reference/PreviewSurfaceProps.md). Consume it after focusing the editor:

```svelte
<script lang="ts">
	let {
		file,
		focusEditor = false,
		onConsumeFocusEditor,
	}: PreviewSurfaceProps = $props();

	function focusRequestedEditor(element: HTMLTextAreaElement) {
		queueMicrotask(() => {
			element.focus();
			onConsumeFocusEditor?.();
		});
	}
</script>

<label for="file-content">Contents of {file.name}</label>
<textarea
	id="file-content"
	aria-label="Contents of {file.name}"
	{@attach focusEditor ? focusRequestedEditor : undefined}
></textarea>
```

Treat the request as an event, not as a description of the host placement. Do not repeatedly focus on every update. When removing the focused element, move focus to the nearest meaningful control or to the control that opened the transient interface.

Use the Plugin API for host-level dialogs. Phials then owns initial focus, focus trapping, Escape behavior, and restoration to the invoking control.

## Supply names, relationships, and status

Every interactive control needs an accessible name. Prefer visible labels; use `aria-label` for an icon-only control when a visible label would be redundant.

Connect supporting text and errors to their field. Phoundry UI’s `FormField` provides a consistent visible label and message area; use stable `id` and `aria-describedby` values when composing it with an input.

Communicate changing status without relying only on color:

```svelte
<p role="status" aria-live="polite">
	{#if saving}
		Saving {file.name}…
	{:else if saved}
		Saved {file.name}
	{/if}
</p>
```

Use `role="alert"` only when the message requires immediate attention. Keep routine progress polite so it does not interrupt other work. Pair error color with concise text and a recovery action.

Give images meaningful alternative text when their content matters and empty alternative text when they are decorative. For file thumbnails, the surrounding file item usually owns the accessible filename, so repeating it on decorative artwork creates noise.

## Respect user and platform settings

Use semantic theme tokens so contrast follows the active theme. Preserve visible focus indicators. Avoid motion as the only explanation of a state change, and honor `prefers-reduced-motion`. Do not require precise pointer movement for essential actions.

Text may grow because of user settings, localization, or a long filename. Let controls wrap where possible and test at increased zoom. A layout that works only when labels remain one line is not container-responsive.

## Test the complete interaction

Verify each supported placement with:

1. A narrow and wide container.
2. Keyboard-only navigation in both directions.
3. Focus entry, transient interfaces, destructive confirmation, and focus return.
4. A screen reader’s control names, headings, landmarks, field errors, and status announcements.
5. Light and dark themes, increased text size, high zoom, and reduced motion.
6. Empty, loading, error, long-content, and disabled states.

Continue with [Test plugin logic and interfaces](../../test-and-troubleshoot/test-and-validate-your-plugin/test-plugin-logic-and-interfaces.md) to make these states repeatable before publishing.
