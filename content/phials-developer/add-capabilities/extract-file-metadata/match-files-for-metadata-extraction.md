---
title: "Match files for metadata extraction"
description: "Configures extensions, MIME types, file categories, canHandle, global matching, and provider priority."
ai_disclosure: true
order: 1
---

# Match files for metadata extraction

Match narrowly enough that Phials does not read unrelated files or offer irrelevant metadata columns. [MetadataProvider](../../reference/sdk-type-reference/MetadataProvider.md) supports extension, MIME type, file category, and a final `canHandle` predicate.

## Choose the cheapest reliable selectors

Declare one or more indexed selectors:

```typescript
const ebookMetadataProvider: MetadataProvider = {
	type: "metadata",
	id: "example.ebooks.metadata",
	name: "Ebook metadata",
	priority: 20,
	extensions: ["epub"],
	mimeTypes: ["application/epub+zip"],
	categories: ["ebook"],
	canHandle: (file) => file.is_file && file.size > 0,
	extract: (_file, rawMeta) => {
		const title = rawMeta.Title?.trim();
		return title ? { "example.ebooks:title": title } : {};
	},
};
```

Use extension names without a leading dot and MIME types in lowercase. Matching is case-insensitive for extensions and MIME types.

The selectors are alternatives: a file becomes a candidate when its extension, MIME type, or category matches. If `canHandle` is present, it then refines that candidate and must also return `true`.

Use:

- `extensions` for exact formats whose suffix is reliable
- `mimeTypes` when the format has a stable MIME identity
- `categories` when the provider intentionally supports a broad Phials file category
- `canHandle` for cheap checks using [FileEntry](../../reference/sdk-type-reference/FileEntry.md), such as excluding folders, zero-byte files, or unsupported size ranges

`canHandle` runs during matching and directory profiling. Keep it synchronous and inexpensive. Do not read the file, call the Plugin API, parse a header, or start background work there. Perform content detection in `extract` and return an empty object when the content is not actually supported.

## Match a provider globally

A provider with no extension, MIME, or category selectors is a global candidate. Add `canHandle` when a global provider still needs a cheap [FileEntry](../../reference/sdk-type-reference/FileEntry.md) guard:

```typescript
const filenameMetadataProvider: MetadataProvider = {
	type: "metadata",
	id: "example.naming.metadata",
	name: "Filename metadata",
	canHandle: (file) => file.is_file && file.name.includes("-"),
	extract: (file) => {
		const [project] = file.name.split("-", 1);
		return project ?
				{ "example.naming:project": project }
			:	{};
	},
};
```

Global providers participate in matching for every file, so they should avoid file-content reads unless the [FileEntry](../../reference/sdk-type-reference/FileEntry.md) itself strongly indicates useful work. If a global schema should not add columns to every directory, set an explicit column policy as described in [Control metadata columns and automatic visibility](control-metadata-columns-and-automatic-visibility.md).

## Use content checks as a second stage

Some containers share an extension or category while only a subset contains the values your plugin understands. Match the format cheaply, then inspect existing raw metadata or a small header in `extract`:

```typescript
const workflowMetadataProvider: MetadataProvider = {
	type: "metadata",
	id: "example.workflow.metadata",
	name: "Workflow metadata",
	extensions: ["png"],
	mimeTypes: ["image/png"],
	categories: ["image"],
	extract: async (file, rawMeta, api) => {
		const embeddedWorkflow = rawMeta.workflow?.trim();
		if (embeddedWorkflow) {
			return { "example.workflow:embedded": true };
		}

		if (file.size > 1_000_000) return {};

		const bytes = await api.readFile();
		const header = new TextDecoder().decode(bytes.subarray(0, 128));
		return header.includes("example-workflow") ?
				{ "example.workflow:embedded": true }
			:	{};
	},
	columnPolicy: {
		requiresValueSampling: true,
	},
};
```

Return `{}` when the file is valid but does not contain your plugin’s metadata. Reserve a thrown error for an actual extraction failure; Phials treats one provider’s failure as non-fatal so other providers can still contribute.

## Set priority deliberately

Every matching provider runs. `priority` controls their order, not exclusive ownership:

- higher numbers run first
- omitted priority is `0`
- priority also breaks some directory-profile and automatic-column ordering ties

Do not use priority as a substitute for precise matching. Do not rely on it to resolve duplicate extracted keys; namespace keys so providers never overwrite one another.

Use higher priority when one provider’s work or schema should be considered before a broader fallback. Use the same priority for independent providers whose results do not overlap.

## Verify the match boundary

Test at least:

- lowercase and uppercase extensions
- a matching MIME type with an unusual extension
- each declared file category
- folders, symlinks, empty files, and oversized files
- a container that matches but lacks the expected embedded metadata
- a file that matches another metadata provider at the same time

Matching proves only that `extract` may run. It does not prove that a value exists.
