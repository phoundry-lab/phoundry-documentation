---
title: "Create themes"
description: "Create, style, test, and share a standalone light or dark theme for Phials."
ai_disclosure: true
aliases:
  - types/theme
---

# Create themes

A theme gives Phials a new light or dark appearance. Each theme contains two files:

- `theme.json` supplies its name, mode, and preview colors.
- `theme.css` customizes its appearance. The light or dark foundation supplies defaults for anything you leave out.

On desktop, you can [start with the Theme Editor](/phials/arrange-and-customize-phials/change-appearance/create-or-edit-a-theme) or create both files yourself. If you make a light and dark pair, give each variant its own ID and file pair.

1. [Create and try a standalone theme](./add-a-theme-to-a-plugin.md).
2. [Define the theme’s metadata](./define-theme-metadata-and-modes.md).
3. [Style the theme with Phoundry UI tokens](./style-a-theme-with-phoundry-ui-tokens.md).
4. [Package and share the theme](./package-and-test-theme-release-artifacts.md).

Themes have their own community listing. If you build a plugin and want its panels or views to follow the active theme, see [Style and theme plugin interfaces](../../get-started/use-svelte-and-phoundry-ui/style-and-theme-plugin-interfaces.md).
