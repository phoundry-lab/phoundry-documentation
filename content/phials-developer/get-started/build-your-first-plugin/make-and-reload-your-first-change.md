---
title: "Make and reload your first change"
description: "Changes one starter capability, rebuilds, reloads, and verifies the visible result."
ai_disclosure: true
order: 4
---

# Make and reload your first change

Change the starter command, rebuild the same plugin version, and use Phials' development reload action to replace the running module. A reload is a lifecycle operation, not a page refresh and not the build itself.

## Change the command

In `src/main.ts`, replace the existing `helloCommand` with:

```ts
const helloCommand: Command = {
	id: "acme.hello-phials.hello",
	label: "Say hello to Phials",
	description: "Confirms that the latest development build is activated",
	icon: "mdi:hand-wave",
	category: "View",
	contextKeys: ["always"],
	action: () => {
		api?.notify.success("My first plugin change is running");
	},
};
```

Keep the command ID stable. IDs identify commands across reloads and user configuration; the label and behavior can change without creating a second command.

## Rebuild and reinstall

Run the same validation gate against the changed source, then replace the installed development artifacts:

```bash
npm run check
npm run build
npm run validate
npm run dev:install
```

If you installed into an isolated Phials Home, pass the same location again:

```bash
npm run dev:install -- --phials-home /absolute/path/to/phials-plugin-dev
```

The build and install commands update files on disk. The old module remains activated in the running Phials process until you explicitly reload it.

## Reload in Phials

Open **Settings → Plugins → Community plugins → Installed**, find **Hello Phials**, and choose **Reload**.

Phials performs the plugin reload lifecycle:

1. calls the old module's `onBeforeReload` hook when it exists and retains only the state that hook returns;
2. deactivates the old plugin and removes its active capabilities and runtime registrations;
3. imports the newly installed `main.js`;
4. accepts and activates the new plugin definition; and
5. passes retained reload state to the new module's `onAfterReload` hook when both sides support it.

The starter does not preserve reload state, so this first reload simply replaces the command and file surface. Durable settings and plugin data follow their own storage contracts and are not deleted by deactivation.

If the new release cannot load or activate, Phials reports the reload error and restores the prior activated development release. Correct the source, rerun the four commands, and choose **Reload** again.

## Verify the new code

Open the Command Bar and search for **Say hello to Phials**. The old **Hello from Phials** label should no longer appear. Run the new command and confirm the notification says:

```text
My first plugin change is running
```

Those results show that Phials imported and activated the rebuilt module rather than merely rereading the old plugin definition.

You now have the basic authoring loop. Continue to [Rebuild and reload plugin changes](../../test-and-troubleshoot/run-your-plugin-locally/rebuild-and-reload-plugin-changes.md) for watch mode and repeated development, or begin with [Define and register a command](../../add-capabilities/add-commands/define-and-register-a-command.md) to turn the example into a useful capability.
