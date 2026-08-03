---
title: "Search pattern syntax"
description: "Compare Simple, Glob, and Regex matching for names and readable file contents."
icon: phoundry-mono:sliders
order: 1
aliases:
  - advanced/advanced-search
ai_disclosure: true
---

# Search pattern syntax

Search first chooses a target, then interprets the query using the selected mode. A query must contain at least one non-space character. Leading and trailing spaces are otherwise part of the query.

For the steps to run and scope a search, see [Search filenames and file contents](../../browse-and-manage-files/find-and-narrow-files/search-filenames-and-file-contents.md).

## Mode and target support

| Mode | Names | Content | Match rule |
| --- | --- | --- | --- |
| **Simple** | Yes | Yes | Literal substring |
| **Glob** | Yes | No | Shell-style pattern matched against the whole filename |
| **Regex** | Yes | No in the current Search controls | Rust-style regular expression matched anywhere unless anchored |

Name matching uses only the item's filename, not its parent folders or full path. A pattern such as `reports/*.pdf` therefore does not match a file by location. Enable recursive search to include subfolders, then match the filename itself.

Content matching searches readable files and skips folders and files detected as binary. A matching result includes the first matching line as its preview. Glob is not valid for Content; the current Search controls also make Regex unavailable for Content.

## Simple

Simple treats every character literally and finds the query anywhere in the selected target. It does not have wildcard or escape syntax.

| Query | Example match | Reason |
| --- | --- | --- |
| `invoice` | `Invoice 2026.pdf` | Default matching ignores letter case. |
| `.tar.gz` | `backup.tar.gz` | Periods are literal. |
| `report*` | `report*-notes.md` | `*` is literal in Simple mode. |
| ` two ` | A content line containing ` two ` | Spaces are significant. |

Use Simple when the query should be treated as ordinary text, especially for Content.

## Glob

Glob matches the complete filename. Add `*` before or after a fragment when the rest of the filename may vary.

| Syntax | Meaning | Example |
| --- | --- | --- |
| `*` | Zero or more characters | `*.pdf` matches `notes.pdf`. |
| `?` | Exactly one character | `report-?.md` matches `report-1.md`. |
| `[abc]` | One listed character | `draft-[ab].txt` matches `draft-a.txt`. |
| `[0-9]` | One character in a range | `image-[0-9].png` matches `image-4.png`. |
| `[!abc]` | One character not listed | `[!a]*.txt` matches `brief.txt`, not `about.txt`. |

Glob does not use a backslash to escape its special characters. Put a metacharacter in a bracket expression when it must be literal:

| Literal character | Glob syntax |
| --- | --- |
| `*` | `[*]` |
| `?` | `[?]` |
| `[` | `[[]` |
| `]` | `[]]` |

Leave **Case sensitivity** off for Glob. The current case-sensitive Glob path does not preserve filename case reliably. Use Regex when case-specific filename matching matters.

## Regex

Regex searches for a match anywhere in the filename. Add anchors when the match must occur at an edge.

| Query | Meaning | Example match |
| --- | --- | --- |
| `draft|final` | Either alternative | `report-final.md` |
| `^report` | Starts with `report` | `report-final.md` |
| `\.pdf$` | Ends with literal `.pdf` | `invoice.pdf` |
| `report-(draft|final)\.md` | One grouped alternative | `report-draft.md` |
| `[0-9]{4}` | Four digits | `tax-2026.pdf` |

Escape a Regex metacharacter with `\` when it should be literal. Common metacharacters are `. * + ? ( ) [ ] { } ^ $ | \`. For example, `file\[1\]\.txt` matches `file[1].txt`.

Phials uses Rust-style regular expressions. Look-around assertions and backreferences are not supported.

## Case sensitivity and invalid patterns

Simple and Regex are case-insensitive by default. Enable **Case sensitivity** to compare letter case exactly. Glob has the current limitation described above.

An incomplete or invalid Glob or Regex pattern produces no matches in the current Search row; it does not show a detailed pattern error. If a pattern unexpectedly returns zero results, simplify it or switch to Simple to confirm the literal text first.
