---
title: "Store plugin data"
description: "Choose and use settings, key-value storage, or a plugin-owned database."
ai_disclosure: true
---

# Store plugin data

Choose the persistence contract that matches what the data means:

- **Plugin settings** store user-configurable behavior that belongs in Settings and has declared defaults and reset behavior.
- **Plugin storage** stores small plugin-owned values by key.
- **Plugin database** stores structured records that need indexes, filtering, sorting, or relationships.

All three contracts are scoped to the plugin’s stable ID. A plugin does not choose host filenames, database filenames, or physical SQL table names.

## Choose and implement a store

1. [Choose between settings, storage, and a database](choose-between-settings-storage-and-a-database.md) before designing the data shape.
2. [Store key-value plugin data](store-key-value-plugin-data.md) for small durable documents, cursors, and caches.
3. [Define a plugin database schema](define-a-plugin-database-schema.md) for queryable records and indexes.
4. [Query and update plugin database tables](query-and-update-plugin-database-tables.md) with typed rows, logical table names, helpers, and parameterized SQL.
5. [Handle plugin data lifecycle and removal](handle-plugin-data-lifecycle-and-removal.md) across activation, reload, updates, and uninstall.

For user-facing configuration, start with [Add plugin settings](../../add-capabilities/add-plugin-settings/index.md). Do not mirror the same value into settings, storage, and a table; choose one source of truth and derive runtime state from it.

## Public data contracts

The generated reference provides exact signatures for:

- [PluginStorageAPI](../../reference/sdk-type-reference/PluginStorageAPI.md)
- [PluginDatabaseSchema](../../reference/sdk-type-reference/PluginDatabaseSchema.md)
- [PluginDatabaseAPI](../../reference/sdk-type-reference/PluginDatabaseAPI.md)
- [PluginSettings](../../reference/sdk-type-reference/PluginSettings.md)

The data APIs are available through the plugin-scoped [PluginAPI](../../reference/sdk-type-reference/PluginAPI.md) passed to `onActivate`.
