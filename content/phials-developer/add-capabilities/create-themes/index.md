---
title: "Create themes"
description: "Create, style, package, and test light and dark themes for Phials."
ai_disclosure: true
aliases:
  - types/theme
---

# Create themes

Create a theme when you want to add a complete light or dark appearance to Phials. A theme is a pair of files:

- `theme.json` supplies stable identity and picker metadata.
- `theme.css` supplies the complete Phoundry UI token set for one light or dark appearance.

Phials discovers theme pairs from an activated plugin. The plugin does not register a provider or call the Plugin API for each theme.

```text
themes/
└── slate-dark/
    ├── theme.json
    └── theme.css
```

One plugin can contain several themes. Each theme is independently selectable, so a related light and dark design uses two directories, two IDs, and two metadata files.

## Build a theme plugin

1. [Add a theme to a plugin](add-a-theme-to-a-plugin.md) and verify that Phials discovers it when the plugin activates.
2. [Define theme metadata and modes](define-theme-metadata-and-modes.md) with a stable namespaced ID and one light or dark mode.
3. [Style the theme with Phoundry UI tokens](style-a-theme-with-phoundry-ui-tokens.md), then test contrast and interactive states.
4. [Package and test theme release artifacts](package-and-test-theme-release-artifacts.md) using the required flat release-asset names.

Theme CSS controls the application appearance while that theme is active. It is different from a plugin’s optional `styles.css`, which styles interfaces contributed by the plugin. To make a panel, tab, file view, or viewer follow whichever theme the user selects, use [Style and theme plugin interfaces](../../get-started/use-svelte-and-phoundry-ui/style-and-theme-plugin-interfaces.md).

## Understand the lifecycle

Installation makes the theme files available but does not register them. When the plugin is enabled, loaded, and activated, Phials:

1. discovers complete theme pairs beneath `themes/`
2. validates their metadata
3. adds them to the matching light or dark theme list
4. applies one if it is the selected theme for the current color scheme

Deactivation unregisters every theme contributed by that plugin. If one was active, Phials switches to an available theme for the same light or dark scheme. Re-enabling the plugin discovers the pairs again.

Theme plugins normally need no plugin permissions. They still use the standard plugin manifest, compatibility declarations, `main.js`, installation, enablement, and activation lifecycle.
