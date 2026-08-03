import type { ParamMatcher } from '@sveltejs/kit';

const SETS = new Set(['phials', 'phials-developer', 'phoundry-ui']);

export const match: ParamMatcher = (param) => SETS.has(param);

