# Documentation repository migration

## Objective

Create `phoundry-documentation` as the canonical home for Phials user documentation, Phials plugin documentation, and Phoundry UI documentation; consolidate shared generation and validation logic; generate a versioned offline artifact for Phials; and deploy a static public site at `docs.phoundry.app` through Sevalla with DNS managed by `gddy`.

Internal contributor plans, ADRs, context glossaries, audits, and research remain in the Phials and phoundry-ui repositories beside the code they govern.

## Existing contracts to preserve

- The `docs.phoundry.app/` documentation hub that routes readers into Phials user, Phials developer, and Phoundry UI documentation.
- Stable public doc-set prefixes: `/phials`, `/phials-developer`, and `/phoundry-ui`.
- Phials schema-version-2 navigation, required frontmatter, page-owned aliases, icons, AI disclosure, and active-branch hierarchy.
- Machine ownership and idempotent verification of the generated Phials public SDK reference.
- Phials' offline Help behavior, relative-link navigation, alias resolution, breadcrumbs, and per-set state.
- Phoundry UI's embedded interactive demos, per-set theming, overlays, experimental status, and hand-maintained prop tables unless a later decision explicitly changes them.
- Canonical URLs, redirects, sitemap coverage, social metadata, and edit links on the public site.
- The boundary between published plugin-author documentation and internal contributor knowledge.

## Accepted decisions

### Versioned Phials consumption

- `phoundry-documentation` publishes `@phoundry/documentation` as the **documentation artifact**.
- Phials pins an exact released package version for normal development, CI, and releases.
- A development-only sibling override supports testing unreleased local documentation builds.
- Phials retains the **Phials Help adapter**, but no canonical or generated documentation snapshot is committed in the Phials repository.

See [ADR-0001](../adr/0001-versioned-documentation-artifact.md).

### Shared manifest generation

- `phoundry-documentation` validates source content and generates one consumer-neutral **documentation manifest**.
- The manifest owns doc-set hierarchy, page metadata, navigation groups, ordering, aliases, icons, status, and disclosure state.
- The package and static site consume the same prebuilt manifest rather than rebuilding it independently.
- Phials retains Help UI, state, Phormat rendering, and desktop link behavior.
- The static site derives canonical URLs, redirects, sitemap entries, and social metadata in a web-only projection.

See [ADR-0002](../adr/0002-consumer-neutral-documentation-manifest.md).

### Repository-native authoring

- Retire the Documentation section of Phials' developer-only content author window.
- Do not recreate a dedicated documentation editor in `phoundry-documentation`.
- Author canonical documentation directly with IDE and repository tooling.
- Provide local preview plus schema, generation, link, formatting, and build checks in the new repository.
- Keep Phials' Contextual Help and Tutorials authoring tools because those systems remain Phials-owned.

### Versioned public-SDK input

- Phials publishes `@phoundry/phials-plugin-sdk` from its authoritative public declaration graph.
- Phials retains internal source extraction, transforms, and public-contract assembly.
- `phoundry-documentation` pins an exact SDK package version.
- The documentation repository owns Markdown type-reference generation, cross-linking, reference landing generation, and documentation-specific verification.
- Documentation builds do not require a sibling Phials checkout or commit generated SDK declarations as a second contract source.

See [ADR-0003](../adr/0003-versioned-public-sdk-input.md).

### Unreleased Phoundry UI APIs

- Allow Phoundry UI documentation to describe and demonstrate APIs before they are published to npm.
- Resolve the documentation build against a phoundry-ui Git revision rather than gating content on a package release.
- Record the resolved revision in the lockfile so a given documentation commit remains reproducible.
- Do not require a sibling phoundry-ui checkout in CI; local overrides remain available for cross-repository development.
- Rely on the sole maintainer to update a public API and its canonical documentation in the same work story.
- Do not add unreleased banners, per-page badges, or release-state synchronization machinery.

### Static public site

