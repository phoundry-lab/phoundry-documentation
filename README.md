# Phoundry Documentation

Canonical documentation and delivery tooling for:

- Phials user documentation
- Phials plugin-author documentation
- Phoundry UI documentation

The Astro Starlight site is statically generated for [docs.phoundry.app](https://docs.phoundry.app). Phials, Plugin SDK, and Phoundry UI have separate landing pages and sidebars. The same consumer-neutral manifest also produces the `@phoundry/documentation` package consumed by Phials for offline Help.

## Local development

```sh
nvm use
npm ci
npm run dev
```

Use the pinned **Node 24.21.0** runtime. The development server is at <http://127.0.0.1:5179>. Canonical articles are read directly from `content/`; saving an article or example updates the preview. Navigation metadata changes regenerate the manifest and restart the preview automatically.

Run the complete validation suite with `npm run validate`. It checks Astro and Svelte types, tests the shared contracts and API extraction, builds the static site and Pagefind index, verifies canonical pages, redirects, links and anchors, and checks every lazy offline article against its canonical Markdown source.

```sh
npm run build:site
npm run preview
```

The built preview is at <http://127.0.0.1:4179> and includes search. Astro runs preview as a background service; use `npx astro preview status`, `npx astro preview logs`, or `npx astro preview stop` to manage it.

Site colors use Phoundry UI's default dark and default light palettes directly. `src/styles/starlight-theme.css` maps Starlight's color roles to the library tokens; the theme provider synchronizes both mode attributes before paint, including on pages without examples. Palette changes in the pinned library flow through without maintaining a second set of color values.

## Authoring Phials and plugin documentation

Edit Markdown in `content/phials/` or `content/phials-developer/`. Required page metadata is `title`, `description`, and boolean `ai_disclosure`; child articles also have an `order`. Section landing pages use `index.md`, with navigation labels, ordering, and icons in the section's `index.json`.

Use source-relative Markdown links. Filenames determine public URLs; `aliases` in the destination page preserve former URLs. Keep the prose portable Markdown so the same articles work in Phials offline Help. Put referenced media under the doc set's `_media/` directory.

The Phials SDK reference is regenerated from the exact
`@phoundry/phials-plugin-sdk` version in the lockfile as part of every build. For
cross-repository development only, set `PHOUNDRY_PHIALS_PLUGIN_SDK_DIR` to an
explicit local package build.

The generated `content/phials-developer/reference/sdk-type-reference/` directory is machine-owned. Fix SDK facts in the public SDK or the reference generator and regenerate; do not maintain generated signatures by hand.

## Authoring Phoundry UI documentation

Edit MDX in `content/phoundry-ui/`. Each article controls its own introduction, headings, explanations, examples, and API sections. Starlight supplies the visible title and surrounding navigation; `layout: ui`, `UiDocHeader`, and grouped `*Demos.svelte` components are no longer needed.

```mdx
---
title: Checkbox
description: Independent choices and mixed selection.
ai_disclosure: false
order: 6
---

import Example from "@docs/Example.astro";
import ApiTable from "@docs/ApiTable.astro";

## Basic selection

An explanation belongs here, before or after any example.

<Example name="inputs/checkbox/basic-toggle" />

## State properties

<ApiTable
	of="Checkbox"
	include={["checked", "onchange", "indeterminate"]}
	notes={{ indeterminate: "Use mixed state for partially selected groups." }}
/>
```

### Runnable examples and their source

An example named `inputs/checkbox/basic-toggle` lives at `content/phoundry-ui/_examples/inputs/checkbox/basic-toggle.svelte`. Write ordinary Svelte with imports from `phoundry-ui`. That one file supplies both the interactive preview and its displayed, copyable source. State and local helpers stay with the example. There are no separately maintained code strings for the same preview.

Insert examples individually, reorder them, and interleave prose freely. `Example` also supports an optional `title`, `codeOpen`, and `files` for displaying additional helper source files. Use `isolated`/`height` for examples that modify document-wide state. The theme gallery uses an isolated preview so named palettes cannot change Starlight's appearance. Common overlay providers, icon registration, and light/dark synchronization are shared by the documentation site.

### API sections

`ApiTable` reads generated facts from the installed `phoundry-ui` package. `of` selects a component, exported interface/type, or function return value such as `createVirtualList.return`. `include` selects and orders members; `exclude` hides members; `notes` supplies article-specific descriptions. Omit `include` to show all members. Unknown symbols or members fail the build.

Names, types, required flags, known defaults, and bindable flags come from the library using `svelte-docinfo` and TypeScript resolution. Component defaults are extracted from initializers; unspecified defaults are shown as a dash, not guessed from runtime behavior. Inherited options and generic props are resolved. Keep behavioral guidance and examples in the article, and put reusable API descriptions in the library's JSDoc. Prop arrays with manually copied types/defaults are retired.

### Library input

Normal builds use the exact `phoundry-ui` version in `package.json` and the lockfile, currently `0.4.16`. Both API extraction and examples consume that input. No sibling checkout is required in CI. For local library work, build and temporarily link the library package, then restart the docs server; return to `npm ci` before validating a normal pinned build. Unreleased work can use an explicitly pinned immutable library revision rather than waiting for a public release.

Generated `src/lib/generated/ui-api.json`, the small custom-icon subset, static output, and offline package output are never authoring sources.

## Delivery

`build/` remains the hosting output directory. Valid `main` builds deploy continuously through the existing Sevalla configuration. The static build launcher runs the runtime pinned in `.nvmrc`, including on the host's Node 22 base image; the host install command remains `npx --yes npm@11.13.0 ci` and the build command remains `npm run build:site`.

The public site and offline Help advance independently. `npm run release:documentation` is maintainer-run, requires a clean `main` checkout, validates the repository, and publishes an immutable package containing only the Phials and plugin doc sets. Phials receives bundled updates when its exact package pin advances. See [documentation ownership and delivery](docs/context/documentation/ownership-and-delivery.md).

## Licensing

Tooling and application code are MIT licensed under [LICENSE](LICENSE). Documentation prose and media under `content/` are licensed under CC BY 4.0 as described in [content/LICENSE.md](content/LICENSE.md). Phoundry names and marks are not licensed by either grant.
