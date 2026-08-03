# Phoundry Documentation

This public repository is the canonical source for the Phials user guide, Phials plugin-author documentation, and Phoundry UI documentation.

Before changing production code or canonical content, read `docs/context/CONTEXT-MAP.md`, the matching context document, `docs/plans/documentation-repository-migration.md`, its progress file when present, and linked ADRs.

## Ownership boundaries

- `content/` is canonical reader-facing documentation and is CC BY 4.0 licensed.
- Site, manifest, validation, generation, and package code is MIT licensed.
- Internal product plans, ADRs, audits, research, and contributor context remain in their owning product repositories.
- Generated output is never the authoring source.

## Verification

Use Node 24.17.0. Run `npm run validate` before publishing or deploying. Package publication is maintainer-run and local; the static site deploys continuously from validated `main` builds.

