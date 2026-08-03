#!/usr/bin/env node
/**
 * Rewrites backtick-wrapped type names in plugin docs to link to generated SDK pages.
 * Run after generate-type-references. Skips generated reference pages and code blocks.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS_ROOT =
	process.env.PHOUNDRY_DEVELOPER_DOCS_ROOT ?
		path.resolve(process.env.PHOUNDRY_DEVELOPER_DOCS_ROOT)
	:	path.resolve(__dirname, "../../content/phials-developer");
const LINK_MAP_PATH =
	process.env.PHOUNDRY_TYPE_REFERENCE_LINK_MAP ?
		path.resolve(process.env.PHOUNDRY_TYPE_REFERENCE_LINK_MAP)
	:	path.join(__dirname, "type-references-link-map.json");
const checkOnly = process.argv.includes("--check");

/** Types that appear in backticks but should not become links. */
const SKIP_TYPES = new Set([
	"string",
	"number",
	"boolean",
	"void",
	"unknown",
	"null",
	"undefined",
	"never",
	"any",
	"Promise",
	"ReadonlySet",
	"ReadonlyArray",
	"Record",
	"Component",
	"Snippet",
	"ToastEntry",
]);

/** @param {string} fromDir @param {string} slugPath references/TypeName */
function relativeLink(fromDir, slugPath) {
	const fromParts = fromDir.split("/").filter(Boolean);
	const toParts = slugPath.split("/");
	const ups = fromParts.length;
	const prefix = ups ? "../".repeat(ups) : "./";
	return prefix + toParts.join("/") + ".md";
}

/** @param {string} content */
function splitCodeFences(content) {
	const parts = [];
	let last = 0;
	const re = /```[\s\S]*?```/g;
	let m;
	while ((m = re.exec(content))) {
		if (m.index > last) {
			parts.push({ text: content.slice(last, m.index), code: false });
		}
		parts.push({ text: m[0], code: true });
		last = m.index + m[0].length;
	}
	if (last < content.length) {
		parts.push({ text: content.slice(last), code: false });
	}
	return parts;
}

/**
 * @param {string} line
 * @param {Record<string, string>} linkMap
 * @param {string} docRelDir e.g. plugins
 */
function linkTypesInLine(line, linkMap, docRelDir) {
	return line.replace(/`([A-Z][A-Za-z0-9_]*)`/g, (full, name, offset) => {
		if (SKIP_TYPES.has(name)) return full;
		const slug = linkMap[name];
		if (!slug) return full;

		// Skip if inside an existing markdown link label: […`Type`…](url)
		const before = line.slice(0, offset);
		const openBracket = before.lastIndexOf("[");
		const closeBracket = before.lastIndexOf("]");
		if (openBracket > closeBracket) {
			return full;
		}

		const href = relativeLink(docRelDir, slug);
		return `[${name}](${href})`;
	});
}

/**
 * @param {string} text
 * @param {Record<string, string>} linkMap
 * @param {string} docRelDir e.g. plugins
 */
function linkTypesInProse(text, linkMap, docRelDir) {
	return text
		.split("\n")
		.map((line) => {
			// Headings get auto anchor links in the docs site - never embed type links here.
			if (/^\s*#{1,6}\s/.test(line)) return line;
			return linkTypesInLine(line, linkMap, docRelDir);
		})
		.join("\n");
}

function walkMarkdownFiles(dir) {
	/** @type {string[]} */
	const out = [];
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const abs = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			if (
				path.relative(DOCS_ROOT, abs).replace(/\\/g, "/") ===
				"reference/sdk-type-reference"
			) {
				continue;
			}
			out.push(...walkMarkdownFiles(abs));
		} else if (entry.name.endsWith(".md")) {
			out.push(abs);
		}
	}
	return out;
}

function main() {
	if (!fs.existsSync(LINK_MAP_PATH)) {
		console.error(
			"link-type-references: missing link map - run generate:type-references first",
		);
		process.exit(1);
	}

	const linkMap = JSON.parse(fs.readFileSync(LINK_MAP_PATH, "utf8"));
	const files = walkMarkdownFiles(DOCS_ROOT);
	let changed = 0;

	for (const abs of files) {
		const rel = path.relative(DOCS_ROOT, abs).replace(/\\/g, "/");
		if (rel.startsWith("reference/sdk-type-reference/")) continue;

		let content = fs.readFileSync(abs, "utf8");

		const docRelDir = path.dirname(rel);
		const dirKey = docRelDir === "." ? "" : docRelDir;

		const parts = splitCodeFences(content);
		let next = "";
		let fileChanged = false;
		for (const part of parts) {
			if (part.code) {
				next += part.text;
				continue;
			}
			const linked = linkTypesInProse(part.text, linkMap, dirKey);
			if (linked !== part.text) fileChanged = true;
			next += linked;
		}

		if (fileChanged) {
			changed++;
			if (checkOnly) {
				console.error(`link-type-references: stale ${rel}`);
			} else {
				fs.writeFileSync(abs, next, "utf8");
				console.log(`link-type-references: updated ${rel}`);
			}
		}
	}

	if (checkOnly && changed > 0) {
		console.error(
			`link-type-references: ${changed} file(s) require regeneration`,
		);
		process.exitCode = 1;
		return;
	}
	console.log(
		`link-type-references: ${changed} file(s) ${checkOnly ? "stale" : "updated"}`,
	);
}

main();
