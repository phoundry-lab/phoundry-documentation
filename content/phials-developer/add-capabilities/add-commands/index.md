---
title: "Add commands"
description: "Define commands, control their availability, and place them in supported Phials surfaces."
ai_disclosure: true
aliases:
  - types/command
---

# Add commands

A command is one stable action that Phials can expose wherever that action is useful. Define the action once, then let its context, presentation, shortcut, and placements adapt it to the Command Bar, Path Bar, and file context menus.

Commands belong to a [CommandProvider](../../reference/sdk-type-reference/CommandProvider.md), and one plugin can register any number of providers and commands.

- [Define and register a command](./define-and-register-a-command.md) builds the smallest working command and verifies it through the Command Bar.
- [Use command context and availability](./use-command-context-and-availability.md) makes an action appear and run only for the context it can handle.
- [Make commands discoverable and add shortcuts](./make-commands-discoverable-and-add-shortcuts.md) gives commands useful search metadata, context-sensitive presentation, and user-editable defaults.
- [Place commands in the Path Bar and context menus](./place-commands-in-the-path-bar-and-context-menus.md) adds convenient default placements without taking control away from the user.
- [Build nested and custom command controls](./build-nested-and-custom-command-controls.md) covers child commands, grouped menus, sub-toolbars, and the narrow cases that need custom rendering.

Use `api.modal` and `api.notify` for reusable confirmation and feedback patterns. See [Show dialogs and notifications](../../work-with-phials/show-dialogs-and-notifications/index.md).
