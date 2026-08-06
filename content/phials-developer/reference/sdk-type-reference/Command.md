---
title: "Command"
description: "TypeScript signature and members for the Command public SDK declaration."
ai_disclosure: true
order: 4
aliases:
  - references/Command
---

# Command

**Since Plugin API:** `1.0.0`

## Signature

```typescript
interface Command {
    id: string;
    label: string;
    description?: string;
    tooltip?: string;
    icon?: string;
    contextKeys?: CommandContextKey[];
    when?: (ctx: CommandContext) => boolean;
    disabled?: (ctx: CommandContext) => boolean;
    presentation?: (ctx: CommandContext) => CommandPresentation;
    action: (ctx: CommandContext) => void | Promise<void>;
    toastData?: import("phoundry-ui").ToastEntry | ((ctx: CommandContext) => import("phoundry-ui").ToastEntry | null | undefined);
    shortcut?: CommandShortcut;
    defaultPlacements?: CommandPlacement[];
    category?: string;
    searchAliases?: string[];
    menuGroup?: string;
    children?: Command[];
    submenuItems?: (ctx: CommandContext) => import("phoundry-ui").MenuItem[];
    renderSnippet?: (ctx: CommandContext) => import("svelte").Snippet;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | yes | Unique command identifier (e.g., 'core.file.delete', 'plugin.terminal.toggle') |
| `label` | `string` | yes | Human-readable label |
| `description` | `string` | no | Optional description for command bar/settings |
| `tooltip` | `string` | no | Tooltip text shown on hover (defaults to label if not set) |
| `icon` | `string` | no | Icon for UI display |
| `contextKeys` | [`CommandContextKey`](CommandContextKey.md)`[]` | no | Context keys required for this command to be visible. Used for fast pre-filtering before evaluating `when()`. If omitted or contains 'always', command is always considered. |
| `when` | `(ctx: `[`CommandContext`](CommandContext.md)`) => boolean` | no | Fine-grained visibility check. Only called if contextKeys pass (or are not specified). Return false to hide the command. |
| `disabled` | `(ctx: `[`CommandContext`](CommandContext.md)`) => boolean` | no | Whether the command is disabled (visible but not executable). Return true to disable. |
| `presentation` | `(ctx: `[`CommandContext`](CommandContext.md)`) => CommandPresentation` | no | Dynamic display metadata for runtime surfaces; never changes availability. |
| `action` | `(ctx: `[`CommandContext`](CommandContext.md)`) => void &#124; Promise<void>` | yes | The action to execute |
| `toastData` | `import("phoundry-ui").ToastEntry &#124; (ctx: `[`CommandContext`](CommandContext.md)`) => import("phoundry-ui").ToastEntry &#124; null &#124; undefined` | no | Optional toast shown after the action completes successfully (no throw). Static entry or a function of the same context passed to `action`. |
| `shortcut` | [`CommandShortcut`](CommandShortcut.md) | no | Keyboard shortcut configuration |
| `defaultPlacements` | [`CommandPlacement`](CommandPlacement.md)`[]` | no | Where this command appears by default. Users can override these in settings. |
| `category` | `string` | no | Category for grouping in command bar. E.g., 'File', 'Edit', 'View', 'Navigation', 'Tabs' |
| `searchAliases` | `string[]` | no | Alternative search terms for command bar fuzzy search |
| `menuGroup` | `string` | no | Optional group for path bar dropdown separators between sibling child commands |
| `children` | `Command[]` | no | Child commands for dropdown/submenu patterns. When a command has children, its action typically does nothing and the UI shows a dropdown menu of child commands instead. |
| `submenuItems` | `(ctx: `[`CommandContext`](CommandContext.md)`) => import("phoundry-ui").MenuItem[]` | no | Optional custom items for menu surfaces that present this command as a submenu. Semantic children remain available to the Command Bar. |
| `renderSnippet` | `(ctx: `[`CommandContext`](CommandContext.md)`) => import("svelte").Snippet` | no | Custom render snippet for context menu. When provided, the command renders as a custom menu item instead of a standard action item. Useful for inline controls like ratings. |
