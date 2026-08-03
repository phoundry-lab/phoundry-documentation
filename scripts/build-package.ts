import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import manifest from '../src/lib/generated/manifest.json' with { type: 'json' };

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'dist-package');
const offlineSets = ['phials', 'phials-developer'] as const;
const rootPackage = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8')) as {
	name: string;
	version: string;
	description: string;
	engines?: Record<string, string>;
};

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(path.join(output, 'pages'), { recursive: true });

const loaders: string[] = [];
for (const setId of offlineSets) {
	const set = manifest[setId];
	for (const page of Object.values(set.pagesBySlug)) {
		const key = `${setId}:${page.slug}`;
		const fileName = `${crypto.createHash('sha256').update(key).digest('hex').slice(0, 20)}.js`;
		const raw = fs.readFileSync(path.join(root, page.filePath), 'utf8');
		const markdown = matter(raw).content.replace(/^\s+/, '');
		fs.writeFileSync(path.join(output, 'pages', fileName), `export default ${JSON.stringify(markdown)};\n`);
		loaders.push(`${JSON.stringify(key)}: () => import('./pages/${fileName}')`);
	}
}

const offlineManifest = Object.fromEntries(offlineSets.map((id) => [id, manifest[id]]));
fs.writeFileSync(
	path.join(output, 'manifest.js'),
	`const manifest = ${JSON.stringify(offlineManifest)};\nexport default manifest;\n`
);
fs.writeFileSync(
	path.join(output, 'index.js'),
	`import manifest from './manifest.js';\n\nconst pageLoaders = {\n\t${loaders.join(',\n\t')}\n};\n\nexport { manifest };\nexport const assetUrls = Object.freeze({});\n\nexport async function loadPage(docSet, pageId) {\n\tconst loader = pageLoaders[\`${'${docSet}:${pageId}'}\`];\n\tif (!loader) throw new Error(\`Unknown documentation page: ${'${docSet}:${pageId}'}\`);\n\tconst module = await loader();\n\treturn { markdown: module.default };\n}\n`
);
fs.writeFileSync(
	path.join(output, 'index.d.ts'),
	`export type DocumentationDocSetId = 'phials' | 'phials-developer';\n\nexport interface DocumentationPage {\n\tslug: string;\n\taliases: string[];\n\thref: string;\n\ttitle: string;\n\tdescription?: string;\n\torder?: number;\n\thidden: boolean;\n\tfilePath: string;\n\tsection?: string;\n\tlastmod?: string;\n\tstatus?: 'experimental';\n\taiDisclosure?: boolean;\n\ticon?: string;\n}\n\nexport interface DocumentationSection {\n\tid: string;\n\ttitle: string;\n\torder?: number;\n\tpages: DocumentationPage[];\n\tsections: DocumentationSection[];\n\tindexPage?: DocumentationPage;\n\ticon?: string;\n}\n\nexport interface DocumentationDocSet {\n\tid: DocumentationDocSetId;\n\ttitle: string;\n\tschemaVersion?: number;\n\trootDir: string;\n\thome: DocumentationPage;\n\tlooseTopPages: DocumentationPage[];\n\tsections: DocumentationSection[];\n\tpagesBySlug: Record<string, DocumentationPage>;\n\taliasesBySlug: Record<string, string>;\n\tflatPageOrder: DocumentationPage[];\n}\n\nexport declare const manifest: Record<DocumentationDocSetId, DocumentationDocSet>;\nexport declare const assetUrls: Readonly<Record<string, string>>;\nexport declare function loadPage(docSet: DocumentationDocSetId, pageId: string): Promise<{ markdown: string }>;\n`
);

fs.writeFileSync(
	path.join(output, 'package.json'),
	`${JSON.stringify(
		{
			name: rootPackage.name,
			version: rootPackage.version,
			description: 'Versioned Phials user and plugin documentation for offline Help',
			type: 'module',
			license: 'SEE LICENSE IN LICENSE.md',
			engines: rootPackage.engines,
			exports: {
				'.': {
					types: './index.d.ts',
					import: './index.js'
				}
			},
			publishConfig: { access: 'public' }
		},
		null,
		2
	)}\n`
);
fs.writeFileSync(
	path.join(output, 'README.md'),
	`# ${rootPackage.name}\n\nImmutable Phials user and plugin documentation for the offline Help module. Canonical source and public documentation live at https://docs.phoundry.app.\n`
);
fs.writeFileSync(
	path.join(output, 'LICENSE.md'),
	[
		'# Package licensing',
		'',
		'The generated package loader and manifest code are licensed under the MIT License:',
		'',
		fs.readFileSync(path.join(root, 'LICENSE'), 'utf8').trim(),
		'',
		'The bundled documentation prose and media are licensed under Creative Commons Attribution 4.0:',
		'',
		fs.readFileSync(path.join(root, 'content', 'LICENSE.md'), 'utf8').trim(),
		''
	].join('\n')
);

console.log(
	`Built offline package ${rootPackage.name}@${rootPackage.version}: ${loaders.length} lazy page modules`
);
