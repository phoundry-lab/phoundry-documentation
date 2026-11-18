import { describe, expect, it } from "vitest";
import fs from "node:fs";
import { selectApiRows, uiApi } from "../src/lib/ui/api";
const library = JSON.parse(
	fs.readFileSync("node_modules/phoundry-ui/package.json", "utf8"),
) as { version: string };

describe("UI API extraction and editorial selection", () => {
	it("uses the installed example library and extracts required, default, and bindable facts", () => {
		expect(uiApi.version).toBe(library.version);
		const { rows } = selectApiRows("Checkbox", [
			"checked",
			"disabled",
			"element",
		]);
		expect(rows.map((row) => row.name)).toEqual([
			"checked",
			"disabled",
			"element",
		]);
		expect(rows[0]).toMatchObject({ type: "boolean", required: true });
		expect(rows[1]).toMatchObject({ default: "false", required: false });
		expect(rows[2]).toMatchObject({ bindable: true });
	});
	it("resolves generic component props and inherited API members", () => {
		expect(selectApiRows("Select", ["value"]).rows[0]?.type).toContain("T");
		expect(
			selectApiRows("ComboboxOptions", ["options", "api"]).rows.map(
				(row) => row.name,
			),
		).toEqual(["options", "api"]);
		expect(
			selectApiRows("ThemeDefinition", ["id", "cssUrl"]).rows.map(
				(row) => row.name,
			),
		).toEqual(["id", "cssUrl"]);
	});
	it("keeps private implementation fields out of public return-value tables", () => {
		const { rows } = selectApiRows("getThemeManager.return");
		expect(rows.some((row) => row.name.startsWith("#"))).toBe(false);
		expect(rows.some((row) => row.name === "apply")).toBe(true);
	});
	it("supports article-specific ordering and rejects stale or misspelled members", () => {
		expect(
			selectApiRows("Checkbox", ["disabled", "checked"], ["disabled"]).rows.map(
				(row) => row.name,
			),
		).toEqual(["checked"]);
		expect(() => selectApiRows("Checkbox", ["missingProp"])).toThrow(
			"Unknown member Checkbox.missingProp",
		);
		expect(() => selectApiRows("UnknownComponent")).toThrow(
			"Unknown UI API declaration",
		);
	});
});
