---
status: accepted
---

# Build the public docs as a static SvelteKit site

The public documentation site uses SvelteKit with `adapter-static` and mdsvex. Every canonical page and alias redirect is prerendered for static delivery; interactive navigation and Phoundry UI examples hydrate in the browser, and Pagefind indexes the emitted HTML after the build.

This preserves the existing Svelte component demos, theming, and documentation shell without retaining phoundry-website's SSR and host-routing constraints. Sevalla serves only the generated static output.

See also: [Documentation ownership and delivery](../context/documentation/ownership-and-delivery.md)
