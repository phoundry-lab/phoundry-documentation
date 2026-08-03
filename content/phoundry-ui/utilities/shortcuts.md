---
title: Keyboard Shortcuts
layout: ui
order: 2
---

<script lang="ts">
	import UiDocHeader from '$lib/docs/ui/UiDocHeader.svelte';
	import Example from '$lib/docs/ui/Example.svelte';
	import PropTable from '$lib/docs/ui/PropTable.svelte';
	import type { PropDef } from '$lib/docs/ui/PropTable.svelte';
	import Separator from '$phoundry/components/display/Separator.svelte';
	import Kbd from '$phoundry/components/display/Kbd.svelte';

	const managerProps: PropDef[] = [
		{
			name: 'platform',
			type: 'ShortcutPlatform',
			description: 'Resolved platform key (<code>mac</code>, <code>windows</code>, <code>linux</code>) used when parsing definitions.'
		},
		{
			name: 'isReady',
			type: 'boolean',
			description: 'Becomes true after <code>init()</code> resolves (safe to read shortcuts with overrides applied).'
		}
	];

	const factoryProps: PropDef[] = [
		{
			name: 'createShortcutManager(options?)',
			type: '→ ShortcutManager',
			description: 'Construct (or replace) the process singleton - must run before <code>getShortcutManager()</code>.'
		},
		{
			name: 'getShortcutManager()',
			type: '→ ShortcutManager',
			description: 'Throws if no manager was created yet - useful for modules that only consume shortcuts.'
		}
	];

	const managerMethods: PropDef[] = [
		{
			name: 'register(reg)',
			type: 'ShortcutRegistration',
			description: 'Register a keyboard shortcut with id, label, defaults, and handler.'
		},
		{
			name: 'registerAll(regs)',
			type: 'ShortcutRegistration[]',
			description: 'Register multiple shortcuts at once.'
		},
		{
			name: 'unregister(id)',
			type: 'string',
			description: 'Remove a shortcut registration by id.'
		},
		{
			name: 'unregisterByPrefix(prefix)',
			type: 'string',
			description: 'Remove all registrations whose id starts with the given prefix.'
		},
		{
			name: 'has(id)',
			type: 'string → boolean',
			description: 'Check if a shortcut id is registered.'
		},
		{
			name: 'get(id)',
			type: 'string → ShortcutRegistration | undefined',
			description: 'Get a registration by id.'
		},
		{
			name: 'getShortcutsForAction(id)',
			type: 'string → string[]',
			description: 'Get the active shortcut strings for an action (respects overrides).'
		},
		{
			name: 'getDisplayShortcut(id)',
			type: 'string → string | null',
			description: 'Get the formatted display string for the primary shortcut.'
		},
		{
			name: 'getDisplayShortcuts(id)',
			type: 'string → string[]',
			description: 'Get formatted display strings for all shortcuts of an action.'
		},
		{
			name: 'setOverride(id, shortcuts)',
			type: 'async',
			description: 'Set user-customized shortcut(s) for an action. Validates conflicts.'
		},
		{
			name: 'resetToDefault(id)',
			type: 'async',
			description: 'Remove the user override for an action, restoring defaults.'
		},
		{ name: 'resetAll()', type: 'async', description: 'Clear all user overrides.' },
		{
			name: 'hasOverride(id)',
			type: 'string → boolean',
			description: 'Check if an action has a user override.'
		},
		{
			name: 'checkConflict(shortcut, excludeId?)',
			type: 'ShortcutConflict | null',
			description: 'Check if a shortcut string conflicts with existing registrations.'
		},
		{
			name: 'handleKeyDown(event)',
			type: 'KeyboardEvent → boolean',
			description: 'Process a keyboard event. Returns true if a shortcut matched.'
		},
		{
			name: 'getSections()',
			type: 'ShortcutSection[]',
			description: 'Get all registrations grouped by section/subsection for settings UI.'
		},
		{
			name: 'init()',
			type: 'async',
			description: 'Load persisted overrides. Call once after creation.'
		},
		{ name: 'destroy()', type: 'void', description: 'Clear all registrations and caches.' }
	];

	const managerOptions: PropDef[] = [
		{
			name: 'loadOverrides',
			type: '() => Promise<ShortcutOverrides>',
			description: 'Callback to load persisted shortcut overrides at init.'
		},
		{
			name: 'saveOverrides',
			type: '(overrides) => Promise<void>',
			description: 'Callback to persist overrides after every change.'
		},
		{
			name: 'shouldIgnore',
			type: '(event: KeyboardEvent) => boolean',
			description: 'Filter to skip events. Defaults to ignoring inputs, textareas, and open modals.'
		}
	];

	const registrationProps: PropDef[] = [
		{
			name: 'id',
			type: 'string',
			required: true,
			description: 'Unique identifier for the shortcut action.'
		},
		{
			name: 'label',
			type: 'string',
			required: true,
			description: 'Human-readable label shown in settings UI.'
		},
		{
			name: 'defaults',
			type: 'ShortcutDefinition[]',
			description: 'Default shortcut(s). Strings like "CmdOrCtrl+S" or per-platform objects.'
		},
		{
			name: 'handler',
			type: '(event) => void | boolean',
			required: true,
			description: 'Called when the shortcut fires. Return false to allow propagation.'
		},
		{
			name: 'when',
			type: '() => boolean',
			description: 'Guard - shortcut only fires when this returns true.'
		},
		{ name: 'section', type: 'string', default: '"General"', description: 'Group in settings UI.' },
		{
			name: 'subsection',
			type: 'string',
			default: '"General"',
			description: 'Subgroup in settings UI.'
		},
		{
			name: 'priority',
			type: 'number',
			default: '0',
			description: 'Higher priority shortcuts are checked first.'
		},
		{
			name: 'allowDefault',
			type: 'boolean',
			default: 'false',
			description: 'If true, does not call preventDefault().'
		}
	];

	const basicCode = `<script lang="ts">
  import { createShortcutManager } from 'phoundry-ui';

  const shortcuts = createShortcutManager();

  shortcuts.register({
    id: 'app.save',
    label: 'Save',
    defaults: ['CmdOrCtrl+S'],
    handler: () => console.log('Saved!'),
  });

  shortcuts.register({
    id: 'app.new',
    label: 'New Document',
    defaults: ['CmdOrCtrl+N'],
    handler: () => console.log('New document'),
    section: 'Documents',
  });

  // Display the formatted shortcut
  const display = shortcuts.getDisplayShortcut('app.save');
  // → "⌘S" on Mac, "Ctrl+S" on Windows/Linux

  await shortcuts.init();
<${'/'}script>`;

	const overrideCode = `// User wants to rebind Save to Ctrl+Shift+S
await shortcuts.setOverride('app.save', ['Ctrl+Shift+S']);

// Check for conflicts before setting
const conflict = shortcuts.checkConflict('Ctrl+N', 'app.new');
if (conflict) {
  console.warn(\`Conflicts with "\${conflict.existingActionLabel}"\`);
}

// Reset a single action or all overrides
await shortcuts.resetToDefault('app.save');
await shortcuts.resetAll();`;

	const platformCode = `shortcuts.register({
  id: 'editor.delete-line',
  label: 'Delete Line',
  defaults: [
    { mac: 'Cmd+Backspace', default: 'Ctrl+Shift+K' }
  ],
  handler: () => deleteLine(),
});`;

	const singletonCode = `import { createShortcutManager, getShortcutManager } from 'phoundry-ui';

// Typically once at startup:
export const shortcuts = createShortcutManager({ loadOverrides, saveOverrides });

// Elsewhere (after startup):
const same = getShortcutManager();`;

	const parseCode = `import { parseShortcut, formatShortcut, matchesEvent } from 'phoundry-ui';

const parsed = parseShortcut('CmdOrCtrl+Shift+P', 'mac');
// → { key: 'p', ctrl: false, meta: true, alt: false, shift: true }

const display = formatShortcut('CmdOrCtrl+S', 'mac');
// → "⌘S"

document.addEventListener('keydown', (e) => {
  if (matchesEvent(parsed, e)) {
    console.log('Matched!');
  }
});`;
</script>

