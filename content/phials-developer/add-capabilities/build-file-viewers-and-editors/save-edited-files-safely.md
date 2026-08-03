---
title: "Save edited files safely"
description: "Integrates dirty, saving, history, finalization, save, revert, conflict, and retention behavior with revision-aware file writes."
ai_disclosure: true
order: 6
---

# Save edited files safely

An editor must preserve the source it read, compare the expected revision when saving, and keep unresolved work alive until the user resolves it. Put that lifecycle in the shared [PreviewSession](../../reference/sdk-type-reference/PreviewSession.md); expose its standard state through `session.editor` so Phials can render Save, Revert, history, dirty state, and close behavior consistently.

The example below uses the typed text API. Request `filesystem.write` in the manifest; it grants the corresponding reads as well.

Binary editors use the same lifecycle and result contract:

```ts
const snapshot = await api.files.readBinary(file.path);
const result = await api.files.writeBinary(file.path, editedBytes, {
  expectedRevision: snapshot.revision,
});

if (result.status === "conflict") {
  // Keep the edited buffer and ask the user whether to reload or overwrite.
}
```

Both built-in and community-plugin editors delegate to this revision-aware host service. Pass `overwrite: true` only after explicit user confirmation.

## Track source, baseline, and revision

Extend `DiagramSession.svelte.ts`:

```ts
import { getPluginAPI } from "./main.js";

type DiagramConflict = {
	actualRevision: string | null;
};

export class DiagramSession implements PreviewSession {
	file = $state.raw<FileEntry>(null!);
	source = $state("");
	baseline = $state("");
	revision = $state<string | null>(null);
	loading = $state(true);
	saving = $state(false);
	error = $state<string | null>(null);
	conflict = $state<DiagramConflict | null>(null);
	zoom = $state(1);

	readonly isDirty = $derived(this.source !== this.baseline);

	#loadGeneration = 0;
	#savePromise: Promise<boolean> | null = null;
	#disposed = false;

	constructor(file: FileEntry) {
		this.file = file;
		void this.reloadFromDisk(false);
	}

	editor = $derived.by(
		(): PreviewToolbarEditorState => ({
			isDirty: this.isDirty,
			saving: this.saving,
			onSave: async () => {
				await this.save();
			},
			onFinalize: () => this.finalize(),
			onRevert: () => this.revert(),
			dirtyLabel: "Unsaved diagram changes",
		}),
	);

	setSource(source: string): void {
		this.source = source;
		this.error = null;
	}

	retainOnRelease(): boolean {
		return this.isDirty || this.saving || this.conflict !== null;
	}

	async save(options: { overwrite?: boolean } = {}): Promise<boolean> {
		if (this.#savePromise) await this.#savePromise;
		if (this.conflict && !options.overwrite) return false;
		if (!this.isDirty) return true;

		const sourceToSave = this.source;
		const expectedRevision = this.revision;
		this.saving = true;

		const write = this.writeSource(
			sourceToSave,
			expectedRevision,
			options.overwrite ?? false,
		);
		this.#savePromise = write;

		try {
			return await write;
		} finally {
			if (this.#savePromise === write) this.#savePromise = null;
			this.saving = false;
		}
	}

	private async writeSource(
		sourceToSave: string,
		expectedRevision: string | null,
		overwrite: boolean,
	): Promise<boolean> {
		try {
			const result = await getPluginAPI().files.writeText(
				this.file.path,
				sourceToSave,
				{ expectedRevision, overwrite },
			);

			if (result.status === "conflict") {
				this.conflict = {
					actualRevision: result.actualRevision,
				};
				return false;
			}

			this.baseline = sourceToSave;
			this.revision = result.revision;
			this.conflict = null;
			this.error = null;
			return true;
		} catch (cause) {
			this.error =
				cause instanceof Error ? cause.message : String(cause);
			return false;
		}
	}

	revert(): void {
		this.source = this.baseline;
		this.conflict = null;
		this.error = null;
	}

	async reloadFromDisk(confirmDiscard = true): Promise<boolean> {
		if (confirmDiscard && this.isDirty) {
			const confirmed = await getPluginAPI().modal.confirm({
				title: "Reload diagram from disk?",
				message: "Your unsaved diagram changes will be discarded.",
				confirmLabel: "Reload",
				cancelLabel: "Keep editing",
				danger: true,
			});
			if (!confirmed) return false;
		}

		const generation = ++this.#loadGeneration;
		this.loading = true;

		try {
			const snapshot = await getPluginAPI().files.readText(this.file.path);
			if (this.#disposed || generation !== this.#loadGeneration) {
				return false;
			}

			this.source = snapshot.content;
			this.baseline = snapshot.content;
			this.revision = snapshot.revision;
			this.conflict = null;
			this.error = null;
			return true;
		} catch (cause) {
			this.error =
				cause instanceof Error ? cause.message : String(cause);
			return false;
		} finally {
			if (!this.#disposed && generation === this.#loadGeneration) {
				this.loading = false;
			}
		}
	}

	async overwriteConflict(): Promise<boolean> {
		if (!this.conflict) return true;

		const confirmed = await getPluginAPI().modal.confirm({
			title: "Overwrite the file on disk?",
			message:
				"The file changed after this editor loaded it. Overwriting will replace those external changes.",
			confirmLabel: "Overwrite",
			cancelLabel: "Cancel",
			danger: true,
		});
		if (!confirmed) return false;

		return this.save({ overwrite: true });
	}

	async finalize(): Promise<boolean> {
		if (this.#savePromise) await this.#savePromise;
		if (this.conflict) return false;

		while (this.isDirty) {
			if (!(await this.save())) return false;
		}

		return !this.saving && this.conflict === null;
	}

	relocate(oldPath: string, newPath: string): void {
		if (this.file.path !== oldPath) return;
		this.file = {
			...this.file,
			path: newPath,
			name: getPluginAPI().files.getBasename(newPath),
		};
	}

	dispose(): void {
		this.#disposed = true;
		this.#loadGeneration += 1;
	}
}
```

