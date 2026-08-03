# Phoundry Documentation

Canonical documentation and delivery tooling for:

- Phials user documentation
- Phials plugin-author documentation
- Phoundry UI documentation

The SvelteKit site is statically generated for [docs.phoundry.app](https://docs.phoundry.app). The same manifest also produces the `@phoundry/documentation` package consumed by Phials for offline Help.

## Local development

```sh
nvm use
npm install
npm run dev
```

Run the complete validation suite with `npm run validate`.

The Phials SDK reference is regenerated from the exact
`@phoundry/phials-plugin-sdk` version in the lockfile as part of every build. For
cross-repository development only, set `PHOUNDRY_PHIALS_PLUGIN_SDK_DIR` to an
explicit local package build.

## Licensing

Tooling and application code are MIT licensed under [LICENSE](LICENSE). Documentation prose and media under `content/` are licensed under CC BY 4.0 as described in [content/LICENSE.md](content/LICENSE.md). Phoundry names and marks are not licensed by either grant.
