import path from 'node:path/posix';

const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

/** @param {string} filePath */
function documentationRelativePath(filePath) {
	const normalized = filePath.replaceAll('\\', '/');
	const marker = 'content/';
	const index = normalized.indexOf(marker);
	return index >= 0 ? normalized.slice(index) : normalized.replace(/^\/+/, '');
}

/** @param {string} sourcePath */
function publicDocPath(sourcePath) {
	const parts = documentationRelativePath(sourcePath).split('/').filter(Boolean);
	if (parts[0] !== 'content' || parts.length < 3) return null;
	parts.shift();
	const fileName = parts.at(-1);
	if (!fileName?.toLowerCase().endsWith('.md')) return null;
	const baseName = fileName.slice(0, -3);
	if (baseName.toLowerCase() === 'index' || baseName.toLowerCase() === 'readme') {
		parts.pop();
	} else {
		parts[parts.length - 1] = baseName;
	}
	return parts.join('/');
}

/**
 * Build a browser-relative URL for file-like docs routes that omit trailing slashes.
 * Repeating the target basename keeps the link valid with an added loopback prefix such as `/docs`.
 * @param {string} currentPublicPath
 * @param {string} targetPublicPath
 */
function relativeDocHref(currentPublicPath, targetPublicPath) {
	const targetParent = path.dirname(targetPublicPath);
	const parentPath = path.relative(path.dirname(currentPublicPath), targetParent);
	const targetName = path.basename(targetPublicPath);
	return parentPath && parentPath !== '.' ? `${parentPath}/${targetName}` : targetName;
}

/**
 * Rewrite portable Markdown links for docs routes without trailing slashes.
 * @param {string} url
 * @param {string | undefined} docFilePath
 */
export function transformHref(url, docFilePath) {
	if (!url || url.startsWith('#') || EXTERNAL.test(url)) return url;
	const suffixIndex = url.search(/[?#]/);
	const pathPart = suffixIndex < 0 ? url : url.slice(0, suffixIndex);
	const suffix = suffixIndex < 0 ? '' : url.slice(suffixIndex);
	if (!pathPart) return url;

	if (docFilePath && pathPart.toLowerCase().endsWith('.md')) {
		const currentSource = documentationRelativePath(docFilePath);
		const targetSource = pathPart.startsWith('/')
			? `content/${pathPart.replace(/^\/+/, '')}`
			: path.normalize(path.join(path.dirname(currentSource), pathPart));
		const currentPublicPath = publicDocPath(currentSource);
		const targetPublicPath = publicDocPath(targetSource);
		if (currentPublicPath && targetPublicPath) {
			if (currentPublicPath === targetPublicPath && suffix.startsWith('#')) return suffix;
			return relativeDocHref(currentPublicPath, targetPublicPath) + suffix;
		}
	}

	let transformed = pathPart;
	if (transformed.toLowerCase().endsWith('.md')) transformed = transformed.slice(0, -3);
	if (path.basename(transformed) === 'index') {
		const directory = path.dirname(transformed);
		if (suffix.startsWith('#') && directory === '.') return suffix;
		if (!suffix && directory === '.') return '.';
		transformed = directory;
	}
	if (transformed && suffix) return transformed + suffix;
	if (!transformed) return suffix || '.';
	if (transformed === './') return suffix || '.';
	return transformed;
}
