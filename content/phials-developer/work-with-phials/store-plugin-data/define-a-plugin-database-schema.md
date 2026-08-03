---
title: "Define a plugin database schema"
description: "Declares plugin-owned tables, columns, indexes, constraints, and defaults through the public schema contract."
ai_disclosure: true
order: 3
---

# Define a plugin database schema

Declare `PhialsPlugin.database` when a plugin owns structured records that need filtering, ordering, indexes, or relationships. Phials prepares declared tables and indexes before `onActivate`.

## Declare tables and indexes

This task database has lists and ordered tasks:

```typescript
export const taskDatabase: PluginDatabaseSchema = {
	version: 1,
	tables: [
		{
			name: "lists",
			columns: [
				{
					name: "id",
					type: "INTEGER",
					primaryKey: true,
					autoIncrement: true,
				},
				{ name: "name", type: "TEXT", notNull: true, unique: true },
				{
					name: "sort_order",
					type: "INTEGER",
					notNull: true,
					default: 0,
				},
				{ name: "created_at", type: "TEXT", notNull: true },
			],
			indexes: [
				{ name: "by_sort_order", columns: ["sort_order"] },
			],
		},
		{
			name: "tasks",
			columns: [
				{
					name: "id",
					type: "INTEGER",
					primaryKey: true,
					autoIncrement: true,
				},
				{ name: "list_id", type: "INTEGER", notNull: true },
				{ name: "title", type: "TEXT", notNull: true },
				{
					name: "completed",
					type: "INTEGER",
					notNull: true,
					default: 0,
				},
				{ name: "due_date", type: "TEXT" },
				{
					name: "sort_order",
					type: "INTEGER",
					notNull: true,
					default: 0,
				},
				{ name: "created_at", type: "TEXT", notNull: true },
			],
			indexes: [
				{
					name: "by_list_and_sort",
					columns: ["list_id", "sort_order"],
				},
				{ name: "by_due_date", columns: ["due_date"] },
			],
		},
	],
};

export default function createPlugin(): PhialsPlugin {
	return {
		id: "example.tasks",
		name: "Tasks",
		version: "1.0.0",
		database: taskDatabase,
		providers: [],
	};
}
```

The schema uses logical table names such as `lists` and `tasks`. Phials owns physical namespacing. Plugin code always uses the logical names declared here.

## Define columns

Every column has a stable `name` and one SQLite storage type:

| Type | Use it for |
| --- | --- |
| `TEXT` | strings, identifiers, JSON text, ISO dates and timestamps |
| `INTEGER` | whole numbers and boolean values stored as `0` or `1` |
| `REAL` | floating-point numbers |
| `BLOB` | binary data |

Column options express supported constraints:

- `primaryKey` identifies the table’s primary key.
- `autoIncrement` is valid only on an `INTEGER` primary key.
- `notNull` rejects `NULL`.
- `unique` rejects duplicate non-null values.
- `default` supplies a static value when an insert omits the column.

Use a default only when the same literal is correct for every new row. Supply dynamic values such as the current time in the insert:

```typescript
await api.database.insert("lists", {
	name: "Inbox",
	sort_order: 0,
	created_at: new Date().toISOString(),
});
```

Keep defaults compatible with the column type. Do not use an object, array, function, or SQL expression as a schema default.

## Add indexes for real query paths

Create an index for columns used regularly in filters, joins, or ordering. Put columns in the order queries use them:

```typescript
const listOrderIndex: PluginIndexDefinition = {
	name: "by_list_and_sort",
	columns: ["list_id", "sort_order"],
};
```

Set `unique: true` for a multi-column uniqueness rule:

```typescript
const externalItemIndex: PluginIndexDefinition = {
	name: "unique_external_item",
	columns: ["source_id", "external_id"],
	unique: true,
};
```

Every indexed column must exist in the same table. Keep index names stable, descriptive, and unique within that table. Avoid indexing every column; indexes add storage and write work.

## Use stable identifiers

Use lowercase snake_case for table, column, and index names. Treat identifiers as durable data contracts:

- do not reuse a removed name for a different meaning
- do not derive identifiers from user input
- do not include the plugin ID in a logical table name
- do not depend on or query physical table names

Adding a table or index is additive. Renames, type changes, column changes, and data conversions require an explicit forward migration. Keep migrations idempotent and versioned as described in [Migrate plugin settings and data](../../package-and-publish/maintain-a-published-plugin/migrate-plugin-settings-and-data.md).

Schema validation rejects invalid identifiers, duplicate tables or columns, incompatible defaults and constraints, indexes over unknown columns, and invalid auto-increment combinations before activation.

If schema preparation fails, the plugin does not activate with a partially available database. The activation error identifies the affected table, column, or index.
