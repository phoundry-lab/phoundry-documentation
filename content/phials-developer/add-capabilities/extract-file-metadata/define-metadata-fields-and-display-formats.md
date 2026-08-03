---
title: "Define metadata fields and display formats"
description: "Declares schema fields, semantic value types, icons, dynamic-enum options, and raw-versus-formatted keys."
ai_disclosure: true
order: 3
---

# Define metadata fields and display formats

Add a [MetadataSchema](../../reference/sdk-type-reference/MetadataSchema.md) when extracted values should appear in Phials interfaces. The schema describes presentation and value semantics; it does not perform extraction and does not define Workspace Folder properties.

## Give every visible value a field

A field has a stable extracted `key`, a user-facing `label`, and a semantic `type`:

```typescript
const FIELD = {
	wordCount: "example.document-metadata:word-count",
	language: "example.document-metadata:language",
	reviewed: "example.document-metadata:reviewed",
	publishedAt: "example.document-metadata:published-at",
	keywords: "example.document-metadata:keywords",
} as const;

const documentSchema: MetadataSchema = {
	fields: [
		{
			key: FIELD.wordCount,
			label: "Word Count",
			type: "number",
			icon: "phoundry-mono:properties",
		},
		{
			key: FIELD.language,
			label: "Language",
			type: "dynamic-enum",
			icon: "phoundry-mono:text",
		},
		{
			key: FIELD.reviewed,
			label: "Reviewed",
			type: "boolean",
			icon: "phoundry-mono:check",
		},
		{
			key: FIELD.publishedAt,
			label: "Published",
			type: "date",
			icon: "phoundry-mono:calendar",
		},
		{
			key: FIELD.keywords,
			label: "Keywords",
			type: "array",
			icon: "phoundry-mono:tag",
		},
	],
};
```

The extracted record must use values compatible with each type:

| Type | Return value | Phials behavior |
| --- | --- | --- |
| `string` | string | text display and lexical comparison |
| `number` | finite number | numeric display, comparison, and calculations |
| `date` | epoch milliseconds | host-controlled date display, sort, and filtering |
| `boolean` | boolean | checked or unchecked display and boolean filtering |
| `array` | JSON-safe array | joined display and item-aware filtering |
| `dynamic-enum` | stable string | choice filtering from provider options or listing values |

Omit a key when the value is unknown. Do not use an empty string, `0`, or `false` to stand for missing data because each can be a meaningful value.

Schema fields are read-only. Users can show, hide, sort, filter, and format supported metadata columns, but they do not edit the extracted value as a Workspace Folder property.

## Separate logic values from formatted display

Usually the schema field’s `key` holds both the displayed and logical value. Use `format: "html"` only when the display needs supported inline markup.

An HTML-formatted field needs two extracted keys:

- `key` contains sanitized display HTML
- `rawKey` contains the typed value used for sort, filter, and calculations

Declare only the formatted field in the schema:

```typescript
const FIELD = {
	wordCount: "example.document-metadata:word-count",
	wordCountDisplay: "example.document-metadata:word-count-display",
} as const;

const provider: MetadataProvider = {
	type: "metadata",
	id: "example.document-metadata.values",
	name: "Document metadata",
	extensions: ["txt", "md", "markdown"],

	extract: async (file, _rawMeta, api) => {
		const text = await api.readTextFile();
		const count = (text.match(/\S+/gu) ?? []).length;

		return {
			[FIELD.wordCount]: count,
			[FIELD.wordCountDisplay]:
				`<strong>${count.toLocaleString()}</strong> words`,
		};
	},

	schema: {
		fields: [
			{
				key: FIELD.wordCountDisplay,
				rawKey: FIELD.wordCount,
				label: "Word Count",
				type: "number",
				format: "html",
				icon: "phoundry-mono:properties",
			},
		],
	},
};
```

On a formatted field, `type` describes the raw value at `rawKey`, not the HTML string. Phials sanitizes the HTML before rendering. Supported markup is intended for concise inline emphasis and structure, not interactive controls, images, links, or arbitrary styles.

Keep user-controlled text escaped before placing it in markup even though Phials performs final sanitization. Prefer a plain field when semantic tokens and host formatting already express the value.

`format` is a closed union. Plugin API `1.0.0` supports only `"html"`, and an
HTML field must declare a distinct plugin-prefixed `rawKey` that is not listed
as a separate schema field. Invalid relationships reject provider registration.

## Add icons

`icon` is an Iconify ID used in column headers and metadata chrome. Use one
stable icon for the field's meaning and include every custom icon ID in the
typed source manifest's `icons` list so Phials can preload it before importing
plugin code.

An icon supplements the label; it does not replace it. Keep labels concise and distinguish fields that could otherwise look alike, such as filesystem **Created** and embedded **Published**.

## Provide dynamic-enum options

A `dynamic-enum` field can supply stable values through `getFilterValueOptions`. Return the stored value and an optional user-facing label:

```typescript
const LANGUAGE = {
	en: "English",
	es: "Spanish",
	fr: "French",
} as const;

const getLanguageFilterOptions: NonNullable<
	MetadataProvider["getFilterValueOptions"]
> = async (fieldKey) => {
		if (fieldKey !== FIELD.language) return [];

		return Object.entries(LANGUAGE).map(([value, label]) => ({
			value,
			label,
		}));
};
```

Assign `getLanguageFilterOptions` to the provider’s `getFilterValueOptions` field. When the hook returns no options, Phials derives choices from distinct values already available in the current listing. Keep option values stable across releases; changing a stored value can invalidate saved filters.

Use `array` instead of `dynamic-enum` when one file can have several independent values. Use `string` when a curated choice list would not help the user.

## Keep schema and extraction synchronized

Use shared constants so these remain aligned:

- extracted keys
- schema `key` and `rawKey`
- dynamic-enum `fieldKey`
- column whitelist and defaults
- tests

Verify that every schema field renders the intended empty, normal, malformed, and long value. See [Test plugin logic and interfaces](../../test-and-troubleshoot/test-and-validate-your-plugin/test-plugin-logic-and-interfaces.md).
