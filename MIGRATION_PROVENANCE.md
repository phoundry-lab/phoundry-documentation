# Migration provenance

The repository began as a fresh snapshot on 2026-08-03. Detailed history before this boundary remains in the original repositories.

| Imported material | Source repository | Source commit | Original path | Destination |
| --- | --- | --- | --- | --- |
| Phials user documentation | `phoundry-lab/phials` | `4ee9b1b1c44d473530a3dbcca18cc7393aa60185` | `documentation/user/` | `content/phials/` |
| Phials plugin-author documentation | `phoundry-lab/phials` | `4ee9b1b1c44d473530a3dbcca18cc7393aa60185` | `documentation/developer/` | `content/phials-developer/` |
| Public site copies of both Phials sets | `phoundry-lab/phoundry-website` | `eb151356790ecd5bd8462ea0456cb6bddc1a741c` | `documentation/phials/`, `documentation/phials-developer/` | Verified as the imported snapshot above |
| Phoundry UI documentation and live-demo adapters | `phoundry-lab/phoundry-website` | `eb151356790ecd5bd8462ea0456cb6bddc1a741c` | `documentation/phoundry-ui/`, `src/lib/docs/ui/` | `content/phoundry-ui/`, `src/lib/docs/ui/` |
| Phoundry UI implementation target | `phoundry-lab/phoundry-ui` | `0b3fa2c` | package source | Exact Git dependency resolved in `package-lock.json`; this commit adds Git-dependency package preparation without changing component source |

The Phials copies in phoundry-website were byte-for-byte synchronized with the Phials source at import time. Canonical ownership transfers to this repository at this snapshot.
