#!/usr/bin/env node
/**
 * Generates markdown type reference pages under
 * documentation/developer/reference/sdk-type-reference/
 * from stable public SDK sources. Run: npm run generate:type-references
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { loadTypeReferenceSources, writeDirectoryAtomically } from "./sdk-reference-sources.mjs";
import {
	PLUGIN_API_VERSION,
	PUBLIC_REFERENCE_CATEGORIES,
	referenceEntries,
} from "./sdk-reference-manifest.mjs";

const scriptPath = fileURLToPath(import.meta.url);
const __dirname = path.dirname(scriptPath);
const OUT_DIR =
	process.env.PHOUNDRY_TYPE_REFERENCE_OUT_DIR ?
		path.resolve(process.env.PHOUNDRY_TYPE_REFERENCE_OUT_DIR)
	:	path.resolve(__dirname, "../../content/phials-developer/reference/sdk-type-reference");
const LINK_MAP_PATH =
	process.env.PHOUNDRY_TYPE_REFERENCE_LINK_MAP ?
		path.resolve(process.env.PHOUNDRY_TYPE_REFERENCE_LINK_MAP)
	:	path.join(__dirname, "type-references-link-map.json");
const MANIFEST_PROJECTION_PATH =
	process.env.PHOUNDRY_TYPE_REFERENCE_MANIFEST ?
		path.resolve(process.env.PHOUNDRY_TYPE_REFERENCE_MANIFEST)
	:	path.join(__dirname, "type-references-manifest.json");

/** Escape Svelte-significant syntax in prose emitted through mdsvex. */
export function sanitizeProseForMdsvex(text) {
	if (!text) return text;
	return text
		.split("\n")
		.map((line) =>
			line
				.replace(/\{[^{}\n]+\}/g, (match) => `\`${match}\``)
				.replace(/</g, "&lt;")
				.replace(/>/g, "&gt;"),
		)
		.join("\n");
}

/** @param {import('typescript').Node} node @param {import('typescript').SourceFile} sf */
function getJsDocSummary(node, sf) {
	const tags = ts.getJSDocCommentsAndTags(node);
	if (!tags.length) return "";
	const parts = [];
	for (const tag of tags) {
		if (ts.isJSDoc(tag)) {
			const comment = tag.comment;
			if (typeof comment === "string" && comment.trim()) {
				parts.push(comment.trim());
			} else if (Array.isArray(comment)) {
				parts.push(
					comment
						.map((c) => (typeof c === "string" ? c : c.text))
						.join("")
						.trim(),
				);
			}
		}
	}
	return sanitizeProseForMdsvex(parts.join("\n\n").trim());
}

/** @param {import('typescript').Node} node @param {import('typescript').SourceFile} sf */
function getMemberDescription(node, sf) {
	const parent = node.parent;
	if (parent && ts.isPropertySignature(parent)) {
		return getJsDocSummary(parent, sf);
	}
	return getJsDocSummary(node, sf);
}

/**
 * Format a type as plain TypeScript text before the Markdown renderer splits
 * syntax and canonical declaration links into adjacent code-styled segments.
 * @param {import('typescript').TypeNode | undefined} node
 * @param {import('typescript').SourceFile} sf
 */
