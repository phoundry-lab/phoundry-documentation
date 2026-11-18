# Starlight migration

Replace the production documentation website with Astro Starlight while preserving the canonical content repository, stable public URLs, shared manifest, pinned public SDK input, and versioned offline Phials package.

## Accepted scope

- Provide a root documentation hub and separate Phials, Plugin SDK, and Phoundry UI landing areas with their own navigation.
- Read canonical Markdown/MDX directly with file watching; generated copies are not an authoring workflow.
- Preserve page aliases, metadata, media, search, disclosures, and experimental notices.
- Keep Phials and plugin Markdown suitable for the existing offline Help artifact.
- Give each UI MDX article ownership of its headings, prose, examples, and API sections.
- Replace grouped demo components and duplicated source strings with individually insertable Svelte example files; render their source through Starlight at build time.
- Generate UI API facts from the same installed library revision used by live examples. Preserve explanatory notes while removing copied types/defaults/required flags.
- Keep common demo initialization in a shared Svelte host and isolate full-document theme demonstrations.
- Keep validated static output in `build/` for the existing hosting configuration. Package publication remains maintainer-run.
- Preserve pre-existing working-tree changes. Do not publish packages or push/deploy as part of this local migration.

## Verification

Run Node 24.21.0 and `npm run validate`. Verify built canonical pages, aliases, links, media, section navigation, source/preview parity, generated API selection, and offline article loading. Exercise representative basic, generic, and overlay examples plus search and light/dark modes in the browser.

See [ADR-0006](../adr/0006-starlight-and-composable-ui-documentation.md) and the [progress record](progress/starlight-migration-progress.md).
