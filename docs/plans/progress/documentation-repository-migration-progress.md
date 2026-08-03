# Documentation repository migration progress

## Status

Implementation in progress.

## Phase 1: repository and canonical snapshot

- [x] Record accepted ownership, delivery, licensing, deployment, and compatibility decisions.
- [x] Initialize a fresh `phoundry-documentation` Git repository.
- [x] Import the three published documentation sets.
- [x] Record exact source provenance.
- [x] Complete and verify the shared manifest, static site, and offline package builds.

## Phase 2: Phials integration

- [ ] Publish the public SDK package locally.
- [x] Generate SDK references from the pinned package artifact.
- [ ] Replace Phials' committed documentation source and eager loader with the local artifact adapter.
- [ ] Retire the Documentation authoring section while preserving Contextual Help and Tutorials.

## Phase 3: public cutover

- [ ] Verify parity against the current documentation site.
- [ ] Create and push `phoundry-lab/phoundry-documentation`.
- [ ] Create the Sevalla static site with continuous `main` deployment and previews.
- [ ] Attach and verify `docs.phoundry.app`.
- [ ] Add the explicit GoDaddy DNS record with `gddy` and test rollback.
- [ ] Remove former source copies and serving/synchronization logic after production verification.

## Notes

- Existing unrelated changes in Phials, phoundry-ui, and the workspace root are preserved and must not be staged with this migration.
- npm package publication is local and on demand. Static-site deployment remains continuous.
- Sevalla currently offers Node 22 for static-site builds. Local validation and GitHub CI remain pinned to Node 24.17.0; the hosting build uses Node 22 only for the SvelteKit static projection.