function formatTypeInline(node, sf) {
	if (!node) return "-";

	if (ts.isTypeReferenceNode(node)) {
		const name = node.typeName.getText(sf);
		const args =
			node.typeArguments?.map((a) => formatTypeInline(a, sf)) ?? [];
		return args.length ? `${name}<${args.join(", ")}>` : name;
	}

	if (ts.isUnionTypeNode(node)) {
		return node.types.map((t) => formatTypeInline(t, sf)).join(" | ");
	}

	if (ts.isIntersectionTypeNode(node)) {
		return node.types.map((t) => formatTypeInline(t, sf)).join(" & ");
	}

	if (ts.isArrayTypeNode(node)) {
		return `${formatTypeInline(node.elementType, sf)}[]`;
	}

	if (ts.isTypeLiteralNode(node)) {
		return "{ … }";
	}

	if (ts.isFunctionTypeNode(node)) {
		const params = node.parameters
			.map((p) => {
				const opt = p.questionToken ? "?" : "";
				const pname = p.name.getText(sf);
				const type = formatTypeInline(p.type, sf);
				return `${pname}${opt}: ${type}`;
			})
			.join(", ");
		const ret = formatTypeInline(node.type, sf);
		return `(${params}) => ${ret}`;
	}

	if (ts.isParenthesizedTypeNode(node)) {
		return formatTypeInline(node.type, sf);
	}

	if (ts.isIndexedAccessTypeNode(node)) {
		return `${formatTypeInline(node.objectType, sf)}[${formatTypeInline(node.indexType, sf)}]`;
	}

	if (ts.isLiteralTypeNode(node)) {
		return node.literal.getText(sf);
	}

	if (ts.isTupleTypeNode(node)) {
		return `[${node.elements.map((e) => formatTypeInline(e, sf)).join(", ")}]`;
	}

	return node.getText(sf).replace(/\s+/g, " ").trim();
}

/** @param {string} text @param {boolean} tableCell */
function codeSpan(text, tableCell = false) {
	if (!text) return "";
	const escaped = tableCell ? text.replace(/\|/g, "&#124;") : text;
	return `\`${escaped}\``;
}

/**
 * Keep the type expression code-styled while making each known declaration
 * identifier independently clickable.
 * @param {string} expression
 * @param {Set<string>} referenceNames
 * @param {string} pageName
 * @param {Set<string>} linkedNames
 * @param {boolean} tableCell
 */
function linkTypeExpression(
	expression,
	referenceNames,
	pageName,
	linkedNames,
	tableCell = false,
) {
	if (expression === "-") return expression;
	const parts = [];
	let cursor = 0;
	const identifiers = /[$A-Z_a-z][$\w]*/g;
	let match;
	while ((match = identifiers.exec(expression))) {
		const name = match[0];
		if (name === pageName || !referenceNames.has(name)) continue;
		parts.push(codeSpan(expression.slice(cursor, match.index), tableCell));
		parts.push(`[\`${name}\`](${name}.md)`);
		linkedNames.add(name);
		cursor = match.index + name.length;
	}
	parts.push(codeSpan(expression.slice(cursor), tableCell));
	return parts.filter(Boolean).join("");
}

/**
 * Collect identifiers used by this declaration only. Dependency closure beyond
 * the declaration is intentionally excluded.
 * @param {import('typescript').Node} declaration
 * @param {Set<string>} referenceNames
 * @param {string} pageName
 */
function collectDirectReferences(declaration, referenceNames, pageName) {
	const references = [];
	const seen = new Set();
	function visit(node) {
		if (
			ts.isIdentifier(node) &&
			node.text !== pageName &&
			referenceNames.has(node.text) &&
			!seen.has(node.text)
		) {
			seen.add(node.text);
			references.push(node.text);
		}
		ts.forEachChild(node, visit);
	}
	visit(declaration);
	return references;
}

/** @param {string[]} directReferences @param {Set<string>} linkedNames */
function renderRelatedDeclarations(directReferences, linkedNames) {
	const related = directReferences.filter((name) => !linkedNames.has(name));
	if (!related.length) return "";
	return [
		"## Related declarations",
		"",
		...related.map((name) => `- [\`${name}\`](${name}.md)`),
		"",
	].join("\n");
}

/** @param {string} cell */
function escapeMdTableCell(cell) {
	return cell.replace(/\|/g, "\\|").replace(/\n/g, " ");
}

const tsPrinter = ts.createPrinter({
	newLine: ts.NewLineKind.LineFeed,
	removeComments: true,
});

/** @param {import('typescript').Node} node @param {import('typescript').SourceFile} sf */
function printTypeScript(node, sf) {
	return tsPrinter.printNode(ts.EmitHint.Unspecified, node, sf).trimEnd();
}

/** @param {string} code */
function typescriptFence(code) {
	return ["## Signature", "", "```typescript", code, "```", ""].join("\n");
}

