---
title: "Store key-value plugin data"
description: "Uses namespaced asynchronous storage, handles absent values, enumerates keys, and clears data deliberately."
ai_disclosure: true
order: 2
---

# Store key-value plugin data

Use `api.storage` for small plugin-owned values that have a stable key and do not need SQL queries. The API is asynchronous and automatically scoped to the plugin’s stable ID.

Plugin storage does not require a plugin permission.

## Read and write a versioned value

Define a durable shape with an explicit version:

```typescript
interface RecentFoldersV1 {
	version: 1;
	paths: string[];
}

const RECENT_FOLDERS_KEY = "recent-folders";

async function loadRecentFolders(
	storage: PluginStorageAPI,
): Promise<RecentFoldersV1> {
	const stored = await storage.get<unknown>(RECENT_FOLDERS_KEY);

	if (
		!stored ||
		typeof stored !== "object" ||
		(stored as { version?: unknown }).version !== 1 ||
		!Array.isArray((stored as { paths?: unknown }).paths)
	) {
		return { version: 1, paths: [] };
	}

	return stored as RecentFoldersV1;
}

async function saveRecentFolders(
	storage: PluginStorageAPI,
	paths: string[],
): Promise<void> {
	await storage.set(RECENT_FOLDERS_KEY, {
		version: 1,
		paths: [...new Set(paths)].slice(0, 20),
	} satisfies RecentFoldersV1);
}
```

`get<T>()` describes the expected TypeScript result; it does not validate saved or migrated data. Validate unknown input at the boundary and return a safe default when the key is absent or malformed.

An absent key returns `null`. Avoid storing `null` when code needs to distinguish “missing” from “present with an empty value.”

## Store JSON-safe values

Store values that can be represented as JSON:

- strings, finite numbers, and booleans
- `null` when absence does not need a separate meaning
- arrays and plain objects composed of supported values

Convert values such as `Date`, `Map`, `Set`, class instances, and typed domain objects into an explicit durable shape. Store dates as ISO 8601 strings and reconstruct runtime types after reading.

Do not store functions, DOM nodes, Svelte state objects, cyclic graphs, or `undefined`.

## Update deliberately

Await every operation:

```typescript
async function dismissWelcome(storage: PluginStorageAPI): Promise<void> {
	await storage.set("welcome-dismissed", true);
}

async function isWelcomeDismissed(
	storage: PluginStorageAPI,
): Promise<boolean> {
	return (await storage.get<boolean>("welcome-dismissed")) ?? false;
}
```

Do not start dependent work until the write resolves. If the write fails, keep or restore the previous visible state and let the user retry.

Key-value storage is not a transactional read-modify-write API. Serialize dependent updates in one service. Use a database when multiple asynchronous paths update independent parts of shared structured data.

## Enumerate and delete keys

`keys()` returns only keys owned by the current plugin:

```typescript
async function removeCacheEntries(
	storage: PluginStorageAPI,
): Promise<number> {
	const keys = await storage.keys();
	const cacheKeys = keys.filter((key) => key.startsWith("cache:"));

	for (const key of cacheKeys) {
		await storage.delete(key);
	}
	return cacheKeys.length;
}
```

Use stable prefixes for related data, such as `cache:`, `sync:`, or `document:`. The plugin does not add its ID to keys; Phials applies plugin namespacing automatically.

`delete(key)` removes one value. `clear()` removes every key-value entry owned by the plugin:

```typescript
await api.storage.clear();
```

Treat `clear()` as consequential. Use it only for an explicit reset or user-confirmed removal, not during normal deactivation or startup recovery.

## Connect storage during activation

Capture the Plugin API in a service, then load durable state when the feature needs it:

```typescript
let pluginApi: PluginAPI | undefined;

export default function createPlugin(): PhialsPlugin {
	return {
		id: "example.recent-folders",
		name: "Recent folders",
		version: "1.0.0",
		async onActivate(api) {
			pluginApi = api;
			const recent = await loadRecentFolders(api.storage);
			console.info(`Loaded ${recent.paths.length} recent folders`);
		},
		onDeactivate() {
			pluginApi = undefined;
		},
		providers: [],
	};
}
```

Deactivation releases runtime references; it does not clear storage. Continue with [Handle plugin data lifecycle and removal](handle-plugin-data-lifecycle-and-removal.md).