Capture `sourceToSave` before awaiting the write. If the user continues editing during the save, only that captured source becomes the new baseline and the later changes remain dirty.

## Present conflicts without hiding the editor

Keep the editor buffer available while showing an actionable conflict message:

```svelte
{#if diagram.conflict}
	<div class="conflict" role="alert">
		<p>The file changed on disk after this editor loaded it.</p>
		<Button onclick={() => void diagram.reloadFromDisk()}>
			Reload from disk
		</Button>
		<Button
			variant="danger"
			onclick={() => void diagram.overwriteConflict()}
		>
			Overwrite with editor version
		</Button>
	</div>
{/if}
```

Treat a `null` `actualRevision` as a missing file. Keep the buffer and offer an explicit recreate or discard decision rather than silently recreating the path.

Do not update the baseline after a failed write, ignore a conflict, or retry conflicts in a loop. Transient I/O failures may be retried with a bounded policy while the newest source remains retained.

## Let Phials render standard editor controls

Phials reads `session.editor` and renders the standard editor bundle in supported shells. `onFinalize` runs before a destructive close or provider replacement; returning `false` keeps the surface available for conflict or error recovery.

If your editor exposes in-session history, add an [EditorHistoryHandle](../../reference/sdk-type-reference/EditorHistoryHandle.md):

```ts
editor = $derived.by((): PreviewToolbarEditorState => ({
	isDirty: this.isDirty,
	saving: this.saving,
	onSave: async () => {
		await this.save();
	},
	onFinalize: () => this.finalize(),
	onRevert: () => this.revert(),
	history: this.history,
}));
```

Keep `canUndo` and `canRedo` reactive as the editor changes. Do not implement a second Save/Revert/dirty toolbar in `PreviewProvider.toolbar`.

Autosave is a separate product decision, not a consequence of `isEditable`. An autosaving editor still needs serialized writes, revision checks, conflict recovery, retention, and close finalization; it sets `editor.autosave` only when routine Save/Revert chrome would misrepresent the workflow.

Finally, declare editability on the provider so host behavior can reflect the file's real limit:

```ts
isEditable: (file) => file.is_file && file.size <= MAX_DIAGRAM_BYTES,
```

Markdown embeds remain inspection-only even when `isEditable` returns `true`.

For the general text snapshot and write result contract, see [Read and write text files safely](../../work-with-phials/work-with-files-and-folders/read-and-write-text-files-safely.md), [`PluginTextFileSnapshot`](../../reference/sdk-type-reference/PluginTextFileSnapshot.md), and [`PluginTextWriteResult`](../../reference/sdk-type-reference/PluginTextWriteResult.md).
