---
title: "Extract and namespace file metadata"
description: "Uses MetadataAPI reads, distinguishes raw from extracted values, returns JSON-safe data, handles missing input, and prevents merge-key collisions."
ai_disclosure: true
order: 2
---

# Extract and namespace file metadata

Implement `extract(file, rawMeta, api)` as a fail-soft conversion from one file snapshot to structured values. Use existing raw metadata when it contains what you need; read file contents through [MetadataAPI](../../reference/sdk-type-reference/MetadataAPI.md) only when the format requires it.

## Distinguish raw and extracted values

`rawMeta` is a string map produced by Phials’ file-metadata pipeline. Keys can be absent because a file lacks an embedded field, a supporting tool is unavailable, or extraction could not read that value.

Treat every raw value as optional and validate it before converting:

```typescript
function finiteNumber(
	rawMeta: RawMetadata,
	...keys: string[]
): number | undefined {
	for (const key of keys) {
		const raw = rawMeta[key]?.trim();
		if (!raw) continue;

		const value = Number(raw);
		if (Number.isFinite(value)) return value;
	}

	return undefined;
}

function nonEmptyString(
	rawMeta: RawMetadata,
	...keys: string[]
): string | undefined {
	for (const key of keys) {
		const value = rawMeta[key]?.trim();
		if (value) return value;
	}

	return undefined;
}
```

### Raw metadata key catalog

Raw keys are case-sensitive strings. The stable host catalog is:

| Key | Meaning |
| --- | --- |
| `FileName`, `Extension`, `Size`, `IsFile`, `IsDir` | Generic filesystem projection |
| `Created`, `Modified` | Filesystem timestamps in epoch seconds |
| `created`, `modified` | Host-injected [FileEntry](../../reference/sdk-type-reference/FileEntry.md) timestamps in epoch milliseconds |
| `Width`, `Height`, `BitDepth`, `ColorType` | Image dimensions and encoding |
| `Duration`, `Bitrate`, `OverallBitrate`, `SampleRate`, `Channels`, `BitsPerSample` | Audio or video stream values |
| `VideoCodec`, `AudioCodec`, `FrameRate`, `CreationTime`, `Encoder` | Video container and stream values |
| `Title`, `Artist`, `Album`, `Year`, `TrackNumber`, `TrackTotal` | Stable audio-tag aliases |
| `LineCount` | Text/code line count |

Format-specific extractors can add other keys. Treat keys outside this catalog
as optional extractor output rather than a cross-format guarantee.

Extracted values are the typed, stable contract your provider contributes. Do not expose an unvalidated raw string as a number, date, or boolean merely because one sample file used that shape.

## Namespace every returned key

Phials combines results from every matching provider into one flat `FileMetadata.extracted` record. Use a stable plugin-owned prefix for every key:

```typescript
const FIELD = {
	wordCount: "example.document-metadata:word-count",
	author: "example.document-metadata:author",
	reviewed: "example.document-metadata:reviewed",
} as const;
```

Use the same constants in `extract`, `schema.fields`, `rawKey`, `defaultVisibleFields`, `columnWhitelist`, and `getFilterValueOptions`. The prefix should remain stable across releases because saved column layouts and filters identify fields by key.

Never return generic keys such as `title`, `duration`, `created`, or `status`. Another matching provider can own the same plain-language concept.

## Prefer the smallest read

[MetadataAPI](../../reference/sdk-type-reference/MetadataAPI.md) adds two provider-scoped methods:

- `readTextFile()` returns decoded text from the exact host-selected extraction target
- `readFile()` returns that target as a `Uint8Array`

Use `rawMeta` first when Phials has already extracted the field. Otherwise, check `FileEntry.size` and parse the smallest supported amount of data. Avoid reading a large file into the renderer merely to calculate a value the host already supplies.

The following extractor uses a raw line count when available and falls back to a text read:

```typescript
const FIELD = {
	lineCount: "example.document-metadata:line-count",
	wordCount: "example.document-metadata:word-count",
} as const;

const MAX_TEXT_BYTES = 2_000_000;

const documentMetadataProvider: MetadataProvider = {
	type: "metadata",
	id: "example.document-metadata.values",
	name: "Document metadata",
	extensions: ["txt", "md", "markdown"],

	extract: async (file, rawMeta, api) => {
		if (!file.is_file || file.size > MAX_TEXT_BYTES) return {};

		const rawLineCount = finiteNumber(rawMeta, "LineCount");

		try {
			const text = await api.readTextFile();
			const words = text.match(/\S+/gu) ?? [];
			const lines =
				rawLineCount ??
				(text.length === 0 ? 0 : text.split(/\r\n|\r|\n/u).length);

			return {
				[FIELD.lineCount]: lines,
				[FIELD.wordCount]: words.length,
			};
		} catch {
			return rawLineCount === undefined ?
					{}
				:	{ [FIELD.lineCount]: rawLineCount };
		}
	},
};
```

These two extraction-lifetime methods do not require `filesystem.read` because
they cannot accept another path. Use permission-gated `api.files` when the
provider must read any file other than the host-selected target. Permission
requirements are canonical in
[Permission-gated Plugin API operations](../../reference/manifest-and-permissions-reference/permission-gated-plugin-api-operations.md).

Background metadata extraction can run for many files. Do not show one dialog or notification per unreadable or unsupported file. Return the values you can prove and let missing values remain absent.

## Return JSON-safe data

Return:

- strings
- finite numbers
- booleans
- `null` when null is part of a deliberate data contract
- arrays containing JSON-safe values
- plain objects containing JSON-safe values

Do not return:

- `undefined` as a field value; omit the field instead
- `NaN`, `Infinity`, or `-Infinity`
- `bigint`
- `Date`, `Map`, `Set`, `Uint8Array`, class instances, functions, or Svelte state
- cyclic objects

Use epoch milliseconds for dates and ordinary numbers for numeric fields. Convert binary identifiers to a string representation if they must be retained.

A nested object can be useful to plugin code, but schema-driven surfaces do not render arbitrary objects. Return separate flat schema fields for values that users should see, sort, or filter.

## Preserve a deterministic snapshot

The same file contents and public inputs should produce the same extracted result. Keep network requests, current time, random values, and user-interface state out of extraction unless they are an explicit, versioned part of the provider contract.

Phials may cache metadata by file path, size, and modification time. After your plugin changes the underlying file through a supported write workflow, the file’s content identity must change so the next extraction reads the new snapshot.

Test missing raw keys, malformed values, read rejection, invalid text, an oversized file, and an unsupported-but-matching container. Each case should return a useful partial result or `{}` without corrupting the merged metadata record.
