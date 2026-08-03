---
title: "Choose between settings, storage, and a database"
description: "Selects the smallest persistence contract that fits user configuration, key-value application state, or structured queryable data."
ai_disclosure: true
order: 1
---

# Choose between settings, storage, and a database

Choose the smallest persistence contract that expresses the data’s purpose. The number of values matters less than how users control them and how plugin code needs to access them.

| Need | Use |
| --- | --- |
| A user choice exposed in Phials Settings | `api.settings` |
| A small durable value fetched by a known key | `api.storage` |
| Structured records filtered, sorted, joined, or indexed | `api.database` |
| State needed only while one component is mounted | Svelte state |
| State carried only through plugin reload | `onBeforeReload` and `onAfterReload` |

## Use settings for user configuration

Settings have a declared schema, defaults, generated controls, and a standard reset action. Examples include:

- a default sort order
- whether completed items are visible
- a refresh interval
- a preferred export folder

If changing the value is a product preference the user should understand and control, use [Add plugin settings](../../add-capabilities/add-plugin-settings/index.md).

Do not use settings for caches, timestamps, synchronization cursors, task records, or large collections. Those values do not belong in a user-facing configuration schema.

## Use key-value storage for small durable state

Plugin storage works well when code normally reads or replaces a complete value by key:

- a last successful synchronization cursor
- a versioned recent-items document
- dismissed onboarding state
- a small derived cache

```typescript
await api.storage.set("sync-cursor", {
	version: 1,
	value: "2026-07-25T18:30:00.000Z",
});
```

Choose storage when you do not need to query individual members without loading the whole value. If several features update different parts of one growing document, the document is often becoming a database.

## Use a database for records and queries

A plugin database is appropriate for:

- tasks grouped into lists
- indexed file-analysis results
- records with status, dates, and ordering
- data filtered or sorted without loading every row
- multiple record types linked by stable IDs

The plugin declares its tables and indexes on `PhialsPlugin.database`. Phials prepares that schema before `onActivate`, and plugin code queries logical table names through `api.database`.

## Check the decision against future operations

Ask:

1. Should the user edit or reset this from Settings? Use settings.
2. Will code always fetch one known value or replace one small document? Use storage.
3. Will code filter, sort, paginate, aggregate, or update individual records? Use a database.
4. Is the value temporary and reconstructible? Keep it in runtime state.

Do not choose a database only because the data is durable, and do not choose one key-value document only because it is quick to start. Pick the contract that keeps common reads and writes simple while preserving one source of truth.

Settings, storage, and database data are durable local application data, not a credential vault. Do not put passwords, private keys, or long-lived access tokens in these contracts.
