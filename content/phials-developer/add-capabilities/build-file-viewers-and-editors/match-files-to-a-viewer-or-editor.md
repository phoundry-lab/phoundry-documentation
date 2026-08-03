---
title: "Match files to a viewer or editor"
description: "Configures extensions, MIME types, file categories, canHandle, priority, and deliberate fallback behavior."
ai_disclosure: true
order: 1
---

# Match files to a viewer or editor

Register a [PreviewProvider](../../reference/sdk-type-reference/PreviewProvider.md) with the narrowest stable description of the files it understands. Phials evaluates every matching provider and selects the highest-priority eligible result, so a provider should return `false` for uncertain files and let a more general viewer handle them.

## Define the provider

The following provider owns `.acme-diagram` files and the corresponding MIME type:

```ts
import DiagramSurface from "./DiagramSurface.svelte";

const DIAGRAM_EXTENSIONS = ["acme-diagram"];
const DIAGRAM_MIME_TYPES = ["application/vnd.acme.diagram+json"];
const MAX_DIAGRAM_BYTES = 4 * 1024 * 1024;

const diagramProvider: PreviewProvider = {
	type: "preview",
	id: "acme.diagram.viewer",
	name: "Acme Diagram",
	priority: 100,
	extensions: DIAGRAM_EXTENSIONS,
	mimeTypes: DIAGRAM_MIME_TYPES,
	canHandle: (file, match) => {
		if (!file.is_file || file.size > MAX_DIAGRAM_BYTES) return false;

		return (
			match.matchesExtension(file, DIAGRAM_EXTENSIONS) ||
			match.matchesMime(file, DIAGRAM_MIME_TYPES)
		);
	},
	surface: DiagramSurface,
	destinations: { pageTab: true, embed: true },
	overridesDoubleClick: true,
};

let pluginApi: PluginAPI | undefined;

export function getPluginAPI(): PluginAPI {
	if (!pluginApi) throw new Error("Acme Diagram is not activated");
	return pluginApi;
}

export default function createPlugin(): PhialsPlugin {
	return {
		id: "acme.diagram",
		name: "Acme Diagram",
		version: "0.1.0",
		providers: [diagramProvider],
		onActivate: (api) => {
			pluginApi = api;
		},
		onDeactivate: () => {
			pluginApi = undefined;
		},
	};
}
```

Use a stable provider ID beneath your plugin's namespace. One plugin may register several providers when it has genuinely different matching or presentation behavior.

## Choose matching criteria

The static fields create candidate matches:

- `extensions` contains lowercase extensions without a leading period.
- `mimeTypes` contains complete MIME types.
- `categories` contains public [FileCategory](../../reference/sdk-type-reference/FileCategory.md) values such as `"image"`, `"spreadsheet"`, or `"code - data"`.

Use the most specific criteria available. A custom format normally uses its extension and MIME type. A broad category is appropriate only when the viewer can safely handle every file in that category.

`canHandle` is a synchronous final decision. When it is present, return `true` only when the provider should receive the file; the static fields do not override a `false` result. Use the supplied [FileMatchAPI](../../reference/sdk-type-reference/FileMatchAPI.md) helpers so extension, MIME, and category comparisons follow Phials' normalization rules.

Keep `canHandle` fast and deterministic. It is evaluated during provider selection and must not read file contents, make network requests, mutate state, or throw. If identifying the format requires bytes from the file, match a stable extension or MIME type first and validate the contents when the surface or session loads. Show an unsupported-file state there rather than claiming every broad category.

## Use priority deliberately

Higher `priority` wins among providers that match the same file. Priority does not make a nonmatching provider eligible.

Choose a value that expresses specificity:

- a format-specific viewer should outrank a general text or document viewer;
- a general fallback should remain below specialized providers; and
- two providers for the same format should differ only when one intentionally takes precedence.

Do not use an extreme priority to capture unrelated files. Returning `false` from `canHandle` lets Phials try the next matching provider, including its standard fallback.

Set `overridesDoubleClick: true` when primary open should use the provider in File mode rather than deferring to the operating system. Users can still choose another supported open behavior.

## Verify matching

Test at least:

- an exact lowercase extension;
- the same extension with different filename casing;
- a MIME-only match;
- a directory with a matching-looking name;
- a file over the supported size limit; and
- a nearby format that should fall through.

After activation, open a representative file and confirm the intended provider appears. If another provider wins, inspect both matching criteria and priority before increasing the number.

The generated [FileMatchAPI](../../reference/sdk-type-reference/FileMatchAPI.md) and [`PreviewProvider`](../../reference/sdk-type-reference/PreviewProvider.md) pages list the exact fields.
