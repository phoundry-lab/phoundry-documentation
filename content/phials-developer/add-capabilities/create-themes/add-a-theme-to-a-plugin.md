---
title: "Create and try a standalone theme"
description: "Try a theme in Phials before sharing it with others."
ai_disclosure: true
order: 1
---

# Create and try a standalone theme

On desktop, open the [Theme Editor](/phials/arrange-and-customize-phials/change-appearance/create-or-edit-a-theme) to duplicate a theme and edit it as you work. For a theme you build by hand, put `theme.json` and `theme.css` in a folder named with its ID inside the `themes` directory in [Phials Home](/phials/reference/phials-data-and-storage/phials-home-and-global-app-data). For example:

```text
themes/
└── example.slate-dark/
    ├── theme.json
    └── theme.css
```

The directory name must match the ID in `theme.json`. Start with the [metadata example](./define-theme-metadata-and-modes.md) and [a small CSS override](./style-a-theme-with-phoundry-ui-tokens.md).

1. Open **Settings → This Client → Appearance → Browse Themes**.
2. Switch to **Installed** and choose the refresh button.
3. Find the theme and choose **Apply**.

Phials changes to the theme’s mode. Check several windows, settings, and file views before you [publish the theme](./package-and-test-theme-release-artifacts.md).
