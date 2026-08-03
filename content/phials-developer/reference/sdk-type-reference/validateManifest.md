---
title: "validateManifest"
description: "TypeScript signature and members for the validateManifest public SDK declaration."
ai_disclosure: true
order: 134
aliases:
  - references/validateManifest
---

# validateManifest

**Since Plugin API:** `1.0.0`

Validate a plugin manifest

## Signature

```typescript
export function validateManifest(manifest: unknown): ValidationResult {
    const errors: string[] = [];
    if (!manifest || typeof manifest !== "object") {
        return { valid: false, errors: ["Manifest must be an object"] };
    }
    const m = manifest as Record<string, unknown>;
    const unknownFields = Object.keys(m).filter((field) => !MANIFEST_FIELDS.has(field));
    if (unknownFields.length > 0) {
        errors.push(`Unknown manifest field(s): ${unknownFields.join(", ")}`);
    }
    if (typeof m.id !== "string" || !m.id.trim()) {
        errors.push('Missing or invalid "id" field');
    }
    else if (!validatePluginId(m.id)) {
        errors.push('Invalid or reserved "id". Use lowercase vendor.plugin-name and do not use the "phials." namespace');
    }
    if (typeof m.name !== "string" || !m.name.trim()) {
        errors.push('Missing or invalid "name" field');
    }
    if (typeof m.version !== "string" || !m.version.trim()) {
        errors.push('Missing or invalid "version" field');
    }
    else if (!validateSemver(m.version)) {
        errors.push('Invalid "version" format. Must be semver (e.g., "1.0.0")');
    }
    if (typeof m.minAppVersion !== "string" || !m.minAppVersion.trim()) {
        errors.push('Missing or invalid "minAppVersion" field');
    }
    else if (!validateSemver(m.minAppVersion)) {
        errors.push('Invalid "minAppVersion" format. Must be semver (e.g., "0.1.0")');
    }
    if (typeof m.pluginApiVersion !== "string" || !m.pluginApiVersion.trim()) {
        errors.push('Missing or invalid "pluginApiVersion" field');
    }
    else if (m.pluginApiVersion !== SUPPORTED_PLUGIN_API_VERSION) {
        errors.push(`Invalid "pluginApiVersion": expected exactly "${SUPPORTED_PLUGIN_API_VERSION}"`);
    }
    if (typeof m.author !== "string" || !m.author.trim()) {
        errors.push('Missing or invalid "author" field');
    }
    if (typeof m.description !== "string" || !m.description.trim()) {
        errors.push('Missing or invalid "description" field');
    }
    for (const field of ["authorUrl", "repository"] as const) {
        const value = m[field];
        if (value === undefined)
            continue;
        if (typeof value !== "string" || !value.trim()) {
            errors.push(`Invalid "${field}" field - must be a non-empty HTTPS URL`);
            continue;
        }
        try {
            const url = new URL(value);
            if (url.protocol !== "https:" || url.username || url.password) {
                errors.push(`Invalid "${field}" field - must be a public HTTPS URL`);
            }
        }
        catch {
            errors.push(`Invalid "${field}" field - must be a public HTTPS URL`);
        }
    }
    if (m.icons !== undefined) {
        if (!Array.isArray(m.icons)) {
            errors.push('Invalid "icons" field - must be an array');
        }
        else {
            const seen = new Set<string>();
            for (const icon of m.icons) {
                if (typeof icon !== "string" ||
                    !icon.trim() ||
                    !ICONIFY_ICON_PATTERN.test(icon)) {
                    errors.push(`Invalid icon: "${String(icon)}"`);
                }
                else if (seen.has(icon)) {
                    errors.push(`Duplicate icon: "${icon}"`);
                }
                else {
                    seen.add(icon);
                }
            }
        }
    }
    if (m.permissions !== undefined) {
        if (!Array.isArray(m.permissions)) {
            errors.push('Invalid "permissions" field - must be an array');
        }
        else {
            const seen = new Set<PluginPermission>();
            for (const p of m.permissions) {
                if (!VALID_PERMISSIONS.has(p as PluginPermission)) {
                    errors.push(`Invalid permission: "${p}"`);
                }
                else if (seen.has(p as PluginPermission)) {
                    errors.push(`Duplicate permission: "${p}"`);
                }
                else {
                    seen.add(p as PluginPermission);
                }
            }
            for (const [write, read] of IMPLIED_PERMISSION_PAIRS) {
                if (seen.has(write) && seen.has(read)) {
                    errors.push(`Redundant permissions: "${write}" already implies "${read}"`);
                }
            }
        }
    }
    return { valid: errors.length === 0, errors };
}
```


## Related declarations

- [`ValidationResult`](ValidationResult.md)
- [`validatePluginId`](validatePluginId.md)
- [`validateSemver`](validateSemver.md)
- [`SUPPORTED_PLUGIN_API_VERSION`](SUPPORTED_PLUGIN_API_VERSION.md)
- [`PluginPermission`](PluginPermission.md)