- Build the site with SvelteKit, `adapter-static`, and mdsvex.
- Extract and adapt the current documentation shell, transforms, and Phoundry UI demo components from phoundry-website.
- Prerender every canonical page and page-owned alias.
- Hydrate interactive navigation and Phoundry UI demos in the browser without requiring a server runtime.
- Generate Pagefind search indexes from the emitted static HTML.
- Deploy only static build output to Sevalla.

See [ADR-0004](../adr/0004-static-sveltekit-site.md).

### Static alias redirects

- Generate one prerendered HTML page for every page-owned alias in the documentation manifest.
- Emit canonical metadata plus immediate browser navigation that replaces the alias history entry and preserves applicable query and fragment state.
- Do not require or mirror alias rules in Sevalla configuration.
- Do not promise an HTTP 301, 308, or other server redirect status for aliases served as static files.
- Verify every alias output and destination during the build.

### Continuous public deployment

- Deploy every successful `main` build to `docs.phoundry.app` through Sevalla.
- Use pull-request and branch previews before merge rather than a separate production release gate.
- Do not require a documentation tag or matching Phials release to publish the static site.
- Accept that the public Phials documentation may be newer than the offline content bundled by a released Phials version.
- Preserve desktop reproducibility by advancing bundled Help only when Phials updates its exact `@phoundry/documentation` pin.

### Static-site analytics boundary

- Remove the documentation pageview beacon during migration.
- Do not retain or recreate phoundry-website's `/api/events` backend for the static site.
- Use Sevalla static-site access logs for operational traffic inspection.
- Treat product analytics as a separate future feature if access logs later prove insufficient.

### Local artifact publication

- Publish `@phoundry/documentation` locally only when advancing the documentation bundled by Phials.
- Use a timestamp-and-commit prerelease version such as `1.0.0-main.20260803.<sha>`.
- Never make Phials depend on a floating dist-tag or range; pin the exact snapshot version and lockfile resolution.
- Provide a maintainer-run command that refuses a dirty tree or non-`main` checkout, runs the complete artifact validation, derives the version from the checked-out commit, and invokes `npm publish` with local npm authentication.
- Do not publish packages from GitHub Actions and do not store npm publication credentials in CI.
- Keep static-site deployment independent: every valid `main` build may deploy publicly without publishing a documentation artifact.
- Retain the explicit sibling override for unreleased local development.

### Desktop artifact contents

- Include only the `phials` and `phials-developer` doc sets in `@phoundry/documentation`.
- Include their manifest branches, normalized Markdown, and referenced offline media.
- Exclude `phoundry-ui` pages and demo components because their mdsvex imports, browser demos, theme managers, and overlays are web-only.
- Keep all three doc sets in the canonical source and full static-site manifest.

### Lazy offline article loading

- Export the complete Phials manifest branches eagerly so Help navigation and alias resolution are immediately available.
- Generate one ESM module per normalized Markdown article body plus a static lookup whose literal dynamic imports are discoverable by Vite.
- Let SvelteKit/Vite perform code splitting, asset emission, caching, and offline chunk loading; do not add a custom runtime loader.
- Bundle referenced offline media as application assets resolved through generated metadata.
- Keep all page modules inside the packaged desktop build; opening Help never requires network access or a runtime source checkout.
- Replace Phials' current eager `import.meta.glob` corpus load with the generated package loader.

### Small typed artifact API

- Export an eager typed `manifest` covering the `phials` and `phials-developer` doc sets.
- Export `loadPage(docSet, pageId)` over the generated literal dynamic-import map.
- Export referenced offline media as bundled asset URLs consumable by the loaded page data.
- Keep generated directory names, page-module paths, media paths, and intermediate files private to the package.
- Do not expose deep package subpaths for generated content.
- Use the exact npm package version, TypeScript contract, and Phials compile/build tests as compatibility enforcement; do not add runtime schema-version negotiation.

### Repository home

- Create a public GitHub repository at `phoundry-lab/phoundry-documentation`.
- Use `main` as the continuous integration and Sevalla production source branch, and as the only clean source commit eligible for local package publication.
- Keep public edit links and repository references anchored to that canonical repository.

