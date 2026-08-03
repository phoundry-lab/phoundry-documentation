# Documentation repository migration progress

## Status

Public cutover complete; local package cutover in progress.

## Phase 1: repository and canonical snapshot

- [x] Record accepted ownership, delivery, licensing, deployment, and compatibility decisions.
- [x] Initialize a fresh `phoundry-documentation` Git repository.
- [x] Import the three published documentation sets.
- [x] Record exact source provenance.
- [x] Complete and verify the shared manifest, static site, and offline package builds.

## Phase 2: Phials integration

- [x] Publish `@phoundry/phials-plugin-sdk@1.0.0` locally.
- [x] Generate SDK references from the pinned package artifact.
- [ ] Replace Phials' committed documentation source and eager loader with the local artifact adapter.
- [x] Retire the Documentation authoring section while preserving Contextual Help and Tutorials in the Phials integration worktree.

## Phase 3: public cutover

- [x] Verify representative Phials, developer, phoundry-ui, alias, and Pagefind routes against the static deployment.
- [x] Create and push `phoundry-lab/phoundry-documentation`.
- [x] Create the Sevalla static site with continuous `main` deployment and previews.
- [x] Attach and verify `docs.phoundry.app` with active HTTPS and make it primary.
- [x] Add explicit GoDaddy origin and verification records with `gddy`, leaving the wildcard untouched.
- [x] Remove former source copies and serving/synchronization logic from the `phoundry-website` migration worktree after production verification.

## Notes

- Existing unrelated changes in Phials, phoundry-ui, and the workspace root are preserved and must not be staged with this migration.
- npm package publication is local and on demand. Static-site deployment remains continuous.
- Documentation snapshots publish under npm's required `main` dist-tag, but Phials consumes only exact immutable versions.
- The published snapshot is the standalone `dist-package/` payload with no static-site runtime dependencies; the repository root is private to prevent accidental site-package publication.
- SDK references regenerate during every build from the exact lockfile pin `@phoundry/phials-plugin-sdk@1.0.0`.
- Sevalla currently offers Node 22 for static-site builds. Local validation and GitHub CI remain pinned to Node 24.17.0; the hosting build uses Node 22 only for the SvelteKit static projection.
- Sevalla uses the Kinsta GitHub App's selected access to `phoundry-lab/phoundry-documentation`; the site source is authenticated GitHub with automatic `main` deployments and pull-request previews enabled.
- Sevalla static site id: `bd98c9c4-605c-4900-9355-5260f7a55018`. The first successful production deployment was `e7f68f4f-c08c-4f9e-a6c0-70a01ef58415` from commit `a941e78`.
- GoDaddy has explicit `docs` A, `_cf-custom-hostname.docs` TXT, and `_acme-challenge.docs` TXT records for the static site. The existing wildcard record remains unchanged for other product hosts.
