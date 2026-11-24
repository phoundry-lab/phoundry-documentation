import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { buildManifest, sitemapDocPaths } from "./build-manifest.js";
const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../..",
);

describe("Phials documentation manifest v2", () => {
  it("builds the recursive tree and canonical alias map", () => {
    const set = buildManifest(projectRoot).phials!;
    expect(set.schemaVersion).toBe(2);
    expect(set.sections).toHaveLength(6);
    expect(Object.keys(set.pagesBySlug)).toHaveLength(151);
    expect(Object.keys(set.aliasesBySlug)).toHaveLength(44);
    expect(set.aliasesBySlug["basic-use/file-explorer"]).toBe(
      "get-started/phials-basics/the-phials-window",
    );
    expect(set.sections[0]?.sections[0]?.title).toBe("What is Phials?");
  });

  it("keeps aliases out of the sitemap", () => {
    const manifest = buildManifest(projectRoot);
    const paths = sitemapDocPaths(manifest).map((entry) => entry.path);
    expect(paths).toContain(
      "/phials/get-started/phials-basics/the-phials-window",
    );
    expect(paths).not.toContain("/phials/basic-use/file-explorer");
  });

  it("builds the synchronized developer tree with valid canonical links and aliases", () => {
    const set = buildManifest(projectRoot)["phials-developer"]!;
    expect(set.schemaVersion).toBe(2);
    expect(set.sections).toHaveLength(6);
    expect(set.aliasesBySlug["references/ThumbnailProvider"]).toBe(
      "reference/sdk-type-reference/ThumbnailProvider",
    );
    expect(
      set.aliasesBySlug["references/ThumbnailProviderProps"],
    ).toBeUndefined();
    expect(set.aliasesBySlug["plugins/public-api-contract"]).toBe(
      "reference/plugin-contract-and-compatibility/public-sdk-support-contract",
    );
    expect(set.aliasesBySlug.plugins).toBe("");
    expect(
      set.pagesBySlug["reference/sdk-type-reference/PluginAPI"]?.href,
    ).toBe("/phials-developer/reference/sdk-type-reference/PluginAPI");

    for (const page of Object.values(set.pagesBySlug)) {
      const source = fs.readFileSync(page.filePath, "utf8");
      for (const match of source.matchAll(/\]\(([^)]+\.md)(?:#[^)]+)?\)/g)) {
        if (/^[a-z][a-z0-9+.-]*:/i.test(match[1]!)) continue;
        const target = path.resolve(path.dirname(page.filePath), match[1]!);
        expect(fs.existsSync(target), `${page.filePath} -> ${match[1]}`).toBe(
          true,
        );
      }
    }
  });
});
