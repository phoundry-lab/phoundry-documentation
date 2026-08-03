---
title: "Show dialogs and notifications"
description: "Confirm actions, ask for input, and communicate results with supported dialogs and notifications."
ai_disclosure: true
---

# Show dialogs and notifications

Use `api.modal` when Phials must pause for a decision, text input, a choice, or acknowledgement. Use `api.notify` when work can continue and a short status message is enough.

Choose the interaction by the user's next required action:

| User need | API |
| --- | --- |
| Approve or cancel one consequential action | `api.modal.confirm()` |
| Enter a short text value | `api.modal.prompt()` |
| Choose one of several explicit outcomes | `api.modal.choose()` |
| Read required information before continuing | `api.modal.alert()` |
| Notice brief non-blocking status | `api.notify.info()`, `success()`, `warning()`, or `error()` |

This hub covers the reusable interaction contracts:

1. [Confirm consequential actions](./confirm-consequential-actions.md) immediately before destructive or difficult-to-reverse work.
2. [Ask for text or a choice](./ask-for-text-or-a-choice.md), validate the result, and treat cancellation as normal.
3. [Show alerts and notifications](./show-alerts-and-notifications.md) according to whether acknowledgement is required.

## Keep feedback proportional

Do not show a dialog merely because an action exists. Frequent, safe, immediately reversible actions should usually happen directly. Place a decision-point warning immediately before a genuinely consequential action and make its effect clear before the user chooses.

Do not show a success notification when the completed result is already unmistakable. Repeated activation, refresh, selection, and navigation messages create noise and can hide feedback that matters.

Dialogs and notifications are not logging systems. Keep user-facing text concise, specific to the outcome, and free of raw errors, credentials, file contents, or implementation details.

[ModalAPI](../../reference/sdk-type-reference/ModalAPI.md) and [NotifyAPI](../../reference/sdk-type-reference/NotifyAPI.md) are available on the permission-gated [PluginAPI](../../reference/sdk-type-reference/PluginAPI.md); they require no manifest permission. For exact signatures, see [ModalAPI](../../reference/sdk-type-reference/ModalAPI.md) and [`NotifyAPI`](../../reference/sdk-type-reference/NotifyAPI.md).
