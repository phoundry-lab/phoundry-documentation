---
title: "Manifest and permissions reference"
description: "Look up manifest fields, permissions, gated operations, and approved host commands."
ai_disclosure: true
---

# Manifest and permissions reference

Use this reference to check the exact release metadata and permission boundary
for a community plugin.

- [Plugin manifest field reference](./plugin-manifest-field-reference.md) lists
  every accepted manifest field, default, validation rule, and cross-file
  relationship.
- [Plugin permission reference](./plugin-permission-reference.md) lists every
  accepted permission, its review description, risk label, and implication.
- [Permission-gated Plugin API operations](./permission-gated-plugin-api-operations.md)
  maps typed public operations to the permission they require and identifies
  always-available operations.
- [Approved host command reference](./approved-host-command-reference.md) is the
  complete `api.invoke` allowlist, including argument and result shapes.

The manifest schema and command allowlist are strict. An unknown manifest field,
permission name, or host command is unsupported rather than ignored.

Plugin permissions gate supported Plugin API operations and approved host
commands. They do not sandbox community plugin JavaScript. See
[Community plugin trust model](../plugin-contract-and-compatibility/community-plugin-trust-model.md)
for the complete trust boundary.
