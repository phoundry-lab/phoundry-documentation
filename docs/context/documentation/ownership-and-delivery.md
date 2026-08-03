# Documentation ownership and delivery

Phoundry's public and bundled product documentation has one canonical source while retaining purpose-built delivery for the web and Phials' offline Help experience.

## Language

**Documentation source**:
The canonical authored Markdown, media, doc-set metadata, aliases, and machine-owned reference inputs in `phoundry-documentation`.
_Avoid_: canonical copies in Phials or phoundry-website; editing generated consumer output.

**Published documentation**:
The three reader-facing doc sets owned by `phoundry-documentation`: Phials user documentation, Phials plugin documentation, and Phoundry UI documentation.
_Avoid_: including implementation plans, ADRs, contributor context, audits, or research from product repositories.

**Contributor documentation**:
Project-internal plans, ADRs, context glossaries, audits, and research that remain beside the code they govern in Phials or phoundry-ui.
_Avoid_: calling contributor material Phials plugin documentation; centralizing source-coupled implementation knowledge in the public documentation repository.

**Documentation content license**:
Creative Commons Attribution 4.0 coverage for canonical documentation prose and media, with Phoundry trademarks reserved separately.
_Avoid_: assuming the MIT tooling license covers documentation content; treating trademark rights as granted by the content license.

**Documentation tooling license**:
MIT coverage for static-site, package, manifest, validation, and generation code in `phoundry-documentation`.
_Avoid_: applying the Phials proprietary source license to reusable documentation tooling; treating copied product prose as MIT code.

**Doc set**:
One independently navigable documentation corpus with a stable id, source tree, metadata contract, and public URL prefix.
_Avoid_: using repository, site, or package as a synonym for one corpus.

**Documentation artifact**:
The versioned `@phoundry/documentation` package generated from the `phials` and `phials-developer` **doc sets** for Phials to bundle and render offline.
_Avoid_: a copied source tree committed to Phials; an unpinned network fetch during a Phials build; calling the public static-site output the documentation artifact.

**Documentation artifact API**:
The small typed package surface that exports the eager `manifest`, `loadPage(docSet, pageId)`, and bundled asset URLs while keeping generated directories and modules private.
_Avoid_: consumer imports from generated internal paths; exposing package layout as a compatibility contract; runtime schema negotiation alongside TypeScript and exact package pins.

**Offline page module**:
A generated ESM module containing one normalized Markdown article body behind a literal dynamic-import boundary that SvelteKit/Vite splits into packaged application assets.
_Avoid_: a custom runtime loader or cache; eager complete-corpus imports; network fetches; runtime source paths.

**Documentation manifest**:
The consumer-neutral, prebuilt index of doc sets, pages, navigation groups, ordering, aliases, icons, status, and disclosure metadata generated once from the **documentation source**.
_Avoid_: rebuilding hierarchy or schema rules independently in Phials and the documentation site; web-only routing or SEO fields in the shared core.

**Phials Help adapter**:
The Phials-owned application integration that loads a pinned **documentation artifact** and renders its doc sets within the Help tab.
_Avoid_: treating Phials as an authoring source; rebuilding the **documentation manifest**; moving Help state, Phormat rendering, or desktop link handling into the shared artifact.

**Documentation site**:
The static web build generated from the **documentation source** and served at `docs.phoundry.app`.
_Avoid_: the existing host-aware phoundry-website docs routes after cutover; using the site build as Phials' offline input; redefining core navigation or validation in a web projection.

**Static documentation site**:
A fully prerendered SvelteKit site whose canonical pages and redirects are emitted as static files, while interactive navigation and Phoundry UI demos hydrate in the browser.
_Avoid_: using static to mean JavaScript-free; retaining an SSR server solely for documentation; requiring runtime filesystem or manifest generation.

**Static alias redirect**:
A prerendered HTML page emitted for a page-owned alias that declares the canonical destination and immediately replaces the browser location, preserving applicable query and fragment state.
_Avoid_: promising an HTTP redirect status from a static file; duplicating aliases in Sevalla configuration; maintaining provider-specific redirect rules.

**Public documentation channel**:
The latest successful `main` build deployed continuously to `docs.phoundry.app`.
_Avoid_: requiring a documentation tag or Phials release before publishing a valid public-site change.

**Documentation traffic logs**:
Sevalla's static-site access logs used for operational inspection without a client pageview beacon or documentation-owned analytics backend.
_Avoid_: retaining phoundry-website's `/api/events` solely for the static site; treating access logs as product analytics.

**Bundled documentation channel**:
The exact **documentation artifact** version pinned by a Phials build for offline Help.
_Avoid_: assuming it always matches the latest public site; floating dependency ranges in a reproducible Phials build.

**Documentation snapshot**:
An immutable `@phoundry/documentation` package published locally from a clean, validated `main` commit with a timestamp-and-commit prerelease version such as `1.0.0-main.20260803.<sha>`.
_Avoid_: a mutable `latest` dependency in Phials; CI-held npm credentials; publishing dirty or unvalidated work; reusing a package version for different content.

