---
title: "Share viewer state with a preview session"
description: "Creates and retains PreviewSession state, handles disposal and relocation, and prevents divergent state across presentations."
ai_disclosure: true
order: 4
---

# Share viewer state with a preview session

Use `PreviewProvider.createSession` when a file surface has state that should outlive one component mount or stay consistent across presentations. Phials creates one session for the provider and file identity, passes it to the surface and toolbar, and retains it while a presentation or unresolved edit needs it.

Good session state includes:

- loaded and parsed document data;
- current page, sheet, frame, playback position, or zoom;
- editor source, baseline revision, dirty state, and conflicts;
- leases for workers, decoders, watches, and object URLs; and
- callbacks used by toolbar controls.

Transient DOM references remain in the mounted component.

## Create a session class

Place a Svelte module class in `src/DiagramSession.svelte.ts`:

```ts
import { getPluginAPI } from "./main.js";

export class DiagramSession implements PreviewSession {
	file = $state.raw<FileEntry>(null!);
	source = $state("");
	revision = $state<string | null>(null);
	loading = $state(true);
	error = $state<string | null>(null);
	zoom = $state(1);

	#loadGeneration = 0;
	#disposed = false;

	constructor(file: FileEntry) {
		this.file = file;
		void this.load();
	}

	async load(): Promise<void> {
		const generation = ++this.#loadGeneration;
		this.loading = true;
		this.error = null;

		try {
			const snapshot = await getPluginAPI().files.readText(this.file.path);
			if (this.#disposed || generation !== this.#loadGeneration) return;
			this.source = snapshot.content;
			this.revision = snapshot.revision;
		} catch (cause) {
			if (this.#disposed || generation !== this.#loadGeneration) return;
			this.error = cause instanceof Error ? cause.message : String(cause);
		} finally {
			if (!this.#disposed && generation === this.#loadGeneration) {
				this.loading = false;
			}
		}
	}

	zoomIn(): void {
		this.zoom = Math.min(3, this.zoom * 1.25);
	}

	zoomOut(): void {
		this.zoom = Math.max(0.5, this.zoom / 1.25);
	}

	resetZoom(): void {
		this.zoom = 1;
	}

	retainOnRelease(): boolean {
		return false;
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

The generation check prevents a late read from changing a disposed or superseded session. A real session's `dispose` should also unsubscribe watches, terminate workers, release document leases, revoke object URLs, and discard other resources it owns.

## Register the session factory

Create the session from the provider:

```ts
import { DiagramSession } from "./DiagramSession.svelte.js";

const diagramProvider: PreviewProvider = {
	type: "preview",
	id: "acme.diagram.viewer",
	name: "Acme Diagram",
	extensions: ["acme-diagram"],
	surface: DiagramSurface,
	createSession: ({ file }) => new DiagramSession(file),
	toolbar: DiagramToolbar,
	destinations: { pageTab: true, embed: true },
};
```

`createSession` may return a session or a promise. Phials waits for it before mounting the surface.

## Consume shared state

The surface now reads the session instead of loading its own copy:

```svelte
<script lang="ts">
	import type { DiagramSession } from "./DiagramSession.svelte.js";

	let { file, session }: PreviewSurfaceProps = $props();
	const diagram = $derived(session as DiagramSession | undefined);
</script>

{#if !diagram || diagram.loading}
	<p>Loading diagram…</p>
{:else if diagram.error}
	<p role="alert">Could not read {file.name}: {diagram.error}</p>
{:else}
	<div
		class="canvas"
		style={`--diagram-zoom: ${diagram.zoom}`}
	>
		<pre>{diagram.source}</pre>
	</div>
{/if}
```

The toolbar changes `diagram.zoom`; every later presentation sees the same value. Do not create a fallback session in each component when the provider has `createSession`, because that recreates the divergent state the session contract prevents.

## Retain only unresolved work

When the last presentation releases a clean session, Phials calls `dispose`. `retainOnRelease` may return `true` while the session is dirty, saving, conflicted, or unable to finalize. Return `false` as soon as the state becomes safely disposable; Phials then releases the retained session.

Do not retain read-only documents indefinitely merely to make reopening faster. Use bounded resource caches with their own eviction policy when warm reuse is worth the memory.

When an in-app rename or move changes the file path, Phials rekeys the session and calls `relocate`. Update every path used by subsequent reads or writes without replacing the session's viewer state. External replacement of file contents is a different event and should follow the provider's reload or conflict policy.

The generated [PreviewSession](../../reference/sdk-type-reference/PreviewSession.md) and [`PreviewSessionFactoryProps`](../../reference/sdk-type-reference/PreviewSessionFactoryProps.md) pages provide the exact base contract.