/**
 * @param {import('typescript').TypeNode | undefined} node
 * @param {import('typescript').SourceFile} sf
 * @param {Set<string>} referenceNames
 * @param {string} pageName
 * @param {Set<string>} linkedNames
 */
function formatTypeForTable(node, sf, referenceNames, pageName, linkedNames) {
	const inline = formatTypeInline(node, sf);
	return linkTypeExpression(
		inline,
		referenceNames,
		pageName,
		linkedNames,
		true,
	);
}

/**
 * @param {string} name
 * @param {import('typescript').InterfaceDeclaration} decl
 * @param {import('typescript').SourceFile} sf
 * @param {Set<string>} referenceNames
 * @param {string[]} directReferences
 */
function renderInterfacePage(name, decl, sf, referenceNames, directReferences) {
	const lines = [];
	const details = [];
	const linkedNames = new Set();
	const summary = getJsDocSummary(decl, sf);
	if (summary) {
		lines.push(summary, "");
	}

	const heritage = decl.heritageClauses ?? [];
	if (heritage.length) {
		const parts = heritage.map((clause) => {
			const kind =
				clause.token === ts.SyntaxKind.ExtendsKeyword ?
					"extends"
				:	"implements";
			const types = clause.types
				.map((t) =>
					linkTypeExpression(
						t.getText(sf),
						referenceNames,
						name,
						linkedNames,
					),
				)
				.join(", ");
			return `**${kind}** ${types}`;
		});
		lines.push(parts.join(" · "), "");
	}

	const props = decl.members.filter(
		(m) => ts.isPropertySignature(m) || ts.isMethodSignature(m),
	);
	if (props.length) {
		details.push(
			"## Members",
			"",
			"| Name | Type | Required | Description |",
			"|------|------|----------|-------------|",
		);
		for (const member of props) {
			const memberName = member.name?.getText(sf) ?? "-";
			const required = member.questionToken ? "no" : "yes";
			let typeStr = "-";
			if (ts.isPropertySignature(member)) {
				typeStr = formatTypeForTable(
					member.type,
					sf,
					referenceNames,
					name,
					linkedNames,
				);
			} else if (ts.isMethodSignature(member)) {
				const params = member.parameters
					.map((p) => {
						const opt = p.questionToken ? "?" : "";
						return `${p.name.getText(sf)}${opt}: ${formatTypeInline(p.type, sf)}`;
					})
					.join(", ");
				typeStr = linkTypeExpression(
					`(${params}) => ${formatTypeInline(member.type, sf)}`,
					referenceNames,
					name,
					linkedNames,
					true,
				);
			}
			const desc = escapeMdTableCell(getMemberDescription(member, sf));
			details.push(
				`| \`${memberName}\` | ${typeStr} | ${required} | ${desc || "-"} |`,
			);
		}
		details.push("");
	}

	const indexSig = decl.members.find((m) =>
		ts.isIndexSignatureDeclaration(m),
	);
	if (indexSig && ts.isIndexSignatureDeclaration(indexSig)) {
		details.push(
			"## Index signature",
			"",
			linkTypeExpression(
				`[key: ${indexSig.parameters[0]?.name.getText(sf)}: ${formatTypeInline(indexSig.parameters[0]?.type, sf)}]: ${formatTypeInline(indexSig.type, sf)}`,
				referenceNames,
				name,
				linkedNames,
			),
			"",
		);
	}

	lines.push(typescriptFence(printTypeScript(decl, sf)));
	const related = renderRelatedDeclarations(directReferences, linkedNames);
	if (related) lines.push(related);
	lines.push(...details);

	return lines.join("\n");
}

/**
 * @param {string} name
 * @param {import('typescript').TypeAliasDeclaration} decl
 * @param {import('typescript').SourceFile} sf
 * @param {string[]} directReferences
 */
