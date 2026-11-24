---
title: "Package and share a community theme"
description: "Verify a theme locally and submit its GitHub release to the community theme list."
ai_disclosure: true
order: 4
---

# Package and share a community theme

Use [Browse Themes](./add-a-theme-to-a-plugin.md) to try the two files you intend to release. Check that the theme appears in the expected light or dark list and stays readable across windows, menus, file views, and keyboard focus states.

1. Publish a stable GitHub Release for the theme. Use a version like `1.0.0` and tag it `1.0.0` or `v1.0.0`.
2. Attach exactly `theme.json` and `theme.css`. Together they can be up to 4 MiB.
3. Record each file’s exact size and SHA-256 digest after building the release.
4. Submit the theme entry to `community-themes.json` using the [community theme submission guide](https://github.com/EliWimmer/phials-plugins/blob/master/THEMES.md).

After the listing is accepted, open **Settings → This Client → Appearance → Browse Themes** and verify that the published version installs and applies. For an update, publish a new release and submit its new version and file details.
