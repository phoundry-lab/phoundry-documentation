---
title: "Control metadata columns and automatic visibility"
description: "Configures column menus, whitelists, default fields, dominance, sampling, and exclusion policy."
ai_disclosure: true
order: 4
---

# Control metadata columns and automatic visibility

Use [MetadataColumnPolicy](../../reference/sdk-type-reference/MetadataColumnPolicy.md) to make useful fields discoverable without rearranging Details for every incidental match. A schema makes fields eligible for presentation; column policy controls their availability and automatic visibility.

## Choose which fields enter the column menu

With a schema and no column policy, all schema fields can appear in the Details column menu when enough files in the current location match the provider.

Limit that contribution explicitly:

```typescript
const FIELD = {
	title: "example.documents:title",
	author: "example.documents:author",
	wordCount: "example.documents:word-count",
	internalRevision: "example.documents:internal-revision",
} as const;

const columnPolicy: MetadataColumnPolicy = {
	showInColumnMenu: true,
	columnWhitelist: [
		FIELD.title,
		FIELD.author,
		FIELD.wordCount,
	],
};
```

Assign `columnPolicy` to the provider. `columnWhitelist` affects both the menu and automatic picks. Its order becomes the provider’s column order. Unknown keys are ignored.

Use:

- omitted `columnWhitelist` to contribute every schema field
- a non-empty whitelist to contribute only selected schema keys
- an empty whitelist to contribute no metadata columns
- `showInColumnMenu: false` to disable the provider’s complete column contribution

Fields omitted from the menu can still remain in `FileMetadata.extracted` for plugin code. A schema field does not need to become a Details column merely because another metadata surface uses it.

## Choose an automatic-visibility mode

`autoVisible` has three modes:

| Mode | Behavior |
| --- | --- |
| `"never"` | Fields can be available in the menu but do not become visible automatically. |
| `"when-any"` | Default fields can become visible when the directory sample proves that the provider contributes values. |
| `"when-dominant"` | Default fields can become visible when the provider covers the dominant share of files. |

The default is `"when-dominant"`.

Specify a small, useful default set:

```typescript
const columnPolicy: MetadataColumnPolicy = {
	autoVisible: "when-dominant",
	defaultVisibleFields: [
		FIELD.title,
		FIELD.author,
		FIELD.wordCount,
	],
};
```

`defaultVisibleFields` must contain schema keys that remain eligible after the whitelist. Phials ignores unknown or excluded keys. When the list is omitted, Phials chooses a capped prefix of eligible schema fields; declaring the list produces a more intentional result.

Phials shows at most six fields automatically for one provider. The user can reveal additional available fields from the column menu.

Automatic visibility never overrides a user’s explicit show or hide choice. When the location no longer qualifies, Phials can remove automatically chosen visibility while preserving user-owned column settings.

## Understand directory dominance

Phials builds a cheap profile from regular files in the current listing:

- directories and the parent entry do not count
- at most the first 1,000 eligible files are profiled by default
- at least three sampled files must match before fields enter the column menu
- at least five files must exist before a provider can be dominant
- the default dominance threshold is 90 percent

Matching uses the provider’s extension, MIME, category, and `canHandle` rules. It does not normally read every file before the listing appears.

If several providers qualify, Phials favors the provider with the greatest sampled coverage and uses provider priority as a secondary ordering signal. A tie at the highest coverage does not rearrange columns automatically.

These defaults make a folder of audio files behave differently from a mixed project folder. In the mixed folder, several providers’ fields can remain available without any one set taking over the visible layout.

## Exclude broad providers from dominance

A global or baseline provider can contribute values to every file and would otherwise always look dominant. Set `excludeFromDominance` when that provider should not compete:

```typescript
const columnPolicy: MetadataColumnPolicy = {
	showInColumnMenu: false,
	excludeFromDominance: true,
};
```

Exclusion affects the dominance decision, not extraction. The provider still runs for matched files and still contributes its extracted values.

Use `showInColumnMenu: false` when fields duplicate built-in file columns. Use `excludeFromDominance: true` when the provider remains available in the menu but should not decide which specialized metadata fields appear automatically.

## Sample value-sparse providers

Matching can overstate coverage. A PNG provider may match every image while only a few files contain the embedded payload it needs.

Set `requiresValueSampling: true` when the presence of actual extracted values must be checked:

```typescript
const columnPolicy: MetadataColumnPolicy = {
	columnWhitelist: [
		FIELD.workflow,
		FIELD.model,
	],
	autoVisible: "when-any",
	defaultVisibleFields: [
		FIELD.workflow,
		FIELD.model,
	],
	requiresValueSampling: true,
};
```

Phials reads a small, bounded sample of matched files at low priority and qualifies the provider only when extraction returns one or more eligible schema values. Sampling does not block the directory listing and does not make empty cells count as useful coverage.

Keep sampled extraction cheap and deterministic. Check raw metadata or a small header before reading an entire file, and return `{}` immediately when the embedded payload is absent.

## Design a stable column policy

Use this decision sequence:

1. Does the field help users compare files in Details? If not, leave it out of the whitelist.
2. Does matching accurately predict that values exist? If not, require value sampling.
3. Should the provider ever change the visible layout without a user choice? If not, use `"never"`.
4. Is one match enough to justify the default fields, or should the format dominate the folder?
5. Which two to six fields give the most useful first comparison?
6. Is the provider global or duplicating built-in file columns? Exclude it from dominance.

Test empty folders, fewer than three matches, fewer than five files, a 90 percent homogeneous folder, a mixed folder, tied providers, more than 1,000 files, and a sparse provider whose matched files return no values. Confirm that manual user visibility choices survive every transition.