function renderTypeAliasPage(name, decl, sf, directReferences) {
	const lines = [];
	const summary = getJsDocSummary(decl, sf);
	if (summary) {
		lines.push(summary, "");
	}

	lines.push(typescriptFence(printTypeScript(decl, sf)));
	const related = renderRelatedDeclarations(directReferences, new Set());
	if (related) lines.push(related);

	if (ts.isUnionTypeNode(decl.type)) {
		const stringLiterals = decl.type.types
			.filter(
				(t) => ts.isLiteralTypeNode(t) && ts.isStringLiteral(t.literal),
			)
			.map((t) => t.literal.getText(sf));
		if (stringLiterals.length >= 3) {
			lines.push("## Union members", "");
			for (const lit of stringLiterals) {
				lines.push(`- \`${lit.replace(/^"|"$/g, "")}\``);
			}
			lines.push("");
		}
	}

	return lines.join("\n");
}

/** @param {import('typescript').Statement} stmt @param {import('typescript').SourceFile} sf @param {Set<string>} allowlist @param {Map<string, any>} found */
function indexStatement(stmt, sf, allowlist, found, owners) {
	let name;
	let kind;
	if (ts.isInterfaceDeclaration(stmt)) {
		name = stmt.name.text;
		kind = "interface";
	} else if (ts.isTypeAliasDeclaration(stmt)) {
		name = stmt.name.text;
		kind = "type";
	} else if (ts.isClassDeclaration(stmt) && stmt.name) {
		name = stmt.name.text;
		kind = "class";
	} else if (ts.isFunctionDeclaration(stmt) && stmt.name) {
		name = stmt.name.text;
		kind = "function";
	} else if (
		ts.isVariableStatement(stmt) &&
		stmt.declarationList.declarations.length === 1 &&
		ts.isIdentifier(stmt.declarationList.declarations[0].name)
	) {
		name = stmt.declarationList.declarations[0].name.text;
		kind = "constant";
	}
	if (!name || !allowlist.has(name)) return;
	const previousOwner = owners.get(name);
	if (previousOwner) {
		throw new Error(
			`generate-type-references: duplicate declaration ownership for ${name}: ${previousOwner} and ${sf.fileName}`,
		);
	}
	owners.set(name, sf.fileName);
	found.set(name, { kind, decl: stmt, sf });
}

/** @param {Map<string, string>} sources @param {Set<string>} allowlist */
function collectDeclarations(sources, allowlist) {
	/** @type {Map<string, { kind: 'interface' | 'type'; decl: import('typescript').InterfaceDeclaration | import('typescript').TypeAliasDeclaration; sf: import('typescript').SourceFile }>} */
	const found = new Map();
	const owners = new Map();

	for (const [fileName, content] of sources) {
		const sf = ts.createSourceFile(
			fileName,
			content,
			ts.ScriptTarget.Latest,
			true,
			fileName.endsWith(".ts") ? ts.ScriptKind.TS : ts.ScriptKind.TS,
		);

		for (const stmt of sf.statements) {
			if (
				ts.isModuleDeclaration(stmt) &&
				stmt.body &&
				ts.isModuleBlock(stmt.body)
			) {
				for (const inner of stmt.body.statements) {
					indexStatement(inner, sf, allowlist, found, owners);
				}
				continue;
			}
			indexStatement(stmt, sf, allowlist, found, owners);
		}
	}

	return found;
}

function pageContent(entry, body, order) {
	return [
		"---",
		`title: ${JSON.stringify(entry.name)}`,
		`description: ${JSON.stringify(`TypeScript signature and members for the ${entry.name} public SDK declaration.`)}`,
		"ai_disclosure: true",
		`order: ${order}`,
		"aliases:",
		`  - ${entry.alias}`,
		"---",
		"",
		`# ${entry.name}`,
		"",
		`**Since Plugin API:** \`${entry.sincePluginApiVersion}\``,
		"",
		body,
	].join("\n");
}

