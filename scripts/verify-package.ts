import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import matter from "gray-matter";
import source from "../src/lib/generated/manifest.json" with { type: "json" };
import type { DocSet } from "../src/lib/docs/types";

const artifact = await import(
	pathToFileURL(path.resolve("dist-package/index.js")).href
);
assert.deepEqual(Object.keys(artifact.manifest).sort(), [
	"phials",
	"phials-developer",
]);
let count = 0;
for (const setId of ["phials", "phials-developer"] as const) {
	const set = source[setId] as unknown as DocSet;
	assert.deepEqual(artifact.manifest[setId], set);
	for (const page of Object.values(set.pagesBySlug)) {
		const expected = matter(
			fs.readFileSync(page.filePath, "utf8"),
		).content.replace(/^\s+/, "");
		const loaded = await artifact.loadPage(setId, page.slug);
		assert.equal(
			loaded.markdown,
			expected,
			`Offline article mismatch: ${setId}/${page.slug}`,
		);
		count++;
	}
}
await assert.rejects(
	artifact.loadPage("phoundry-ui", ""),
	/Unknown documentation page/,
);
await assert.rejects(
	artifact.loadPage("phials", "missing-article"),
	/Unknown documentation page/,
);
const packageJson = JSON.parse(
	fs.readFileSync("dist-package/package.json", "utf8"),
);
assert.equal(packageJson.dependencies, undefined);
console.log(
	`Verified ${count} lazy offline articles, manifest/alias parity, invalid-page handling, and a framework-independent package.`,
);
