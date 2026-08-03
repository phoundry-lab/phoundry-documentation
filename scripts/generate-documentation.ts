import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fg from 'fast-glob';
import { buildManifest } from '../src/lib/docs/build-manifest.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const generatedDir = path.join(root, 'src', 'lib', 'generated');
const staticAssetsDir = path.join(root, 'static', 'docs-assets');

function writeIfChanged(file: string, content: string): void {
	fs.mkdirSync(path.dirname(file), { recursive: true });
	if (fs.existsSync(file) && fs.readFileSync(file, 'utf8') === content) return;
	fs.writeFileSync(file, content, 'utf8');
}

function copyStaticMedia(): void {
	fs.rmSync(staticAssetsDir, { recursive: true, force: true });
	for (const relative of fg.sync('content/**/_media/**/*', { cwd: root, onlyFiles: true })) {
		const destination = path.join(staticAssetsDir, relative.replace(/^content[\\/]/, ''));
		fs.mkdirSync(path.dirname(destination), { recursive: true });
		fs.copyFileSync(path.join(root, relative), destination);
	}
}

function verifyMarkdownLinks(): void {
	const files = fg.sync('content/**/*.md', { cwd: root, onlyFiles: true });
	const failures: string[] = [];
	for (const relative of files) {
		const source = fs.readFileSync(path.join(root, relative), 'utf8');
		for (const match of source.matchAll(/\]\(([^)\s]+\.md)(?:#[^)]+)?\)/g)) {
			const target = match[1]!;
			if (/^[a-z][a-z0-9+.-]*:/i.test(target)) continue;
			const absolute = target.startsWith('/')
				? path.join(root, 'content', target.replace(/^\/+/, ''))
				: path.resolve(root, path.dirname(relative), target);
			if (!fs.existsSync(absolute)) failures.push(`${relative} -> ${target}`);
		}
		for (const match of source.matchAll(/href=["']([^"']+\.md(?:[?#][^"']*)?)["']/g)) {
			failures.push(`${relative} -> raw HTML Markdown link ${match[1]}`);
		}
	}
	if (failures.length) {
		throw new Error(`Broken documentation links:\n${failures.join('\n')}`);
	}
}

const manifest = buildManifest(root);
verifyMarkdownLinks();
copyStaticMedia();
writeIfChanged(
	path.join(generatedDir, 'manifest.json'),
	`${JSON.stringify(manifest, null, 2)}\n`
);

console.log(
	`Generated documentation manifest: ${Object.values(manifest).reduce((count, set) => count + (set?.flatPageOrder.length ?? 0), 0)} pages`
);
