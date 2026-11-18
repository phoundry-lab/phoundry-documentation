import generated from "../generated/ui-api.json";

export interface ApiRow {
	name: string;
	type: string;
	required?: boolean;
	default?: string;
	bindable?: boolean;
	description?: string;
}
export interface ApiEntry {
	kind: string;
	source: string;
	description?: string;
	signature?: string;
	rows: ApiRow[];
	values?: string[];
}
export const uiApi = generated as unknown as {
	package: string;
	version: string;
	api: Record<string, ApiEntry>;
};

export function selectApiRows(
	symbol: string,
	include?: string[],
	exclude: string[] = [],
) {
	const entry = uiApi.api[symbol];
	if (!entry) throw new Error(`Unknown UI API declaration: ${symbol}`);
	const rows = entry.rows;
	const selection = include
		? include.map((name) => {
				const row = rows.find((item) => item.name === name);
				if (!row)
					throw new Error(
						`Unknown member ${symbol}.${name}; update the article or library input.`,
					);
				return row;
			})
		: rows;
	return {
		entry,
		rows: selection.filter((row) => !exclude.includes(row.name)),
	};
}

/** Descriptions support inline code and emphasis; escape all other HTML. */
export function inlineDescription(value: string) {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replace(/&lt;code&gt;([\s\S]*?)&lt;\/code&gt;/g, "<code>$1</code>")
		.replace(/`([^`]+)`/g, "<code>$1</code>")
		.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}
