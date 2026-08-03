---
status: accepted
---

# Generate SDK references from a versioned public artifact

Phials publishes its authoritative public declaration graph as `@phoundry/phials-plugin-sdk`. Phials retains source extraction and transforms because they are coupled to its internal declarations; `phoundry-documentation` pins one package version and owns Markdown reference generation, canonical cross-linking, and documentation-specific verification.

Documentation builds never read an unpinned sibling Phials checkout, and generated Markdown is not treated as the SDK contract.

See also: [Documentation ownership and delivery](../context/documentation/ownership-and-delivery.md)