**Local package publication**:
The maintainer-run release command that validates a clean `main` checkout and publishes an immutable public npm package using local npm authentication.
_Avoid_: GitHub Actions publishing packages; npm automation tokens or trusted-publishing authority in CI; coupling every public-site deployment to an artifact release.

**Validation-first main**:
The sole-maintainer workflow in which direct pushes and optional pull requests both run the complete validation build, while successful builds alone are eligible for Sevalla deployment or local package publication.
_Avoid_: mandatory pull requests; branch-protection rulesets that add ceremony without another reviewer; bypassing validation before deployment or publication.

**Parity-first migration**:
The cutover scope that preserves the current documentation hub, shell, navigation, themes, interactive demos, and responsive behavior while changing repository ownership, generation, packaging, and hosting.
_Avoid_: mixing visual redesign into the repository migration; accepting reader-facing regressions as an architectural necessity; delaying cutover for unrelated polish.

**Public package registry**:
The public npm registry used to distribute `@phoundry/documentation` and `@phoundry/phials-plugin-sdk` without consumer-specific registry authentication.
_Avoid_: GitHub Packages authentication in normal Phials installs; release tarballs as a substitute for package-manager resolution.

**Web documentation projection**:
Static-site-only data derived from the **documentation manifest**, such as canonical URLs, sitemap entries, social metadata, and redirect output.
_Avoid_: adding web concerns to the consumer-neutral manifest; making the projection authoritative for doc hierarchy or aliases.

**Generated reference**:
Machine-owned documentation produced from a public source contract, including the Phials public SDK type reference.
_Avoid_: hand-editing generated pages; treating generator output as the canonical declaration source.

**Public SDK artifact**:
The versioned `@phoundry/phials-plugin-sdk` package produced by Phials from its authoritative public declaration graph and pinned by documentation builds.
_Avoid_: reading unversioned Phials source from a sibling checkout; treating generated Markdown as the SDK contract; moving Phials-internal extraction transforms into the documentation repository.

**Phoundry UI documentation target**:
The phoundry-ui Git revision resolved by the documentation lockfile and used to compile live demos and validate API guidance; it may represent unreleased API work.
_Avoid_: requiring an npm release before documenting an API; calling the target latest without identifying a revision; unrepeatable sibling-checkout state in CI.

**Same-change documentation contract**:
The sole-maintainer convention that every Phoundry UI public API change updates its canonical documentation in the same work story, whether or not the API has been released to npm.
_Avoid_: per-page unreleased badges; a release gate for documentation; knowingly merging API and documentation drift.

**Local documentation override**:
A development-only sibling-repository link that lets Phials consume an unreleased local build of `@phoundry/documentation` while normal and CI builds remain pinned to a published version.
_Avoid_: making a sibling checkout mandatory for Phials builds; silently consuming whichever branch happens to be present.

**Repository-native documentation authoring**:
Direct editing of canonical documentation files with IDE and repository commands, supported by local preview, schema, link, formatting, and generation checks.
_Avoid_: a dedicated documentation editor inside Phials; requiring a running desktop application to author or validate documentation.

**Documentation source freeze**:
The short migration interval after edits stop in Phials and phoundry-website and before the new canonical repository and both consumers are verified.
_Avoid_: long-lived dual writing; bidirectional synchronization; treating temporary rollback copies as writable sources.

**Source provenance record**:
The migration record that identifies each imported source repository, exact commit SHA, original path, destination doc set, and import date for the fresh canonical snapshot.
_Avoid_: merging unrelated product histories into the documentation repository; importing content without a reproducible source boundary; implying that the new repository contains pre-migration file history.

## Relationships