### Validation-first main workflow

- Allow direct pushes to `main`; do not require pull requests or configure a branch-protection ruleset initially.
- Run the full documentation validation and static build on every push and pull request.
- Let Sevalla deploy only when its build succeeds.
- Keep Sevalla pull-request previews enabled for changes that are developed through a pull request.
- Make the local npm publication command rerun or verify the complete validation suite before publishing.
- Revisit protection only if repository membership or maintainer count changes.

### Parity-first migration scope

- Preserve the current documentation root hub, shell, navigation, theming, search behavior, interactive Phoundry UI demos, and responsive behavior.
- Change repository ownership, manifest generation, offline packaging, deployment, and DNS without intentionally redesigning reader-facing surfaces.
- Treat visual refinements as follow-up work after production parity is verified.
- Compare representative pages and interactions against the current production site before DNS cutover.

### Licensing

- License site, package, manifest, validation, and generation code under MIT.
- License canonical documentation prose and media under Creative Commons Attribution 4.0.
- Reserve Phoundry trademarks separately.
- Add repository and path-level notices that make the code/content boundary explicit.

See [ADR-0005](../adr/0005-separate-code-and-content-licenses.md).

### Public package registry

- Publish `@phoundry/documentation` and `@phoundry/phials-plugin-sdk` publicly through npmjs.com.
- Keep normal Phials installs and CI independent of GitHub Package Registry authentication.
- Publish both packages with maintainer-controlled local npm authentication.
- Do not configure npm trusted publishing, an automation token, or a GitHub Actions publication workflow.
- Confirm or establish `@phoundry` npm scope ownership before deployment.

### Short-freeze staged cutover

- Begin a short documentation source freeze before copying canonical files and generators.
- Import the current corpora once and make `phoundry-documentation` authoritative immediately.
- Do not implement bidirectional synchronization or accept edits in the former trees during migration.
- Retain old source copies temporarily as read-only rollback material while the package, Phials integration, static build, and Sevalla preview are verified.
- Switch `docs.phoundry.app`, verify production, then remove the former copies and sync/build logic.

### Fresh snapshot with source provenance

- Initialize `phoundry-documentation` with a fresh Git history rather than merging filtered histories from Phials, phoundry-ui, or phoundry-website.
- At import time, record each source repository, exact source commit SHA, original path, destination doc set, and import date in a committed migration provenance file.
- Preserve detailed pre-migration file history in the original repositories.
- Keep the provenance record beside the imported snapshot so future maintainers can reproduce and audit the migration boundary without bringing unrelated or private product history into the public repository.

### DNS cutover and rollback

- Keep the existing wildcard `*` A record for the current Sevalla application unchanged.
- After Sevalla returns the static site's required domain target, add an explicit `docs` record with `gddy`; the explicit record overrides the wildcard only for `docs.phoundry.app`.
- Use a short TTL during cutover when the provider permits it.
- Roll back by removing the explicit `docs` record so wildcard routing resumes to the former application.

## Decisions still open

- Sevalla repository access and exact static-site build settings.
- Exact removal checklist for phoundry-website's docs routes and synchronized copies.
- Sevalla static-site build settings, domain attachment, and rollback procedure.
- Exact GoDaddy DNS record change needed to move `docs.phoundry.app` away from the existing wildcard destination.

## Delivery sequence

The sequence remains provisional until the open decisions above are resolved.

1. Establish the repository, content schema, artifact contract, and static-site foundation.
2. Move canonical content and generators without changing public URLs or Phials behavior.
3. Integrate and verify the pinned artifact in Phials.
4. Build and validate the static site, redirects, metadata, demos, and search.
5. Create the continuously deployed Sevalla static site and complete a preview-domain production rehearsal.
6. Cut over `docs.phoundry.app` with `gddy`, verify it, and retain a tested rollback path.
7. Remove retired source copies, synchronization scripts, and docs-serving logic from the former repositories.
