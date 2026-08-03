---
title: "Confirm consequential actions"
description: "Uses confirmation dialogs immediately before destructive or difficult-to-reverse work, with accurate labels and danger treatment."
ai_disclosure: true
order: 1
---

# Confirm consequential actions

Use `api.modal.confirm()` immediately before destructive or difficult-to-reverse work. Perform eligibility checks first, explain the specific effect, and start the action only when the promise resolves to `true`.

```ts
async function deletePreset(
  api: PluginAPI,
  preset: { id: string; name: string },
): Promise<void> {
  const confirmed = await api.modal.confirm({
    title: "Delete preset?",
    message:
      `“${preset.name}” will be permanently deleted. ` +
      "This cannot be undone.",
    confirmLabel: "Delete Preset",
    cancelLabel: "Cancel",
    danger: true,
  });

  if (!confirmed) {
    return;
  }

  await api.database.deleteFrom(
    "presets",
    "id = ?",
    [preset.id],
  );
  api.notify.success("Preset deleted");
}
```

Escape and **Cancel** resolve to `false`. Cancellation is an ordinary outcome: return without an error notification or log entry.

## Put the decision at the action boundary

Check that the action is possible before asking:

```ts
async function deleteSelectedPreset(
  api: PluginAPI,
  selectedPreset: Preset | null,
): Promise<void> {
  if (!selectedPreset) {
    api.notify.info("Select a preset to delete");
    return;
  }

  if (selectedPreset.builtIn) {
    await api.modal.alert({
      title: "Preset cannot be deleted",
      message: "Built-in presets remain available to every project.",
    });
    return;
  }

  await deletePreset(api, selectedPreset);
}
```

Do not confirm before validation, loading, or another step that might prevent the action. A confirmation should mean that choosing its primary action starts the described work.

If relevant state can change while the dialog is open, revalidate after confirmation. Do not carry out a now-invalid action merely because it was valid when the dialog opened.

## Write labels that predict the result

The dialog needs:

- A short title naming the decision, usually as a question.
- A message stating what changes, which item is affected, and whether recovery is possible.
- A confirm label that names the action.
- A neutral cancel label.

Prefer **Delete Preset**, **Disconnect Account**, or **Overwrite File** over **OK**, **Continue**, or **Yes**. The label should still make sense when read without the message.

For several items, name the scope:

```ts
const confirmed = await api.modal.confirm({
  title: "Delete 4 presets?",
  message:
    "The selected presets will be permanently deleted. " +
    "This cannot be undone.",
  confirmLabel: "Delete 4 Presets",
  danger: true,
});
```

Do not place the only explanation of data loss in the dialog. If a workflow has lasting consequences, explain them before the final action as well.

## Use danger treatment deliberately

Set `danger: true` when the confirming action:

- permanently deletes or overwrites user data
- revokes access or disconnects a durable integration
- discards unresolved work
- is otherwise difficult to reverse

Danger treatment changes the primary action's visual emphasis. It does not make vague copy safe.

Leave `danger` unset for safe creation, ordinary navigation, refresh, and reversible preference changes. Avoid confirmation entirely when a direct action plus reliable undo is clearer.

## Do not use confirmation as error handling

Confirmation happens before work. If the operation later fails, preserve the relevant state and report the failure:

```ts
try {
  await removeRemoteProject(project.id);
  api.notify.success("Remote project removed");
} catch {
  api.notify.error(
    "Remote project could not be removed",
  );
}
```

Do not ask “Try anyway?” after an unexplained failure, and never reinterpret `false` as permission to choose a destructive fallback.

Use [`choose()`](./ask-for-text-or-a-choice.md) instead when the user must select among three or more meaningful outcomes, or when both non-cancel outcomes perform work.
