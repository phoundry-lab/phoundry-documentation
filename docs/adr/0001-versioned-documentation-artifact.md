---
status: accepted
---

# Distribute bundled documentation as a versioned package

`phoundry-documentation` publishes a versioned `@phoundry/documentation` package containing normalized documentation content, media, doc-set metadata, aliases, and generated manifests. Phials pins that package for reproducible offline Help builds and may use an explicit sibling-repository override during local development; it does not commit a generated documentation snapshot or fetch an unpinned repository state during its build.

This keeps the documentation corpus single-owned while allowing Phials releases to choose and verify an exact documentation version independently of public-site deployment.

See also: [Documentation ownership and delivery](../context/documentation/ownership-and-delivery.md)

