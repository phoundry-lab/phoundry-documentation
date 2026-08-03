---
title: Phoundry UI
description: A shared Svelte 5 component library with overlay systems and themed primitives, designed for desktop applications.
layout: ui
order: 0
---

# Phoundry UI

Phoundry UI is a shared **Svelte 5** component library with overlay systems and
themed primitives, designed around use in desktop applications. Every page in
this documentation renders **live, interactive components** - what you see is the
real library running in your browser.

## Installation

Phoundry UI is distributed as the `phoundry-ui` package and pairs with Tailwind
CSS 4. Import the styles once in your root layout, then call `setupOverlays()` to
enable the modal, tooltip, context-menu, toast, and command-bar systems.

## Theming

Use the theme switcher in the header to preview any built-in palette live across
this documentation. Phoundry UI applies themes by setting CSS custom properties
at runtime via the `ThemeManager` - see the [Theming guide](/phoundry-ui/guides/theming).

## Explore

Browse the sidebar for live demos and prop references, starting with the
[Button](/phoundry-ui/buttons/button) and the
[Modal](/phoundry-ui/overlays/modal) system.
