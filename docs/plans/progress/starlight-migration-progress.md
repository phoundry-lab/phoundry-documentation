# Starlight migration progress

## Status

Implementation complete; validated locally on Node 24.21.0.

- [x] Preserve a baseline of pre-existing working-tree files outside the repository.
- [x] Confirm Svelte API extraction for Checkbox, generic Select, and Modal.
- [x] Replace the production site with Starlight and separate section navigation.
- [x] Migrate UI articles to independently composed MDX, runnable examples, and generated API sections.
- [x] Preserve shared manifest, aliases, portable links, media, disclosures, and offline package.
- [x] Remove retired website and experiment code; document the authoring workflow.
- [x] Pass complete validation and browser verification.

No package publication, push, or production deployment is included in this local migration.

## Results

- Starlight serves the documentation hub and three independent landing areas/sidebars.
- 58 UI MDX articles explicitly compose prose, 250 runnable examples, and selected generated API sections. Example source is rendered from the runnable file, including shared helper files when requested.
- API extraction resolves 532 declarations from the same pinned `phoundry-ui@0.4.16` input used by examples.
- `npm run validate` passed: Astro and Svelte checks reported no errors or warnings; all 16 tests passed; 513 canonical pages, 227 aliases, local links/anchors/media, search output, and 454 lazy offline articles were verified.
- Browser checks covered the hub and independent sidebars, Checkbox interaction/source, generic Select overlays, confirmation/prompt/custom modals, isolated theme switching, global search, and a legacy SDK URL retaining its query and fragment.
- Development title changes regenerated navigation with fresh manifest metadata; canonical articles are watched directly. Temporary authoring probes were removed.
- A build launched under Node 22 successfully bootstrapped Node 24.21.0 and produced verified static output using the existing hosting command and output directory.
- All 520 Phials/Plugin SDK source files in the migration baseline remain byte-for-byte unchanged, preserving the pre-existing working tree.
