---
title: "compareSemver"
description: "TypeScript signature and members for the compareSemver public SDK declaration."
ai_disclosure: true
order: 12
aliases:
  - references/compareSemver
---

# compareSemver

**Since Plugin API:** `1.0.0`

Compare two semver versions
Returns: -1 if a &lt; b, 0 if a == b, 1 if a &gt; b

## Signature

```typescript
export function compareSemver(a: string, b: string): number {
    if (!validateSemver(a) || !validateSemver(b)) {
        throw new Error("compareSemver requires valid SemVer values");
    }
    const parseVersion = (value: string) => {
        const match = SEMVER_PATTERN.exec(value)!;
        return {
            core: [Number(match[1]), Number(match[2]), Number(match[3])],
            pre: match[4]?.split(".") ?? [],
        };
    };
    const left = parseVersion(a);
    const right = parseVersion(b);
    for (let i = 0; i < 3; i++) {
        const aVal = left.core[i] ?? 0;
        const bVal = right.core[i] ?? 0;
        if (aVal < bVal)
            return -1;
        if (aVal > bVal)
            return 1;
    }
    if (left.pre.length === 0 && right.pre.length === 0)
        return 0;
    if (left.pre.length === 0)
        return 1;
    if (right.pre.length === 0)
        return -1;
    for (let i = 0; i < Math.max(left.pre.length, right.pre.length); i++) {
        const aPart = left.pre[i];
        const bPart = right.pre[i];
        if (aPart === undefined)
            return -1;
        if (bPart === undefined)
            return 1;
        if (aPart === bPart)
            continue;
        const aNumeric = /^\d+$/.test(aPart);
        const bNumeric = /^\d+$/.test(bPart);
        if (aNumeric && bNumeric) {
            return Number(aPart) < Number(bPart) ? -1 : 1;
        }
        if (aNumeric !== bNumeric)
            return aNumeric ? -1 : 1;
        return aPart < bPart ? -1 : 1;
    }
    return 0;
}
```


## Related declarations

- [`validateSemver`](validateSemver.md)
