import path from 'node:path';
import type { Plugin } from 'vite';
import { buildManifest } from './build-manifest';

const VIRTUAL_MANIFEST = '\0virtual:docs-manifest';

export function docsVirtualModules(): Plugin {
	return {
		name: 'phoundry-docs-virtual',
		enforce: 'pre',
		resolveId(id) {
			if (id === '$docs:manifest' || id === 'virtual:docs-manifest') return VIRTUAL_MANIFEST;
		},
		load(id) {
			if (id === VIRTUAL_MANIFEST) {
				return {
					code: `export default ${JSON.stringify(buildManifest(process.cwd(), undefined))};`,
					moduleType: 'js'
				};
			}
		},
		buildStart() {
			this.addWatchFile?.(path.join(process.cwd(), 'documentation'));
		},
		configureServer(server) {
			server.watcher.add(path.join(process.cwd(), 'documentation'));
		}
	};
}
