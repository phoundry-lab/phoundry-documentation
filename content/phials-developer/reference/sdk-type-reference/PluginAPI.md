---
title: "PluginAPI"
description: "TypeScript signature and members for the PluginAPI public SDK declaration."
ai_disclosure: true
order: 67
aliases:
  - references/PluginAPI
---

# PluginAPI

**Since Plugin API:** `1.0.0`

Base Plugin API - available to all providers

## Signature

```typescript
interface PluginAPI {
    settings: PluginSettings;
    storage: PluginStorageAPI;
    database: PluginDatabaseAPI;
    appSettings: ReadonlyAppSettings;
    invoke<T>(command: string, args?: Record<string, unknown>): Promise<T>;
    modal: ModalAPI;
    notify: NotifyAPI;
    files: FileUtilsAPI;
    explorer: ExplorerAPI;
    git: GitAPI;
    workspaceFolders: WorkspaceFoldersAPI;
    clipboard: ClipboardAPI;
    fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
    modules: ModulesAPI;
    events: EventsAPI;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `settings` | [`PluginSettings`](PluginSettings.md) | yes | Plugin's own settings |
| `storage` | [`PluginStorageAPI`](PluginStorageAPI.md) | yes | Key/value data storage (separate from settings) |
| `database` | [`PluginDatabaseAPI`](PluginDatabaseAPI.md) | yes | SQL database for plugin-owned tables |
| `appSettings` | [`ReadonlyAppSettings`](ReadonlyAppSettings.md) | yes | Read-only access to app settings |
| `invoke` | `(command: string, args?: Record<string, unknown>) => Promise<T>` | yes | Invoke Tauri commands (permission-gated allowlist for community plugins) |
| `modal` | [`ModalAPI`](ModalAPI.md) | yes | Modal dialogs |
| `notify` | [`NotifyAPI`](NotifyAPI.md) | yes | Notifications/toasts |
| `files` | [`FileUtilsAPI`](FileUtilsAPI.md) | yes | File path utilities |
| `explorer` | [`ExplorerAPI`](ExplorerAPI.md) | yes | Explicit acquisition of stable Explorer pane facades. |
| `git` | [`GitAPI`](GitAPI.md) | yes | Fixed read-only repository inspection under filesystem.read. |
| `workspaceFolders` | [`WorkspaceFoldersAPI`](WorkspaceFoldersAPI.md) | yes | Permission-gated Workspace Folder data and Page operations. |
| `clipboard` | [`ClipboardAPI`](ClipboardAPI.md) | yes | Permission-gated text clipboard. |
| `fetch` | `(input: RequestInfo &#124; URL, init?: RequestInit) => Promise<Response>` | yes | Permission-gated network fetch. |
| `modules` | [`ModulesAPI`](ModulesAPI.md) | yes | Center-module routing. |
| `events` | [`EventsAPI`](EventsAPI.md) | yes | Event pub/sub for cross-plugin communication |
