import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { mdsvexConfig } from './mdsvex.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [vitePreprocess(), mdsvex(mdsvexConfig)],
	kit: {
		adapter: adapter({ pages: 'build', assets: 'build', precompress: true, strict: true }),
		alias: {
			$phoundry: 'node_modules/phoundry-ui/dist'
		},
		prerender: {
			origin: 'https://docs.phoundry.app',
			handleHttpError: 'fail'
		}
	}
};

export default config;

