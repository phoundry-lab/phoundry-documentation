---
status: accepted
---

# Generate one consumer-neutral documentation manifest

`phoundry-documentation` validates canonical content and generates one prebuilt manifest containing doc-set hierarchy, page metadata, navigation groups, ordering, aliases, icons, status, and disclosure state. The published artifact and static site both consume this manifest instead of independently rebuilding the same model.

Phials retains its Help UI, per-tab navigation state, Phormat rendering, and desktop link behavior. The static site derives web-only URLs, redirects, sitemap data, and social metadata as a projection without making those concerns part of the shared manifest.

See also: [Documentation ownership and delivery](../context/documentation/ownership-and-delivery.md)
