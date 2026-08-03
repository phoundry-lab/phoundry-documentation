# Context Map

## Contexts

- [Documentation ownership and delivery](./documentation/ownership-and-delivery.md) — canonical doc sets, generated references, the versioned Phials artifact, and the public static site

## Relationships

- **Documentation source → Documentation artifact**: one repository build produces the versioned offline input consumed by Phials.
- **Documentation source → Documentation site**: the same canonical source produces the static public site served at `docs.phoundry.app`.
- **Documentation artifact → Phials Help adapter**: Phials pins and renders the artifact without owning a second documentation corpus.

## Plans

- [Documentation repository migration](../plans/documentation-repository-migration.md) — consolidate the existing doc sets and generators, then cut over offline Help and the public site

