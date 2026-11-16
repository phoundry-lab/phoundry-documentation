import fs from "node:fs";
import path from "node:path";
import { SDK_ROOT } from "./sdk-reference-sources.mjs";

const projection = JSON.parse(
  fs.readFileSync(path.join(SDK_ROOT, "reference-manifest.json"), "utf8"),
);

export const PLUGIN_API_VERSION = projection.pluginApiVersion;
export const PUBLIC_REFERENCE_CATEGORIES = projection.categories.map(
  (category) => ({
    id: category.id,
    title: category.title,
    entries: category.entries,
  }),
);
export function referenceEntries() {
  return PUBLIC_REFERENCE_CATEGORIES.flatMap((category) =>
    category.entries.map((entry) => ({
      ...entry,
      categoryId: category.id,
      categoryTitle: category.title,
    })),
  );
}
