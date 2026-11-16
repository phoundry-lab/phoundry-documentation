---
title: "PluginAPI"
description: "TypeScript signature and members for the PluginAPI public SDK declaration."
ai_disclosure: true
order: 72
aliases:
  - references/PluginAPI
---

# PluginAPI

**Since Plugin API:** `1.0.0`

Base Plugin API - available to all providers

## Signature

```typescript
interface PluginAPI {
    openSettings(): Promise<void>;
    settings: PluginSettings;
    storage: PluginStorageAPI;
    secrets: PluginSecretsAPI;
    database: PluginDatabaseAPI;
    appSettings: ReadonlyAppSettings;
    invoke<T>(command: string, args?: Record<string, unknown>): Promise<T>;
    fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
    clipboard: ClipboardAPI;
    modal: ModalAPI;
    notify: NotifyAPI;
    files: FileUtilsAPI;
    explorer: ExplorerAPI;
    git: GitAPI;
    workspaceFolders: WorkspaceFoldersAPI;
    modules: ModulesAPI;
    events: EventsAPI;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `openSettings` | `() => Promise<void>` | yes | Open Settings in the current main window directly to this plugin's settings page. |
| `settings` | [`PluginSettings`](PluginSettings.md) | yes | Plugin's own settings |
| `storage` | [`PluginStorageAPI`](PluginStorageAPI.md) | yes | Key/value data storage (separate from settings) |
| `secrets` | [`PluginSecretsAPI`](PluginSecretsAPI.md) | yes | Encrypted Plugin-scoped secrets. Available since Plugin API 1.1.0. |
| `database` | [`PluginDatabaseAPI`](PluginDatabaseAPI.md) | yes | SQL database for plugin-owned tables |
| `appSettings` | [`ReadonlyAppSettings`](ReadonlyAppSettings.md) | yes | Read-only access to app settings |
| `invoke` | `(command: string, args?: Record<string, unknown>) => Promise<T>` | yes | Invoke Tauri commands (permission-gated allowlist for community plugins) |
| `fetch` | `(input: RequestInfo &#124; URL, init?: RequestInit) => Promise<Response>` | yes | Phials-backed streaming HTTP, gated by network.fetch for community Plugins. |
| `clipboard` | [`ClipboardAPI`](ClipboardAPI.md) | yes | Permission-gated text clipboard on the current Client. |
| `modal` | [`ModalAPI`](ModalAPI.md) | yes | Modal dialogs |
| `notify` | [`NotifyAPI`](NotifyAPI.md) | yes | Notifications/toasts |
| `files` | [`FileUtilsAPI`](FileUtilsAPI.md) | yes | File path utilities |
| `explorer` | [`ExplorerAPI`](ExplorerAPI.md) | yes | Explicit acquisition of stable Explorer pane facades. |
| `git` | [`GitAPI`](GitAPI.md) | yes | Fixed read-only repository inspection under filesystem.read. |
| `workspaceFolders` | [`WorkspaceFoldersAPI`](WorkspaceFoldersAPI.md) | yes | Permission-gated Workspace Folder data and Page operations. |
| `modules` | [`ModulesAPI`](ModulesAPI.md) | yes | Center-module routing |
| `events` | [`EventsAPI`](EventsAPI.md) | yes | Event pub/sub for cross-plugin communication |
