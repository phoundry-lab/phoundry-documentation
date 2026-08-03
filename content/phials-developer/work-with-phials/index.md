---
title: "Work with Phials"
description: "Use the Plugin API to work with files, context, data, events, dialogs, and notifications."
ai_disclosure: true
---

# Work with Phials

The Plugin API gives activated plugins a typed, permission-aware way to work with Phials and the user’s files. Prefer these supported services over host internals or platform-specific assumptions.

- [Work with files and folders](./work-with-files-and-folders/index.md) covers paths, directory choices, text-file revisions, mutations, watches, opening, and revealing.
- [Use app and Explorer context](./use-app-and-explorer-context/index.md) explains runtime API scopes, pane context, read-only app settings, and approved host commands.
- [Store plugin data](./store-plugin-data/index.md) helps you choose among settings, key-value storage, and a plugin-owned database.
- [Respond to events](./respond-to-events/index.md) covers supported Phials events, plugin-owned events, subscriptions, and asynchronous handlers.
- [Show dialogs and notifications](./show-dialogs-and-notifications/index.md) covers confirmations, prompts, choices, alerts, and non-blocking feedback.

Each permission-gated operation links to the exact requirement in the [manifest and permissions reference](../reference/manifest-and-permissions-reference/index.md).
