---
title: "Use the Terminal"
description: "Run and manage shell sessions in a Terminal panel or center tab."
icon: phoundry-mono:settings
order: 1
aliases:
  - customizing/terminal
ai_disclosure: true
---

# Use the Terminal

Run shell commands without leaving Phials. Each Terminal can hold several independent sessions, and you can add more than one Terminal when you need separate groups of sessions.

## Add a Terminal

Open a dock's panel options menu, choose **Add panel**, then choose **Terminal**. Terminal can occupy the left, right, or bottom dock.

You can move Terminal into a center tab group through its tab menu or by dragging it to the center. Moving it preserves its running sessions. For complete placement controls, see [Arrange docks and panels](../arrange-your-window/arrange-docks-and-panels.md).

When a Terminal first opens, it starts a shell in the active Explorer tab's current folder. If no Explorer location is available, it starts in your home folder.

## Work with terminal sessions

Terminal session tabs appear in a vertical strip on the right:

- Choose a session to bring it to the front.
- Choose **New terminal** to start another shell in the Explorer location active at that moment.
- Choose a session's **Close terminal** button, or middle-click the session, to end that shell.

A session label is the name of its starting folder. The label does not change when you use a shell command to move elsewhere.

Closing the last session ends that shell and immediately creates a fresh one, so a Terminal always has at least one session. If a shell exits on its own, the surface reports **Terminal session ended**; close that session when you want a replacement.

## Keep a process running

Hiding or collapsing a dock, switching to another panel, or moving Terminal does not end its processes. Phials keeps recent output in memory and shows it when you return.

Closing or removing a Terminal panel or center tab ends every process owned by that Terminal. This cannot be undone. Move or hide Terminal when you want its commands to keep running; close it only when those processes can stop.

Terminal sessions do not return after you quit Phials. A Terminal restored or added after launch starts with a fresh shell.

## Choose the terminal font

1. Open **Settings**.
2. Under **Plugins**, choose **Panels**.
3. Select **Terminal**.
4. Choose a **Font Family**.

Phials loads the monospace choices from your system. The control remains unavailable while that list loads. Your choice applies to every Terminal and session and is saved automatically.
