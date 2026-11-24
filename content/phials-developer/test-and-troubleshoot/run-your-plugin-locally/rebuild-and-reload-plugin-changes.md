---
title: "Rebuild and reload plugin changes"
description: "Uses the starter’s watch build or explicit build, updates release artifacts, invokes the defined plugin reload lifecycle, and verifies the intended visible result."
ai_disclosure: true
order: 2
---

# Rebuild and reload plugin changes

A source edit, a build, an install, and a reload are separate events. Phials keeps the currently activated module until you install a validated release and choose **Reload**.

## Use the explicit loop

After editing source, dependencies, the manifest, or styles:

```bash
npm run dev:install
```

The installer builds first and uses your normal Phials home, or `PHIALS_HOME` when set. To install elsewhere, add `-- --phials-home /absolute/path/to/phials-plugin-dev` and run Phials with that same home.

Then open **Settings → Plugins → Installed & Community → Installed** and choose **Reload** on the plugin. Run `npm run check` and `npm test` as well when checking types or behavior covered by automated tests.

## Use watch mode while editing

Keep the starter's watch build running in one terminal:

```bash
npm run dev
```

The watcher rebuilds `dist/main.js`, optional `dist/styles.css`, the generated manifest, and the release inventory after source changes. It provides build feedback while you edit.

When you are ready to try a change, run this in another terminal:

```bash
npm run dev:install
```

Then choose **Reload** in Phials. The installer performs its own fresh build even if watch mode is running. Watch mode is optional: it does not install files, eliminate that build, or hot-reload a running plugin.

The everyday loop is:

```text
edit → dev:install → Reload in Phials → try the change
```

If a build fails, fix the source before reinstalling. A failed build does not replace the installed plugin.

## Understand true reload

Reload is a plugin lifecycle transition:

1. The old module's `onBeforeReload` can return transient handoff state.
2. Phials calls `onDeactivate` and removes the old capabilities, listeners, watches, styles, and runtime registrations.
3. Phials imports the newly installed `main.js`.
4. It validates identity, creates the scoped Plugin API, registers the new definition, and runs `onActivate`.
5. The new module's `onAfterReload` receives the old handoff state.

This is not a page refresh and not a second activation layered over the first. Old command labels, components, subscriptions, and CSS should disappear.

If the new release cannot load or activate, Phials reports the failing stage and restores the last activated development release. Fix the build, reinstall, and reload again.

## Preserve only transient reload state

Use reload handoff for small in-memory development state that should survive one replacement, not for durable data:

```ts
interface ReviewReloadState {
  selectedReviewId: string | null;
}

function isReviewReloadState(
  value: unknown,
): value is ReviewReloadState {
  if (typeof value !== "object" || value === null) return false;
  const selectedReviewId = (
    value as { selectedReviewId?: unknown }
  ).selectedReviewId;

  return (
    selectedReviewId === null ||
    typeof selectedReviewId === "string"
  );
}

export default function createPlugin(): PhialsPlugin {
  let api: PluginAPI | null = null;
  let selectedReviewId: string | null = null;

  return {
    id: "acme.review-tools",
    name: "Review tools",
    version: "1.0.0",

    onActivate(pluginApi) {
      api = pluginApi;
    },

    onBeforeReload(): ReviewReloadState {
      return { selectedReviewId };
    },

    onDeactivate() {
      api = null;
    },

    onAfterReload(state) {
      if (isReviewReloadState(state)) {
        selectedReviewId = state.selectedReviewId;
      }
    },

    providers: [],
  };
}
```

Return plain, version-tolerant data. The new code receives `unknown` because its expected shape may differ from the old build.

Do not put these in reload handoff:

- credentials or secrets
- database handles
- components or DOM elements
- event subscriptions or watch handles
- data that must survive disable or app restart

Store durable user configuration in settings and durable plugin-owned data in storage or the plugin database.

## Verify both change and cleanup

After reload:

1. Confirm the new visible behavior.
2. Confirm the old behavior is absent.
3. Trigger the capability twice to detect duplicate handlers.
4. Check that one command, menu row, or provider appears once.
5. Confirm styles were replaced rather than accumulated.
6. Confirm transient handoff state was restored only when intended.

For a renamed command, search for the new label and verify the old label no longer appears. For an event handler, emit the triggering event once and verify one reaction.

## Know when reload is insufficient

Use a full app restart after changes to:

- startup compatibility or manifest identity
- first-run permission review
- persisted enablement or safe mode
- session restoration
- state or database migrations
- behavior that depends on Phials initialization order

Use disable and re-enable when you specifically need a fresh activation without reload handoff.

Next, [test activation, restart, and persisted state](test-activation-restart-and-persisted-state.md).

## Troubleshoot

- [Fix a plugin that will not load or activate](../debug-plugin-failures/fix-a-plugin-that-will-not-load-or-activate.md)
- [Fix plugin interface and rendering failures](../debug-plugin-failures/fix-plugin-interface-and-rendering-failures.md)
