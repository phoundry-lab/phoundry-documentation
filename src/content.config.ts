import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { i18nLoader } from "@astrojs/starlight/loaders";
import { docsSchema, i18nSchema } from "@astrojs/starlight/schema";
import { z } from "astro/zod";

export const collections = {
	docs: defineCollection({
		// One loader watches canonical articles and the small site-only hub together.
		loader: glob({
			base: ".",
			pattern: [
				"content/{phials,phials-developer,phoundry-ui}/**/[^_]*.{md,mdx}",
				"src/content/docs/*.{md,mdx}",
			],
			generateId: ({ entry }) =>
				entry
					.replace(/^(content\/|src\/content\/docs\/)/, "")
					.replace(/\.(md|mdx)$/, "")
					.replace(/\/(index|README)$/i, ""),
		}),
		schema: docsSchema({
			extend: z.object({
				order: z.number().optional(),
				hidden: z.boolean().optional(),
				ai_disclosure: z.boolean().optional(),
				status: z.literal("experimental").optional(),
				aliases: z.array(z.string()).optional(),
				icon: z.string().optional(),
			}),
		}),
	}),
	i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
};