<UiDocHeader
	title="Keyboard Shortcuts"
	description="Headless shortcut management with registration, conflict detection, user overrides, and platform-aware display formatting."
	importCode={"import { createShortcutManager } from 'phoundry-ui';"}
/>

<div class="max-w-3xl space-y-8">
	<Example title="Basic Registration & Display" code={basicCode}>
		<div class="space-y-3">
			<p class="text-xs text-txt-secondary">Create a manager, register shortcuts, and display formatted key combos.</p>
			<div class="flex items-center gap-3">
				<span class="text-xs text-txt-secondary">Save:</span>
				<Kbd keys="Mod+S" />
				<span class="text-xs text-txt-secondary">New:</span>
				<Kbd keys="Mod+N" />
			</div>
			<p class="text-[11px] text-txt-tertiary">
				The manager listens to keyboard events via <code>handleKeyDown()</code>. Wire it up in your layout's <code>onkeydown</code>.
			</p>
		</div>
	</Example>

	<Example title="Platform-Specific Shortcuts" code={platformCode}>
		<div class="space-y-2">
			<p class="text-xs text-txt-secondary">Use per-platform objects for shortcuts that differ across operating systems.</p>
			<div class="flex items-center gap-3">
				<span class="text-xs text-txt-tertiary">Mac:</span>
				<Kbd keys="Mod+Backspace" />
				<span class="text-xs text-txt-tertiary">Win/Linux:</span>
				<Kbd keys="Ctrl+Shift+K" />
			</div>
		</div>
	</Example>

	<Example title="User Overrides & Conflict Detection" code={overrideCode}>
		<div class="space-y-2">
			<p class="text-xs text-txt-secondary">Users can rebind shortcuts. The manager validates conflicts and persists overrides via callbacks.</p>
		</div>
	</Example>

	<Example title="Standalone Utilities" code={parseCode}>
		<div class="space-y-2">
			<p class="text-xs text-txt-secondary">Low-level utilities for parsing, formatting, and matching shortcuts outside the manager.</p>
		</div>
	</Example>

	<Example title="Factory vs getter" code={singletonCode}>
		<p class="text-xs text-txt-secondary">
			<code>createShortcutManager</code> installs the singleton; subsequent modules can call <code>getShortcutManager()</code> without threading instances through every import.
		</p>
	</Example>

	<Separator />
	<PropTable props={factoryProps} title="Construction" />
	<PropTable props={managerProps} title="ShortcutManager (state)" />

	<Separator />
	<PropTable props={managerOptions} title="ShortcutManagerOptions" />

	<Separator />
	<PropTable props={registrationProps} title="ShortcutRegistration" />

	<Separator />
	<PropTable props={managerMethods} title="ShortcutManager Methods" />
</div>

## Usage tips

- Use `CmdOrCtrl` as a modifier prefix - it resolves to `Cmd` on Mac and `Ctrl` elsewhere.
- Call `init()` after creation to load persisted overrides before registering shortcuts.
- The default `shouldIgnore` skips events in inputs, textareas, contenteditable, and when a modal is open.
- Use `when` guards for context-dependent shortcuts (e.g., only active when a panel is focused).
- Up to 3 shortcut bindings per action are supported.
- `getSections()` returns grouped registrations - useful for building a keyboard shortcuts settings panel.
