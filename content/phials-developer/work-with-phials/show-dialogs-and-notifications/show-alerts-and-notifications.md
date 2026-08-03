---
title: "Show alerts and notifications"
description: "Chooses a blocking alert or non-blocking informational, success, warning, or error notification according to the user’s next required action."
ai_disclosure: true
order: 3
---

# Show alerts and notifications

Use `api.modal.alert()` when the user must acknowledge information before the workflow can continue. Use `api.notify` for brief status that does not require a decision.

## Show an alert for required acknowledgement

An alert pauses the caller until the user dismisses it:

```ts
async function reportUnsavedFiles(
  api: PluginAPI,
  failedPaths: readonly string[],
): Promise<void> {
  if (failedPaths.length === 0) {
    return;
  }

  await api.modal.alert({
    title: "Some files were not saved",
    message:
      "Resolve these files before closing:\n\n" +
      failedPaths.join("\n"),
  });
}
```

Use an alert when:

- the requested workflow cannot continue
- the user needs to read a specific recovery instruction
- a partial result requires acknowledgement before the next step
- continuing without noticing the information could cause confusion or loss

An alert communicates one fact and has one acknowledgement action. It does not return a decision. Use `confirm()` or `choose()` when the user must select what happens next.

Avoid alerts for ordinary validation hints, routine success, background refreshes, or errors that need no immediate response. Blocking the workflow makes every alert costly.

## Show non-blocking notifications

[NotifyAPI](../../reference/sdk-type-reference/NotifyAPI.md) has four variants:

```ts
api.notify.info("Scanning project files");
api.notify.success("12 notes exported");
api.notify.warning("Two files were skipped");
api.notify.error("Notes could not be exported");
```

Choose the variant by meaning:

| Variant | Use |
| --- | --- |
| `info` | Neutral status or a useful fact that does not imply success or failure |
| `success` | Completed work whose result is not already obvious |
| `warning` | Work continued, but attention or later correction may be useful |
| `error` | The requested outcome failed and no immediate choice is required |

Notifications are non-blocking and temporary. Do not put essential instructions, long lists, or the only copy of an error report in one.

Each call returns `{ id, dismiss() }`. Supply an explicit `id` to replace an
existing notification instead of stacking duplicates. Options also support a
description, duration, dismissibility, and one action:

```ts
const progress = api.notify.info("Exporting notes", {
  id: "acme.notes.export",
  description: "Preparing the archive",
  duration: 0,
  dismissible: false,
});

api.notify.success("Notes exported", {
  id: progress.id,
  description: "Saved to the chosen folder",
  action: {
    label: "Reveal",
    onAction: () => revealExport(),
  },
});
```

`duration: 0` keeps the notification until replacement or dismissal.
`api.notify.dismiss(id)` and the handle's `dismiss()` are equivalent. Action
failures are isolated and reported without disrupting the toast overlay.

## Report an operation once

Wrap the user-requested operation and report its final outcome:

```ts
async function exportNotes(
  api: PluginAPI,
  notes: readonly Note[],
): Promise<void> {
  try {
    const result = await writeNoteExport(notes);

    if (result.skipped > 0) {
      api.notify.warning(
        `${result.written} notes exported; ` +
        `${result.skipped} skipped`,
      );
      return;
    }

    api.notify.success(
      `${result.written} notes exported`,
    );
  } catch {
    api.notify.error("Notes could not be exported");
  }
}
```

Do not show “Exporting,” “Export complete,” and several per-file messages for one short operation. Use persistent in-surface progress for long work and one final notification when a summary is useful.

If an operation visibly creates, removes, or changes the object in front of the user, that visible result may be enough. Reserve success notifications for work that happens elsewhere, finishes asynchronously, or needs a count or destination.

## Make messages useful and safe

A good notification:

- starts with the outcome
- names the affected object or count when useful
- fits in one short sentence
- avoids punctuation that implies alarm without adding meaning
- does not expose raw errors, credentials, tokens, or file contents

Prefer:

```ts
api.notify.error("Project settings could not be saved");
```

Avoid:

```ts
api.notify.error(String(error));
```

Log diagnostic detail through your plugin's supported debugging path when needed. The user-facing message should explain what failed and, when concise, what they can safely do next.

## Do not use notifications as decisions

Never start destructive work and then show a warning notification. Ask for confirmation first.

Never show an error notification that says “Choose Overwrite or Reload” when no controls are available. Use `choose()` so the result is explicit and typed.

Never treat notification delivery as proof the user saw essential information. Use an alert for required acknowledgement and durable in-surface state for conditions that remain unresolved.

Return to [Show dialogs and notifications](./index.md) for the interaction map.
