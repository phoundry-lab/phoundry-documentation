---
title: "GitAPI"
description: "TypeScript signature and members for the GitAPI public SDK declaration."
ai_disclosure: true
order: 37
aliases:
  - references/GitAPI
---

# GitAPI

**Since Plugin API:** `1.0.0`

Read-only Git operations on the captured Host; requires filesystem.read and installed Git.
Git CLI commands time out after 15 seconds and reject output larger than 8 MiB;
results are never silently truncated. File arguments use repository-relative forward slashes.

## Signature

```typescript
interface GitAPI {
    getInfo(path: string): Promise<GitInfo | null>;
    getLanguages(path: string): Promise<readonly RepositoryLanguage[]>;
    status(path: string): Promise<readonly GitFileStatus[]>;
    diff(path: string, options?: GitDiffOptions): Promise<string>;
    log(path: string, options?: GitLogOptions): Promise<readonly GitCommit[]>;
    listBranches(path: string): Promise<readonly GitBranch[]>;
    readBlob(path: string, revision: string, file: string): Promise<string>;
}
```

## Members

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `getInfo` | `(path: string) => Promise<`[`GitInfo`](GitInfo.md)` &#124; null>` | yes | Discovers the containing repository, including linked worktrees. |
| `getLanguages` | `(path: string) => Promise<readonly `[`RepositoryLanguage`](RepositoryLanguage.md)`[]>` | yes | - |
| `status` | `(path: string) => Promise<readonly `[`GitFileStatus`](GitFileStatus.md)`[]>` | yes | Repository-relative paths, including untracked files. |
| `diff` | `(path: string, options?: `[`GitDiffOptions`](GitDiffOptions.md)`) => Promise<string>` | yes | Unified patch for tracked files; binary changes are described, not decoded. |
| `log` | `(path: string, options?: `[`GitLogOptions`](GitLogOptions.md)`) => Promise<readonly `[`GitCommit`](GitCommit.md)`[]>` | yes | HEAD history, newest first. Empty for an unborn branch. |
| `listBranches` | `(path: string) => Promise<readonly `[`GitBranch`](GitBranch.md)`[]>` | yes | Local branches and their configured upstreams. |
| `readBlob` | `(path: string, revision: string, file: string) => Promise<string>` | yes | UTF-8 text at a commit revision; rejects NUL-containing content and unsafe paths. |
