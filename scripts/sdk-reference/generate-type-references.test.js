import { describe, expect, it } from "vitest";
import { sanitizeProseForMdsvex } from "./generate-type-references.mjs";

describe("generated type-reference prose", () => {
	it("escapes comparison operators before mdsvex compiles the page", () => {
		expect(
			sanitizeProseForMdsvex(
				"Returns: -1 if a < b, 0 if a == b, 1 if a > b",
			),
		).toBe("Returns: -1 if a &lt; b, 0 if a == b, 1 if a &gt; b");
	});
});
