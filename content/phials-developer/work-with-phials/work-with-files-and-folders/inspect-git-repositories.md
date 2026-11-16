---
title: "Inspect Git repositories"
description: "Read repository status, patches, history, branches, and committed text through the captured Host."
ai_disclosure: true
order: 7
---

# Inspect Git repositories

Use `api.git` for read-only repository inspection. SDK package `@phoundry/phials-plugin-sdk@3.1.0` adds `status`, `diff`, `log`, `listBranches`, and `readBlob` alongside `getInfo` and `getLanguages`. The manifest's `pluginApiVersion` remains `"3.0.0"`; the SDK package version is not the runtime compatibility number.

All Git methods require approved [`filesystem.read`](../../reference/manifest-and-permissions-reference/plugin-permission-reference.md#filesystemread), or its implied reads from `filesystem.write`. A read-only plugin should request only:

```json
{
  "permissions": ["filesystem.read"]
}
```

Repository operations run on the API's **captured Host**, not whichever Host becomes active later. Git CLI operations require Git installed and available to Phials on that Host. A local Git installation does not supply Git for a remote Host. Keep the API and the path's originating Host together; see [Understand runtime API scopes](../use-app-and-explorer-context/understand-runtime-api-scopes.md).

This is not a Git command runner. The API does not expose staging, commits, checkout, branch creation, fetch, pull, push, or other write or network Git operations. Reading an upstream or remote URL does not contact that remote.

## Start from an Explorer location

Use a real Host filesystem path from public context, not an invented `api.context` field or a browser URL. For example, this helper inspects the active Explorer pane using `PluginPaneContext.navigation.currentPath`:

```ts
async function inspectActiveRepository(api: PluginAPI) {
  const pane = api.explorer.getActivePane();
  const path = pane?.navigation.currentPath;
  if (!path) return null;

  // Use the API supplied for this Host-scoped feature invocation.
  const info = await api.git.getInfo(path);
  if (!info) return null;

  const files = await api.git.status(info.rootPath);
  const commits = await api.git.log(info.rootPath, { limit: 20, skip: 0 });
  const branches = await api.git.listBranches(info.rootPath);
  const patch = await api.git.diff(info.rootPath);

  return { info, files, commits, branches, patch };
}
```

Call this from an async feature handler with error handling, and present failures rather than reporting an empty or clean repository. Capture the path before awaiting; do not later substitute a path from another pane or Host into the retained API. For a pane-bound feature, use the pane supplied to that feature instead of reacquiring the active pane.

The `path` argument identifies an existing file or directory inside a repository. `getInfo` discovers the containing worktree root, including linked worktrees whose `.git` is a file. It returns `null` for a location outside a repository; missing locations, unavailable Git, permission failures, and command failures can reject. `status`, `diff`, `log`, `listBranches`, and `readBlob` reject when the location is not in a repository.

## Choose a query

| Method | Result and behavior |
| --- | --- |
| `getInfo(path)` | [GitInfo](../../reference/sdk-type-reference/GitInfo.md) or `null`. `rootPath` is the discovered worktree root, not the supplied subdirectory. `branch` is `null` for detached HEAD and `detached` identifies that state. `dirty` includes staged, worktree, and untracked changes. `ahead` and `behind` compare HEAD with its configured upstream using locally available refs; both are zero when no upstream is configured or HEAD is detached. `remoteUrl` is the configured origin URL with credentials sanitized, or `null`. |
| `getLanguages(path)` | Language summaries with `language`, `bytes`, and `share` (a fraction, not a percentage). This is a repository-language projection, not commit history. |
| `status(path)` | `GitFileStatus[]`, including untracked files. `path` is repository-relative; `originalPath` carries the source for a rename/copy, otherwise `null`. `indexStatus` and `worktreeStatus` are Git porcelain XY codes: a space means unchanged, and `?` means untracked. Do not interpret the strings as booleans. |
| `diff(path, options?)` | Unified patch for tracked changes. Default `staged: false` compares the worktree with the index; `staged: true` compares staged changes with HEAD. Omit `file` for all tracked files. Untracked file content is not included. Binary changes are described, not decoded; external diff and text-conversion helpers are disabled. |
| `log(path, options?)` | HEAD history, newest first. Each [GitCommit](../../reference/sdk-type-reference/GitCommit.md) has `oid`, `parents`, `authorName`, `authorEmail`, `authoredAt` (ISO author date), and `subject`. An unborn branch returns an empty list. Defaults: `limit: 50`, `skip: 0`. |
| `listBranches(path)` | Local branches with `name`, `oid`, `current`, and configured `upstream` or `null`. Remote-tracking branches are not separate rows. In detached HEAD, no local branch is marked current. |
| `readBlob(path, revision, file)` | NUL-free UTF-8 text from a file at a verified commit revision. This reads committed content, not the index or worktree. Missing objects/files, non-UTF-8 data, NUL-containing content, or a revision that does not resolve to a commit reject. |

These are independent reads, not one atomic repository snapshot. Files, branches, and refs may change between calls. Ahead/behind counts describe local knowledge of the upstream; they are not a claim that the remote server is up to date.

## Keep repository-relative file paths distinct

The outer `path` uses the Host's filesystem path syntax. In contrast, `diff`'s `file` option and `readBlob`'s `file` argument must be **literal repository-relative paths using forward slashes**, even on Windows. They are relative to `info.rootPath`, not the subdirectory used to discover the repository.

```ts
async function readCommittedText(
  api: PluginAPI,
  repositoryPath: string,
  commitOid: string,
  repositoryRelativeFile: string,
) {
  const stagedPatch = await api.git.diff(repositoryPath, {
    staged: true,
    file: repositoryRelativeFile,
  });
  const committedText = await api.git.readBlob(
    repositoryPath,
    commitOid,
    repositoryRelativeFile,
  );
  return { stagedPatch, committedText };
}
```

For example, pass a commit `oid` from `log` and a tracked `path` from `status`. A file added after that commit or renamed since then may not exist at the selected revision; handle that failure. Use `originalPath` when the earlier commit contains the pre-rename name.

Do not use `api.files.joinPath` to construct these Git file arguments: it produces Host filesystem paths, not the Git API's portable relative format. Empty paths, absolute paths, drive prefixes, backslashes, NULs, and `..` traversal are rejected. Glob patterns and Git pathspec syntax are not expanded: `src/*.ts` names a literal path rather than selecting all TypeScript files. Do not shell-quote or escape arguments yourself.

## Bound work and handle failures

- Each Git subprocess has a **15-second timeout**, **8 MiB stdout cap**, and **64 KiB stderr cap**. A single API method can run several subprocesses; 15 seconds is not a total per-method deadline.
- Exceeding a cap or timeout rejects. Results are never silently truncated, including patches and blobs.
- `log` accepts nonnegative integer `limit` values up to **500** and `skip` values up to **1,000,000**. `limit: 0` returns no commits. Request small pages and advance `skip`; concurrent repository changes can shift pagination.
- `readBlob` is text-only and subject to the output cap. It is not a general binary or large-object reader.
- Git can reject because it is missing, a repository is inaccessible, an upstream cannot be resolved, or output is invalid. An error is not equivalent to a clean worktree, zero divergence, or missing history.

Choose bounded queries in response to user actions. Filter large diffs to one literal file and page history instead of repeatedly requesting the largest allowed result. Never fall back to raw host commands to bypass a failure or permission check.

## SDK reference

- [GitAPI](../../reference/sdk-type-reference/GitAPI.md)
- [GitInfo](../../reference/sdk-type-reference/GitInfo.md)
- [PluginPaneContext](../../reference/sdk-type-reference/PluginPaneContext.md)