function main() {
	const entries = referenceEntries();
	const seenCategoryOwnership = new Map();
	for (const entry of entries) {
		const previous = seenCategoryOwnership.get(entry.name);
		if (previous) {
			throw new Error(
				`generate-type-references: duplicate category ownership for ${entry.name}: ${previous} and ${entry.categoryId}`,
			);
		}
		seenCategoryOwnership.set(entry.name, entry.categoryId);
	}
	const allowlist = new Set(entries.map((entry) => entry.name));
	const sources = loadTypeReferenceSources();
	const found = collectDeclarations(sources, allowlist);

	const missing = [...allowlist].filter((t) => !found.has(t));
	if (missing.length) {
		throw new Error(
			`generate-type-references: ${missing.length} manifest declaration(s) not found in sources: ${missing.join(", ")}`,
		);
	}

	/** @type {Record<string, string>} */
	const linkMap = {};
	for (const entry of entries) {
		linkMap[entry.name] = `reference/sdk-type-reference/${entry.name}`;
	}

	const output = new Map();
	let pageCount = 0;
	for (const [index, manifestEntry] of [...entries]
		.sort((a, b) => a.name.localeCompare(b.name))
		.entries()) {
		const declaration = found.get(manifestEntry.name);
		const directReferences = collectDirectReferences(
			declaration.decl,
			allowlist,
			manifestEntry.name,
		);

		const body =
			declaration.kind === "interface" ?
				renderInterfacePage(
					manifestEntry.name,
					declaration.decl,
					declaration.sf,
					allowlist,
					directReferences,
				)
			: declaration.kind === "type" ?
				renderTypeAliasPage(
					manifestEntry.name,
					declaration.decl,
					declaration.sf,
					directReferences,
				)
			:	[
					getJsDocSummary(declaration.decl, declaration.sf),
					typescriptFence(
						printTypeScript(declaration.decl, declaration.sf),
					),
					renderRelatedDeclarations(directReferences, new Set()),
				]
					.filter(Boolean)
					.join("\n\n");

		output.set(
			`${manifestEntry.name}.md`,
			pageContent(manifestEntry, body, index + 1),
		);
		pageCount++;
	}

	const landing = [
		"---",
		'title: "SDK type reference"',
		'description: "Look up generated TypeScript signatures and members from the current public SDK."',
		"ai_disclosure: true",
		"aliases:",
		"  - references",
		"---",
		"",
		"# SDK type reference",
		"",
		`This machine-owned reference is generated from the curated Plugin API \`${PLUGIN_API_VERSION}\` declaration graph synchronized with the plugin starter.`,
		"",
		"Use the workflow guides for permissions, lifecycle consequences, and complete examples. Every declaration below has one canonical page and one owning category.",
		"",
	];
	for (const category of PUBLIC_REFERENCE_CATEGORIES) {
		landing.push(`## ${category.title}`, "");
		for (const entry of category.entries) {
			landing.push(`- [\`${entry.name}\`](${entry.name}.md)`);
		}
		landing.push("");
	}
	output.set("index.md", landing.join("\n"));
	const indexJson =
		fs.existsSync(path.join(OUT_DIR, "index.json")) ?
			fs.readFileSync(path.join(OUT_DIR, "index.json"), "utf8")
		:	JSON.stringify(
				{
					title: "SDK type reference",
					order: 4,
					icon: "phoundry-mono:square-brackets",
				},
				null,
				"\t",
			) + "\n";
	output.set("index.json", indexJson);

	const manifestProjection = {
		pluginApiVersion: PLUGIN_API_VERSION,
		categories: PUBLIC_REFERENCE_CATEGORIES.map((category) => ({
			id: category.id,
			title: category.title,
			types: category.entries.map((entry) => entry.name),
			entries: category.entries,
		})),
	};
	fs.writeFileSync(
		MANIFEST_PROJECTION_PATH,
		JSON.stringify(manifestProjection, null, "\t") + "\n",
		"utf8",
	);
	fs.writeFileSync(
		LINK_MAP_PATH,
		JSON.stringify(linkMap, null, "\t") + "\n",
		"utf8",
	);
	writeDirectoryAtomically(OUT_DIR, output);

	console.log(
		`generate-type-references: wrote ${pageCount} pages → ${OUT_DIR}`,
	);
}

if (process.argv[1] && path.resolve(process.argv[1]) === scriptPath) {
	main();
}
