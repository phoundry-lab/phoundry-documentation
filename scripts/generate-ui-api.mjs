import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fg from "fast-glob";
import ts from "typescript";
import { analyzeFromFiles, getDefaultAnalyzer } from "svelte-docinfo";
import { generateDocIcons } from "../src/lib/ui/generate-icons.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const library = path.join(root, "node_modules/phoundry-ui");
const packageJson = JSON.parse(
	fs.readFileSync(path.join(library, "package.json"), "utf8"),
);
const components = fg.sync("dist/**/*.svelte", { cwd: library });
const declarations = fg.sync("dist/**/*.d.ts", { cwd: library });
const result = await analyzeFromFiles({
	projectRoot: library,
	tsconfig: false,
	include: ["dist/**/*.svelte", "dist/**/*.d.ts"],
	// Component declaration stubs duplicate the actual .svelte source. Keep rune
	// module declarations such as modal.manager.svelte.d.ts, which have no .svelte.
	exclude: components.map((file) => `${file}.d.ts`),
	sourceOptions: {
		sourcePaths: ["dist"],
		getAnalyzerType: (file) =>
			file.endsWith(".d.ts") ? "typescript" : getDefaultAnalyzer(file),
	},
});

const api = {};
for (const module of result.modules) {
	for (const declaration of module.declarations) {
		const rows =
			declaration.kind === "component"
				? declaration.props.map((prop) => ({
						name: prop.name,
						type: prop.type,
						required: !prop.optional,
						default: prop.defaultValue,
						bindable: prop.bindable,
						description: prop.description,
					}))
				: (declaration.members ?? [])
						.filter(
							(member) =>
								member.name !== "constructor" &&
								!member.modifiers?.includes("protected"),
						)
						.map((member) => ({
							name: member.name,
							type: member.typeSignature,
							required: !member.optional,
							description: member.docComment,
						}));
		const entry = {
			kind: declaration.kind,
			source: module.path,
			signature: declaration.typeSignature,
			description: declaration.docComment?.split("\n\n")[0],
			rows,
		};
		if (declaration.typeInfo?.kind === "union") {
			entry.values = declaration.typeInfo.members
				.filter((member) => member.kind === "literal")
				.map((member) => member.text);
		}
		if (!api[declaration.name] || declaration.kind === "component")
			api[declaration.name] = entry;
	}
}

// TypeScript resolves inherited members, object aliases, function return values,
// and imported types that do not have a standalone member list in docinfo.
const program = ts.createProgram(
	declarations.map((file) => path.join(library, file)),
	{
		module: ts.ModuleKind.Preserve,
		moduleResolution: ts.ModuleResolutionKind.Bundler,
		target: ts.ScriptTarget.ESNext,
		skipLibCheck: true,
		allowJs: true,
	},
);
const checker = program.getTypeChecker();
const flags =
	ts.TypeFormatFlags.NoTruncation |
	ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope;
function rowsForType(type, node) {
	return checker
		.getPropertiesOfType(type)
		.filter(
			(symbol) =>
				!symbol.name.startsWith("__") &&
				!symbol.name.startsWith("#") &&
				!symbol.declarations?.some((declaration) =>
					declaration.modifiers?.some(
						(modifier) =>
							modifier.kind === ts.SyntaxKind.PrivateKeyword ||
							modifier.kind === ts.SyntaxKind.ProtectedKeyword,
					),
				),
		)
		.map((symbol) => {
			const declaration =
				symbol.valueDeclaration ?? symbol.declarations?.[0] ?? node;
			return {
				name: symbol.name,
				type: checker.typeToString(
					checker.getTypeOfSymbolAtLocation(symbol, declaration),
					declaration,
					flags,
				),
				required: !(symbol.flags & ts.SymbolFlags.Optional),
				description: ts.displayPartsToString(
					symbol.getDocumentationComment(checker),
				),
			};
		});
}
for (const file of declarations.filter(
	(name) => !components.some((component) => name === `${component}.d.ts`),
)) {
	const source = program.getSourceFile(path.join(library, file));
	if (!source) continue;
	for (const node of source.statements) {
		if (
			!node.name ||
			!ts.isIdentifier(node.name) ||
			!node.modifiers?.some(
				(modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
			)
		)
			continue;
		const name = node.name.text;
		const symbol = checker.getSymbolAtLocation(node.name);
		if (!symbol) continue;
		if (
			ts.isInterfaceDeclaration(node) ||
			ts.isTypeAliasDeclaration(node) ||
			ts.isClassDeclaration(node)
		) {
			const type = checker.getDeclaredTypeOfSymbol(symbol);
			const rows = rowsForType(type, node);
			if (!api[name])
				api[name] = {
					kind: ts.isClassDeclaration(node) ? "class" : "type",
					source: file.replace(/^dist\//, ""),
					rows,
				};
			else if (rows.length && api[name].kind !== "component")
				api[name].rows = rows;
		} else if (ts.isFunctionDeclaration(node)) {
			const signature = checker.getSignatureFromDeclaration(node);
			if (!signature) continue;
			const returnType = checker.getReturnTypeOfSignature(signature);
			api[`${name}.return`] = {
				kind: "return",
				source: file.replace(/^dist\//, ""),
				rows: rowsForType(returnType, node),
			};
		}
	}
}

const destination = path.join(root, "src/lib/generated/ui-api.json");
const json =
	JSON.stringify(
		{ package: packageJson.name, version: packageJson.version, api },
		null,
		2,
	) + "\n";
fs.mkdirSync(path.dirname(destination), { recursive: true });
if (
	!fs.existsSync(destination) ||
	fs.readFileSync(destination, "utf8") !== json
)
	fs.writeFileSync(destination, json);
console.log(
	`Extracted ${Object.keys(api).length} UI API declarations from ${packageJson.name}@${packageJson.version}.`,
);
generateDocIcons();
