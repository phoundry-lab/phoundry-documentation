import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const installedSdk = path.join(repositoryRoot, 'node_modules/@phoundry/phials-plugin-sdk');
const siblingSdk = path.resolve(repositoryRoot, '../phials/dist-plugin-sdk');

export const SDK_ROOT = path.resolve(
	process.env.PHOUNDRY_PHIALS_PLUGIN_SDK_DIR ||
		(fs.existsSync(installedSdk) ? installedSdk : siblingSdk),
);

export function loadTypeReferenceSources() {
	if (!fs.existsSync(SDK_ROOT)) {
		throw new Error(
			'No Phials Plugin SDK artifact found. Install @phoundry/phials-plugin-sdk or set PHOUNDRY_PHIALS_PLUGIN_SDK_DIR.',
		);
	}
	const sources = new Map();
	for (const name of fs.readdirSync(SDK_ROOT).sort()) {
		if (!name.endsWith('.d.ts') && name !== 'manifest-schema.ts') continue;
		sources.set(name, fs.readFileSync(path.join(SDK_ROOT, name), 'utf8'));
	}
	return sources;
}

export function writeDirectoryAtomically(destination, files) {
	const parent = path.dirname(destination);
	fs.mkdirSync(parent, { recursive: true });
	const stage = fs.mkdtempSync(path.join(parent, `.${path.basename(destination)}-stage-`));
	const backup = path.join(parent, `.${path.basename(destination)}-backup-${process.pid}-${Date.now()}`);
	try {
		for (const [relativePath, content] of files) {
			const output = path.join(stage, relativePath);
			fs.mkdirSync(path.dirname(output), { recursive: true });
			fs.writeFileSync(output, content, 'utf8');
		}
		const existed = fs.existsSync(destination);
		if (existed) fs.renameSync(destination, backup);
		fs.renameSync(stage, destination);
		if (existed) fs.rmSync(backup, { recursive: true });
	} catch (error) {
		if (fs.existsSync(stage)) fs.rmSync(stage, { recursive: true });
		if (!fs.existsSync(destination) && fs.existsSync(backup)) fs.renameSync(backup, destination);
		throw error;
	}
}

export function materializeSources(files) {
	const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'phoundry-sdk-reference-'));
	for (const [name, content] of files) fs.writeFileSync(path.join(directory, name), content, 'utf8');
	return directory;
}
