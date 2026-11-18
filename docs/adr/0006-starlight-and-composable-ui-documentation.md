---
status: accepted
supersedes: 0004-static-sveltekit-site
---

# Use Starlight and composable UI documentation

Use Astro Starlight for the static public documentation website. Preserve the consumer-neutral documentation manifest, stable URL prefixes, aliases, metadata, and existing offline package API. Generate static output in `build/` for the existing host.

Provide one root hub and three independently navigable doc sets: Phials, Plugin SDK, and Phoundry UI. Starlight owns the website shell, standard documentation components, search integration, and code rendering. A small adapter projects the shared manifest into Starlight navigation and page metadata.

Phials user and plugin articles remain portable Markdown. UI articles become canonical MDX whose authors choose the order and placement of all content. Authors insert focused Svelte example files and select generated API members explicitly. One runnable example is also the displayed source; grouped demos and separately maintained code strings are retired.

Extract component and public API facts from the exact installed Phoundry UI input used by examples. Keep editorial descriptions near the article or declaration rather than copying types/defaults into hand-maintained arrays. Common demo setup is shared; whole-document theme examples run in an isolated preview.

The static website and versioned offline Help artifact remain separate consumers of the canonical content. This supersedes the SvelteKit/mdsvex website choice in ADR-0004 and the earlier requirement to retain hand-maintained UI prop tables. It does not change package publication authority or authorize deployment as part of a local implementation.