- The **documentation source** owns the `phials`, `phials-developer`, and `phoundry-ui` **doc sets**.
- Only **published documentation** moves; **contributor documentation** remains in its owning product repository.
- The **documentation content license** and **documentation tooling license** apply to separate repository paths, with clear notices at their boundary.
- The **documentation source** produces both the **documentation artifact** and the **documentation site**.
- The **documentation artifact** includes only `phials` and `phials-developer`; the mdsvex-dependent `phoundry-ui` set remains a static-site input only.
- Phials integrates only through the **documentation artifact API**; the exact package version and compile/build tests enforce compatibility.
- The artifact exposes the complete **documentation manifest** eagerly and provides discoverable dynamic imports for **offline page modules**; SvelteKit/Vite owns chunking and loading.
- One **documentation manifest** supplies the hierarchy and metadata used by both delivery paths.
- Phials pins one **documentation artifact** version and may opt into a **local documentation override** during development.
- The **Phials Help adapter** remains application-owned and consumes the artifact without duplicating canonical content.
- The **documentation site** derives a **web documentation projection** without redefining the shared manifest.
- The **documentation site** is a **static documentation site** built with SvelteKit, `adapter-static`, and mdsvex.
- Every page-owned alias becomes a **static alias redirect** generated from the manifest during the SvelteKit build.
- The **public documentation channel** advances on every successful `main` deployment, while the **bundled documentation channel** advances only when Phials updates its exact artifact pin.
- The public site emits no application-level analytics; **documentation traffic logs** are the only initial traffic signal.
- A **documentation snapshot** is published locally only when the maintainer wants Phials to advance its bundled documentation.
- Both package boundaries publish through the **public package registry** under the `@phoundry` scope.
- Both npm package boundaries use **local package publication**; continuous deployment applies only to the public documentation site.
- The public repository uses **validation-first main** without mandatory pull requests or branch protection.
- The site cutover is a **parity-first migration**; visual redesign is a separate future story.
- A **generated reference** is regenerated from its public contract before artifact and site validation.
- The Phials SDK **generated reference** is a documentation projection of one pinned **public SDK artifact**.
- The `phoundry-ui` doc set may describe unreleased APIs when its **Phoundry UI documentation target** contains them.
- The **same-change documentation contract** replaces visible unreleased-state chrome and cross-repository release enforcement.
- **Repository-native documentation authoring** is the only maintained authoring workflow; Phials' developer author window remains scoped to Contextual Help and Tutorials.
- During the **documentation source freeze**, `phoundry-documentation` becomes authoritative immediately after import while former trees remain read-only rollback material.
- The fresh repository snapshot includes a **source provenance record**; detailed pre-migration history remains in the source repositories.

## Example dialogue

> **Dev:** "Do I edit a broken Help article in Phials?"
> **Domain expert:** "No. Edit the **documentation source**, publish a new **documentation artifact**, and update the Phials pin. Use a **local documentation override** while testing the change."

## Flagged ambiguities

- "Local docs" previously meant both canonical files in the Phials repository and their in-app presentation. Resolved: canonical content lives in the **documentation source**; the in-app presentation is the **Phials Help adapter**.
- "Developer documentation" means published plugin-author guidance, not internal **contributor documentation**.
- "Documentation build" can mean the offline package or the web output. Use **documentation artifact** for the Phials input and **documentation site** for static web output.
- "Manifest" previously referred to separate Phials and website indexes. Resolved: the **documentation manifest** is generated once; consumers may derive presentation-specific projections.
- "Content authoring" previously included bundled documentation alongside Contextual Help and Tutorials. Resolved: documentation uses **repository-native documentation authoring**; the Phials author window retains only the two Phials-owned learning systems.
- "SDK source" previously meant live Phials declarations, synchronized starter files, and generated Markdown. Resolved: Phials owns the declaration graph and publishes the **public SDK artifact**; documentation pins that artifact and owns only its reference projection.
- "Current Phoundry UI API" means the explicit **Phoundry UI documentation target**, not necessarily the latest npm release.
- Unreleased API documentation needs no special reader-facing status. Resolved: the sole maintainer keeps API and docs aligned through the **same-change documentation contract**.
- "Static site" does not mean all interactivity is removed. Resolved: canonical content is prerendered, while scoped browser code hydrates demos and interactive navigation.
- "Redirect" on the static site means a **static alias redirect**, not a guaranteed HTTP 3xx response from Sevalla.
- "Published documentation" can mean the continuously deployed public site or the version bundled with Phials. Resolved: use **public documentation channel** and **bundled documentation channel** when the distinction matters; public content may legitimately be newer.
- "Documentation version" is not a second product release train. Resolved: a maintainer-run local command assigns each requested **documentation snapshot** an immutable timestamp-and-commit version from validated `main`.
- "Protected main" does not imply a GitHub ruleset for this sole-maintainer repository. Resolved: **validation-first main** makes deployment and local publication depend on successful checks while leaving direct pushes available.
- "New documentation site" does not imply a new visual design. Resolved: use a **parity-first migration** and verify the existing reader experience before later refinements.
- "Artifact schema" is not a second independently negotiated protocol. Resolved: the **documentation artifact API** is typed, the package version is exact, and generated file layout is private.
- "Move the documentation" does not mean merging the Git histories of Phials, phoundry-ui, and phoundry-website. Resolved: import a fresh snapshot with a **source provenance record** and retain earlier history in its original repository.

## Related

- [ADR-0001: Distribute bundled documentation as a versioned package](../../adr/0001-versioned-documentation-artifact.md)
- [ADR-0002: Generate one consumer-neutral documentation manifest](../../adr/0002-consumer-neutral-documentation-manifest.md)
- [ADR-0003: Generate SDK references from a versioned public artifact](../../adr/0003-versioned-public-sdk-input.md)
- [ADR-0004: Build the public docs as a static SvelteKit site](../../adr/0004-static-sveltekit-site.md)
- [ADR-0005: License tooling and content separately](../../adr/0005-separate-code-and-content-licenses.md)
- [Documentation repository migration](../../plans/documentation-repository-migration.md)
