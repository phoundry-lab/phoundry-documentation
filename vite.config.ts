import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [sveltekit(), tailwindcss()],
	server: {
		host: '127.0.0.1',
		port: 5179,
		strictPort: true,
		fs: { allow: [path.join(root, 'content')] }
	},
	optimizeDeps: {
		noDiscovery: true
	},
	test: {
		environment: 'node',
		include: ['src/**/*.{test,spec}.{js,ts}', 'tests/**/*.{test,spec}.{js,ts}'],
		expect: { requireAssertions: true }
	}
});

