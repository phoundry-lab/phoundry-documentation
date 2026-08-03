---
title: "Query and update plugin database tables"
description: "Uses logical table names, parameterized queries, typed results, and the provided insert, update, delete, and select helpers."
ai_disclosure: true
order: 4
---

# Query and update plugin database tables

Use `api.database` after declaring `PhialsPlugin.database`. The API accepts the logical table names and column names from the plugin schema; Phials applies plugin namespacing.

Plugin database access does not require a plugin permission.

## Define row types

Keep runtime row types beside the feature that owns them:

```typescript
interface TaskRow {
	id: number;
	list_id: number;
	title: string;
	completed: 0 | 1;
	due_date: string | null;
	sort_order: number;
	created_at: string;
}

interface TaskListRow {
	id: number;
	name: string;
	sort_order: number;
	created_at: string;
}
```

SQLite results do not reconstruct `Date`, boolean, or class instances. Convert storage representations at the boundary when the UI needs richer domain values.

## Select rows with a helper

Use `selectAll<T>()` for a single declared table and an optional filter:

```typescript
async function loadOpenTasks(
	database: PluginDatabaseAPI,
	listId: number,
): Promise<TaskRow[]> {
	return database.selectAll<TaskRow>(
		"tasks",
		"list_id = ? AND completed = ?",
		[listId, 0],
	);
}
```

The `where` argument does not include the `WHERE` keyword. Put every value in the parameter array.

Use `query<T>()` for ordering, projections, joins, aggregates, and pagination:

```typescript
interface TaskSummaryRow {
	id: number;
	title: string;
	list_name: string;
	due_date: string | null;
}

async function loadDueTaskSummaries(
	database: PluginDatabaseAPI,
	limit: number,
): Promise<TaskSummaryRow[]> {
	return database.query<TaskSummaryRow>(
		`
			SELECT
				t.id,
				t.title,
				l.name AS list_name,
				t.due_date
			FROM tasks AS t
			JOIN lists AS l ON l.id = t.list_id
			WHERE t.completed = ? AND t.due_date IS NOT NULL
			ORDER BY t.due_date ASC, t.id ASC
			LIMIT ?
		`,
		[0, limit],
	);
}
```

Use only logical names declared in the schema, including inside joins and subqueries. Never discover, construct, or persist physical table names.

## Insert a row

`insert()` parameterizes the values and returns the inserted row ID:

```typescript
async function addTask(
	database: PluginDatabaseAPI,
	listId: number,
	title: string,
): Promise<number> {
	const trimmed = title.trim();
	if (!trimmed) throw new Error("A task title is required.");

	return database.insert("tasks", {
		list_id: listId,
		title: trimmed,
		completed: 0,
		due_date: null,
		sort_order: 0,
		created_at: new Date().toISOString(),
	});
}
```

Object keys must be declared column names. Omit a column only when it is nullable, auto-incrementing, or has an appropriate schema default.

## Update and delete rows

`update()` returns the number of affected rows:

```typescript
async function setTaskCompleted(
	database: PluginDatabaseAPI,
	taskId: number,
	completed: boolean,
): Promise<boolean> {
	const rowsAffected = await database.update(
		"tasks",
		{ completed: completed ? 1 : 0 },
		"id = ?",
		[taskId],
	);

	return rowsAffected === 1;
}
```

`deleteFrom()` uses the same parameterized filter contract:

```typescript
async function deleteTask(
	database: PluginDatabaseAPI,
	taskId: number,
): Promise<boolean> {
	const rowsAffected = await database.deleteFrom(
		"tasks",
		"id = ?",
		[taskId],
	);

	return rowsAffected === 1;
}
```

Check `rowsAffected` when a missing or concurrently changed row affects the result. Update reactive UI state only after the database operation succeeds.

## Commit dependent writes together

Use `transaction()` when several operations must succeed or fail as one unit.
The callback receives a scoped transaction whose SQL methods name the primary
logical table explicitly:

```typescript
await api.database.transaction(async (transaction) => {
	await transaction.execute(
		"tasks",
		"UPDATE tasks SET sort_order = sort_order + 1 WHERE list_id = ?",
		[listId],
	);
	await transaction.execute(
		"tasks",
		"INSERT INTO tasks (list_id, title, completed, sort_order, created_at) VALUES (?, ?, ?, ?, ?)",
		[listId, title, 0, 0, new Date().toISOString()],
	);
});
```

Phials rolls back the transaction when the callback throws or rejects.

## Execute a statement directly

Use `execute()` when a supported write does not fit a helper:

```typescript
const result = await api.database.execute(
	`
		UPDATE tasks
		SET sort_order = sort_order + 1
		WHERE list_id = ? AND sort_order >= ?
	`,
	[listId, insertionIndex],
);

api.notify.info(`Moved ${result.rowsAffected} tasks`);
```

`execute()` returns `rowsAffected` and, when applicable, `lastInsertId`. Use `query()` for statements that return rows.

## Parameterize every value

Place data in `?` parameters:

```typescript
await api.database.query<TaskRow>(
	"SELECT * FROM tasks WHERE title = ?",
	[userEnteredTitle],
);
```

Never interpolate user input:

```typescript
// Unsafe: user input changes the SQL statement.
const sql = `SELECT * FROM tasks WHERE title = '${userEnteredTitle}'`;
```

Parameters represent values, not identifiers or SQL fragments. Choose table names, column names, ordering expressions, and filter structure from plugin-owned constants:

```typescript
const ORDER_BY = {
	created: "created_at DESC, id DESC",
	due: "due_date ASC, id ASC",
} as const;

type SortMode = keyof typeof ORDER_BY;

async function loadTasks(
	database: PluginDatabaseAPI,
	listId: number,
	sortMode: SortMode,
): Promise<TaskRow[]> {
	const order = ORDER_BY[sortMode];
	return database.query<TaskRow>(
		`SELECT * FROM tasks WHERE list_id = ? ORDER BY ${order}`,
		[listId],
	);
}
```

Validate external input before treating it as a `SortMode`. Do not accept a raw `ORDER BY`, column name, table name, or `where` clause from user input.

## Handle failures without diverging state

Database methods reject when validation, constraints, or execution fail. Keep the previous in-memory state until the promise resolves, then refresh or apply the confirmed change.

For several dependent writes, use `transaction()` rather than coordinating
independent promises.

Test empty results, null values, uniqueness failures, missing rows, large result sets, pagination boundaries, and a failed write before publishing.
