---
title: "Extract file metadata"
description: "Match files, extract namespaced metadata, define fields, and control column visibility."
ai_disclosure: true
aliases:
  - types/metadata
---

# Extract file metadata

Add a file metadata capability when a plugin can turn file contents or existing raw metadata into structured values such as page count, camera model, language, duration, or document status.

A [MetadataProvider](../../reference/sdk-type-reference/MetadataProvider.md) has four responsibilities:

1. Match the files it understands.
2. Return JSON-safe extracted values from `extract`.
3. Describe user-facing fields with an optional [MetadataSchema](../../reference/sdk-type-reference/MetadataSchema.md).
4. Decide how those fields participate in Details columns with [MetadataColumnPolicy](../../reference/sdk-type-reference/MetadataColumnPolicy.md).

Several metadata providers can match one file. Phials runs all of them and combines their results, so a provider should contribute only the fields it owns.

## Build the capability

Follow these articles in order:

1. [Match files for metadata extraction](match-files-for-metadata-extraction.md) with extensions, MIME types, file categories, `canHandle`, and priority.
2. [Extract and namespace file metadata](extract-and-namespace-file-metadata.md) from [RawMetadata](../../reference/sdk-type-reference/RawMetadata.md) or file contents and return safe, collision-free values.
3. [Define metadata fields and display formats](define-metadata-fields-and-display-formats.md) for Details, filtering, sorting, and metadata presentation.
4. [Control metadata columns and automatic visibility](control-metadata-columns-and-automatic-visibility.md) without making mixed folders noisy.

The minimum provider has matching rules and an `extract` function:

```typescript
const documentMetadataProvider: MetadataProvider = {
	type: "metadata",
	id: "example.document-metadata.values",
	name: "Document metadata",
	extensions: ["txt", "md", "markdown"],
	extract: async (file, _rawMeta, api) => {
		if (!file.is_file) return {};

		const text = await api.readTextFile();
		return {
			"example.document-metadata:word-count": text
				.trim()
				.split(/\s+/u)
				.filter(Boolean).length,
		};
	},
};
```

Register it in the plugin’s `providers` array. File-content reads require the corresponding plugin permission; see [Permission-gated Plugin API operations](../../reference/manifest-and-permissions-reference/permission-gated-plugin-api-operations.md).

## Understand where values appear

File metadata is read-only information derived from a file or its filesystem entry. A schema can make an extracted field available in Details, metadata presentations, captions, sorting, and filtering.

File metadata is not a Workspace Folder property:

- a metadata provider derives values rather than asking the user to enter them
- extracted values can be absent when a file does not contain the source information
- changing a metadata value means changing and re-reading the underlying file, not editing a Workspace Folder property
- [MetadataSchemaField](../../reference/sdk-type-reference/MetadataSchemaField.md) does not define a Workspace Folder schema

If the user should enter and retain a value independently of the file contents, build a Workspace Folder workflow instead of a metadata provider.

## Use the public contracts

The generated reference provides exact signatures for:

- [MetadataProvider](../../reference/sdk-type-reference/MetadataProvider.md)
- [MetadataAPI](../../reference/sdk-type-reference/MetadataAPI.md)
- [MetadataSchemaField](../../reference/sdk-type-reference/MetadataSchemaField.md)
- [MetadataColumnPolicy](../../reference/sdk-type-reference/MetadataColumnPolicy.md)
- [RawMetadata](../../reference/sdk-type-reference/RawMetadata.md) and [`ExtractedMetadata`](../../reference/sdk-type-reference/ExtractedMetadata.md)

Use [Work with paths and file entries](../../work-with-phials/work-with-files-and-folders/work-with-paths-and-file-entries.md) for the [FileEntry](../../reference/sdk-type-reference/FileEntry.md) contract. General text-file editing and conflict-safe writes remain under [Read and write text files safely](../../work-with-phials/work-with-files-and-folders/read-and-write-text-files-safely.md).
