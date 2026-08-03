---
title: "Connect to a server"
description: "Mount an SMB file share on macOS or Windows and manage its saved network location."
icon: phoundry-mono:folder
order: 4
ai_disclosure: true
---

# Connect to a server

Use **Connect to Server** to mount an SMB file share and browse it like another location. This feature is available on macOS and Windows.

## Connect to an SMB share

1. In the Navigator panel, choose **Connect to Server** in the **Locations** header. You can also run **Connect to Server** from the command bar.
2. In **Server**, enter an address that includes both the server and share, such as `smb://nas.local/media`.
3. Enter a username and password if the server requires them.
4. Choose **Connect**.

You can also enter `\\nas.local\media` or `nas.local/media`. For a nonstandard SMB port, include it in the address, as in `smb://nas.local:1445/media`.

Username and password are optional so that guest shares can connect without them. Phials passes credentials to the operating system's mount service and does not save the password in its own data.

After a successful connection, Phials refreshes **Locations**, opens the mounted share, and saves a network location for reconnecting later. macOS mounts it as a volume. Windows assigns an available drive letter.

Phials connects to SMB/CIFS shares only. It does not browse the network for servers or mount NFS, WebDAV, or AFP shares through this dialog.

## Reconnect or disconnect

A saved network location remains under **Locations** after the share disconnects. A disconnected row appears dimmed. Choose it, or right-click it and choose **Connect**, to let the operating system reconnect with any credentials it can reuse. If the server asks for credentials again, open **Connect to Server** and enter the address, username, and password again.

To unmount a connected share, right-click its row and choose **Disconnect**. The saved network location remains available for a later connection.

Right-click a saved network location to rename or delete it. Deleting it removes only the saved shortcut from Phials; it does not delete files on the server. If the share is still mounted, disconnect it separately.

## If the connection fails

Check that the address includes a share name, the server is reachable, and the credentials are valid. Phials waits up to 30 seconds for the operating system to mount the share. If the connection fails, choose **Show details** on the error message for the operating system's response, then reopen **Connect to Server** and try again.

**Connect to Server** is not available on Linux. Network volumes mounted by the operating system may still appear under **Locations**.
