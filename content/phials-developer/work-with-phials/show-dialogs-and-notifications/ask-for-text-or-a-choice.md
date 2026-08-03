---
title: "Ask for text or a choice"
description: "Uses prompts and typed choices, treats cancellation as an ordinary result, and validates input before work begins."
ai_disclosure: true
order: 2
---

# Ask for text or a choice

Use `api.modal.prompt()` for one short text value. Use `api.modal.choose()` when the user must select one of several named outcomes. Both APIs return `null` when the user cancels.

## Ask for short text

A prompt supplies a title, explanatory message, and optional placeholder or existing value:

```ts
async function askForListName(
  api: PluginAPI,
  currentName?: string,
): Promise<string | null> {
  const value = await api.modal.prompt({
    title: currentName ? "Rename list" : "New list",
    message: "Enter a short name for this list.",
    defaultValue: currentName,
    placeholder: "Research",
  });

  if (value === null) {
    return null;
  }

  const name = value.trim();
  return name.length > 0 ? name : null;
}
```

Use `defaultValue` when editing an existing value. Use `placeholder` as an example or format hint, not as a default the plugin silently accepts.

Use `confirmLabel` and `cancelLabel` when the action needs more specific wording. A prompt supports one inline validation message:

```ts
const name = await api.modal.prompt({
  title: "New list",
  message: "Enter a short name for this list.",
  confirmLabel: "Create",
  validate: (value) => {
    const trimmed = value.trim();
    if (!trimmed) return "Enter a list name.";
    if (trimmed.length > 80) return "Use 80 characters or fewer.";
    return null;
  },
});
```

Validation may be synchronous or asynchronous. The modal stays open and links
the returned message to the input until validation succeeds. Do not use a
prompt for multiline text, credentials, several related fields, path browsing,
or a workflow that needs multiple validation targets.

## Validate before starting work

The prompt returns text, not a validated domain value. Normalize and validate before writing files, settings, or data:

```ts
function validateListName(
  name: string,
  existingNames: readonly string[],
): string | null {
  if (name.length === 0) {
    return "Enter a list name.";
  }
  if (name.length > 80) {
    return "Use 80 characters or fewer.";
  }
  if (
    existingNames.some(
      (existing) =>
        existing.localeCompare(name, undefined, {
          sensitivity: "base",
        }) === 0,
    )
  ) {
    return "A list with this name already exists.";
  }
  return null;
}

async function createList(
  api: PluginAPI,
  existingNames: readonly string[],
): Promise<void> {
  const input = await api.modal.prompt({
    title: "New list",
    message: "Enter a short name for this list.",
    placeholder: "Research",
  });

  if (input === null) {
    return;
  }

  const name = input.trim();
  const validationError = validateListName(
    name,
    existingNames,
  );

  if (validationError) {
    await api.modal.alert({
      title: "List was not created",
      message: validationError,
    });
    return;
  }

  await api.database.insert("lists", { name });
  api.notify.success("List created");
}
```

Keep the user's input available as `defaultValue` if your workflow asks them to correct and retry. Validation failure is not cancellation, and cancellation is not an error.

## Offer typed choices

Give each choice a stable ID and constrain the result with a string union:

```ts
type ConflictChoice = "reload" | "overwrite";

async function resolveFileConflict(
  api: PluginAPI,
  path: string,
): Promise<ConflictChoice | null> {
  return api.modal.choose<ConflictChoice>({
    title: "File changed on disk",
    message:
      `${path} changed outside this plugin. ` +
      "Choose which version to keep.",
    choices: [
      {
        id: "reload",
        label: "Reload",
        description:
          "Discard local changes and load the file from disk.",
        variant: "secondary",
      },
      {
        id: "overwrite",
        label: "Overwrite",
        description:
          "Replace the file on disk with the local version.",
        variant: "danger",
      },
    ],
    cancelLabel: "Keep Editing",
  });
}
```

Choice arrays must be non-empty, IDs must be unique non-empty strings, and
labels must be non-empty. Phials validates the returned ID against the supplied
set before resolving the promise.

Handle every outcome explicitly:

```ts
const choice = await resolveFileConflict(api, file.path);

switch (choice) {
  case "reload":
    await reloadFromDisk(file);
    break;
  case "overwrite":
    await overwriteFile(file);
    break;
  case null:
    return;
}
```

Use:

- `primary` for the recommended constructive outcome
- `secondary` for neutral alternatives
- `danger` for destructive or difficult-to-reverse outcomes

The generic type protects your plugin code, while the stable choice IDs form the runtime result. Keep IDs unique and do not derive behavior from labels.

Use `confirm()` for one action versus cancellation. Use `choose()` when multiple non-cancel outcomes need distinct labels or descriptions. Do not simulate a form by chaining many choice and prompt dialogs.

Next, choose between a blocking [alert and a non-blocking notification](./show-alerts-and-notifications.md).
