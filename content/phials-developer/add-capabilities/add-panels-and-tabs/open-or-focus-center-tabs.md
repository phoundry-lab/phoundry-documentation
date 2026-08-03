---
title: "Open or focus center tabs"
description: "Uses the typed modules API to request a center instance and handles identity-based focus results."
ai_disclosure: true
order: 3
---

# Open or focus center tabs

Use `api.modules.openCenter()` when a command, context-menu action, or another plugin workflow needs to present module content in the center. The typed API applies center routing, identity, pinning, and replacement rules without exposing Phials host objects.

The provider must include `"center"` in `allowedPositions`:

```ts
const MODULE_ID = "com.example.project-notes.module";

const projectNotesProvider: ModuleProvider = {
  type: "module",
  id: MODULE_ID,
  name: "Project Notes",
  icon: "mdi:notebook-edit-outline",
  component: ProjectNotesModule,
  allowedPositions: ["right", "bottom", "center"],
  defaultPosition: "right",
  allowMultiple: true,
  getCenterTabIdentity: (state) =>
    (state as ProjectNotesState | undefined)?.projectId ?? undefined,
};
```

Keep the plugin API received during activation in a plugin-owned module, then call the modules API from provider actions:

```ts
let api: PluginAPI | null = null;

async function openProjectNotes(
  project: { id: string; name: string },
  sourcePaneId?: string,
): Promise<ModuleOpenResult> {
  if (!api) {
    throw new Error("Project Notes is not active");
  }

  return api.modules.openCenter(
    MODULE_ID,
    {
      projectId: project.id,
      projectName: project.name,
      draft: "",
      savedText: "",
      compact: false,
      saveStatus: "clean",
    } satisfies ProjectNotesState,
    { sourcePaneId },
  );
}

export default function createPlugin(): PhialsPlugin {
  return {
    id: "com.example.project-notes",
    name: "Project Notes",
    version: "0.1.0",
    providers: [projectNotesProvider],
    onActivate(pluginApi) {
      api = pluginApi;
    },
    onDeactivate() {
      api = null;
    },
  };
}
```

`openCenter()` returns a discriminated result:

```ts
type ModuleOpenResult =
  | { status: "created"; moduleInstanceId: string }
  | { status: "focused"; moduleInstanceId: string }
  | { status: "replaced"; moduleInstanceId: string };
```

`moduleInstanceId` is the stable ID of the instance that now represents the request. `created` means Phials created a new tab, `focused` means equivalent identity already existed, and `replaced` means the target group safely reused a replaceable same-type tab.

Use the result to coordinate plugin-owned state, not to reach into host tab state:

```ts
const result = await openProjectNotes(project, pane.id);

if (result.status === "focused") {
  projectNotesEvents.emit("reveal", {
    moduleInstanceId: result.moduleInstanceId,
  });
}
```

## Preserve source-aware routing

Pass `sourcePaneId` when the request originates from an Explorer selection or context action. Phials opens new content in the center-tab group that contains that Explorer pane:

```ts
const openProjectNotesCommand: Command = {
	id: "com.example.project-notes.open-folder-notes",
	label: "Open Project Notes",
	icon: "mdi:notebook-edit-outline",
	contextKeys: ["hasSingleSelection", "selectionIsDirectory"],
	defaultPlacements: [
		{
			area: "contextMenu",
			selectionMode: "single",
			order: 30,
		},
	],
	async action(ctx) {
		const entry = ctx.targetFile;
		if (!entry?.is_dir) return;

		await openProjectNotes(
			{ id: entry.path, name: entry.name },
			ctx.pane.id,
		);
	},
};

const commands: CommandProvider = {
	type: "command",
	id: "com.example.project-notes.commands",
	name: "Project Notes commands",
	commands: [openProjectNotesCommand],
};
```

Omit `sourcePaneId` for a global command. Phials then targets the active center-tab group.

Center routing follows this order:

1. Focus equivalent provider-defined identity anywhere in the current center split tree.
2. If no identity matches, consider safe same-provider replacement in the source-aware target group.
3. If neither applies, create an instance in that group.

Do not search for tabs yourself, persist host tab IDs, or use raw invocation to open a module. The typed API preserves routing behavior as users split, move, pin, close, and restore tabs.

Next, [define stable identity and safe replacement](./identify-and-replace-center-tabs.md).
