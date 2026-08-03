<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import Anchor from '$phoundry/components/navigation/Anchor.svelte';
	import type { AnchorItem } from '$phoundry/components/navigation/Anchor.svelte';

	let manualContainer = $state<HTMLElement>();
	let autoContainer = $state<HTMLElement>();
	let horizontalContainer = $state<HTMLElement>();
	let nestedContainer = $state<HTMLElement>();
	let offsetContainer = $state<HTMLElement>();

	let activeHash = $state('');

	const basicItems: AnchorItem[] = [
		{ key: 'basic-intro', href: '#basic-intro', title: 'Introduction' },
		{ key: 'basic-install', href: '#basic-install', title: 'Installation' },
		{ key: 'basic-usage', href: '#basic-usage', title: 'Usage' },
		{ key: 'basic-api', href: '#basic-api', title: 'API Reference' }
	];

	const nestedItems: AnchorItem[] = [
		{
			key: 'nested-getting-started',
			href: '#nested-getting-started',
			title: 'Getting Started',
			children: [
				{ key: 'nested-prereqs', href: '#nested-prereqs', title: 'Prerequisites' },
				{ key: 'nested-setup', href: '#nested-setup', title: 'Setup' }
			]
		},
		{
			key: 'nested-components',
			href: '#nested-components',
			title: 'Components',
			children: [
				{ key: 'nested-button', href: '#nested-button', title: 'Button' },
				{ key: 'nested-input', href: '#nested-input', title: 'Input' },
				{ key: 'nested-select', href: '#nested-select', title: 'Select' }
			]
		}
	];

	const basicCode = `<Anchor items={[
  { key: 'intro', href: '#intro', title: 'Introduction' },
  { key: 'install', href: '#install', title: 'Installation' },
  { key: 'usage', href: '#usage', title: 'Usage' },
  { key: 'api', href: '#api', title: 'API Reference' },
]} />`;

	const autoCode = `<Anchor target={scrollContainer} headingSelector="h3" />`;

	const horizontalCode = `<Anchor
  items={items}
  direction="horizontal"
/>`;

	const nestedCode = `<Anchor items={[
  { key: 'start', href: '#start', title: 'Getting Started',
    children: [
      { key: 'prereqs', href: '#prereqs', title: 'Prerequisites' },
      { key: 'setup', href: '#setup', title: 'Setup' },
    ]},
  { key: 'components', href: '#components', title: 'Components',
    children: [
      { key: 'button', href: '#button', title: 'Button' },
      { key: 'input', href: '#input', title: 'Input' },
    ]},
]} />`;

	const offsetsCode = `<Anchor
  items={items}
  target={scrollEl}
  offsetTop={24}
  targetOffset={16}
  replace
  affix={false}
  onChange={(href) => (active = href)}
/>`;
</script>

<div class="space-y-8">
	<Example title="Basic (Manual Items)" code={basicCode}>
		<div class="flex gap-4">
			<Anchor items={basicItems} target={manualContainer} affix={false} />
			<div bind:this={manualContainer} class="h-48 flex-1 space-y-4 overflow-y-auto rounded-lg border border-border-muted p-4">
				<section id="basic-intro">
					<h3 class="text-sm font-medium text-txt-primary">Introduction</h3>
					<p class="mt-1 text-xs text-txt-secondary">Welcome to the Anchor component. It provides scroll-aware navigation for long pages.</p>
					<div class="h-24"></div>
				</section>
				<section id="basic-install">
					<h3 class="text-sm font-medium text-txt-primary">Installation</h3>
					<p class="mt-1 text-xs text-txt-secondary">
						Install via npm: <code>npm install phoundry-ui</code>
					</p>
					<div class="h-24"></div>
				</section>
				<section id="basic-usage">
					<h3 class="text-sm font-medium text-txt-primary">Usage</h3>
					<p class="mt-1 text-xs text-txt-secondary">Import the component and pass your items array.</p>
					<div class="h-24"></div>
				</section>
				<section id="basic-api">
					<h3 class="text-sm font-medium text-txt-primary">API Reference</h3>
					<p class="mt-1 text-xs text-txt-secondary">See the props table below for full API documentation.</p>
					<div class="h-24"></div>
				</section>
			</div>
		</div>
	</Example>

	<Example title="Auto-Discovery" code={autoCode}>
		<div class="flex gap-4">
			<Anchor target={autoContainer} headingSelector="h3" affix={false} />
			<div bind:this={autoContainer} class="h-48 flex-1 space-y-4 overflow-y-auto rounded-lg border border-border-muted p-4">
				<section>
					<h3 class="text-sm font-medium text-txt-primary">Overview</h3>
					<p class="mt-1 text-xs text-txt-secondary">The auto mode scans the container for headings and builds the item list.</p>
					<div class="h-24"></div>
				</section>
				<section>
					<h3 class="text-sm font-medium text-txt-primary">Configuration</h3>
					<p class="mt-1 text-xs text-txt-secondary">Use headingSelector to control which elements are picked up.</p>
					<div class="h-24"></div>
				</section>
				<section>
					<h3 class="text-sm font-medium text-txt-primary">Scroll Tracking</h3>
					<p class="mt-1 text-xs text-txt-secondary">Active state updates automatically as the user scrolls.</p>
					<div class="h-24"></div>
				</section>
				<section>
					<h3 class="text-sm font-medium text-txt-primary">Events</h3>
					<p class="mt-1 text-xs text-txt-secondary">onChange fires whenever the active link changes.</p>
					<div class="h-24"></div>
				</section>
			</div>
		</div>
	</Example>

	<Example title="Horizontal" code={horizontalCode}>
		<div class="space-y-2">
			<Anchor
				items={basicItems.map((i) => ({
					...i,
					key: 'hz-' + i.key,
					href: '#hz-' + i.key.replace('basic-', '')
				}))}
				target={horizontalContainer}
				direction="horizontal"
				affix={false}
			/>
			<div bind:this={horizontalContainer} class="h-36 space-y-4 overflow-y-auto rounded-lg border border-border-muted p-4">
				<section id="hz-intro">
					<h3 class="text-sm font-medium text-txt-primary">Introduction</h3>
					<p class="mt-1 text-xs text-txt-secondary">Horizontal anchor for compact navigation.</p>
					<div class="h-20"></div>
				</section>
				<section id="hz-install">
					<h3 class="text-sm font-medium text-txt-primary">Installation</h3>
					<p class="mt-1 text-xs text-txt-secondary">Same install process.</p>
					<div class="h-20"></div>
				</section>
				<section id="hz-usage">
					<h3 class="text-sm font-medium text-txt-primary">Usage</h3>
					<p class="mt-1 text-xs text-txt-secondary">Set direction to horizontal.</p>
					<div class="h-20"></div>
				</section>
				<section id="hz-api">
					<h3 class="text-sm font-medium text-txt-primary">API Reference</h3>
					<p class="mt-1 text-xs text-txt-secondary">Full API below.</p>
					<div class="h-20"></div>
				</section>
			</div>
		</div>
	</Example>

	<Example title="Nested Items" code={nestedCode}>
		<div class="flex gap-4">
			<Anchor items={nestedItems} target={nestedContainer} affix={false} />
			<div bind:this={nestedContainer} class="h-56 flex-1 space-y-4 overflow-y-auto rounded-lg border border-border-muted p-4">
				<section id="nested-getting-started">
					<h2 class="text-sm font-semibold text-txt-primary">Getting Started</h2>
					<div class="h-12"></div>
				</section>
				<section id="nested-prereqs">
					<h3 class="pl-2 text-xs font-medium text-txt-primary">Prerequisites</h3>
					<p class="mt-1 pl-2 text-xs text-txt-secondary">Node.js 18+, Svelte 5.</p>
					<div class="h-16"></div>
				</section>
				<section id="nested-setup">
					<h3 class="pl-2 text-xs font-medium text-txt-primary">Setup</h3>
					<p class="mt-1 pl-2 text-xs text-txt-secondary">Run the init script.</p>
					<div class="h-16"></div>
				</section>
				<section id="nested-components">
					<h2 class="text-sm font-semibold text-txt-primary">Components</h2>
					<div class="h-12"></div>
				</section>
				<section id="nested-button">
					<h3 class="pl-2 text-xs font-medium text-txt-primary">Button</h3>
					<p class="mt-1 pl-2 text-xs text-txt-secondary">Primary action trigger.</p>
					<div class="h-16"></div>
				</section>
				<section id="nested-input">
					<h3 class="pl-2 text-xs font-medium text-txt-primary">Input</h3>
					<p class="mt-1 pl-2 text-xs text-txt-secondary">Text input field.</p>
					<div class="h-16"></div>
				</section>
				<section id="nested-select">
					<h3 class="pl-2 text-xs font-medium text-txt-primary">Select</h3>
					<p class="mt-1 pl-2 text-xs text-txt-secondary">Dropdown selector.</p>
					<div class="h-16"></div>
				</section>
			</div>
		</div>
	</Example>

	<Example title="Offsets, replaceState, onChange" code={offsetsCode}>
		<p class="mb-2 text-xs text-txt-secondary">
			<code>offsetTop</code> shifts which heading counts as “active” while scrolling.
			<code>targetOffset</code> controls the gap after clicking (defaults to <code>offsetTop</code>).
			<code>replace</code> avoids cluttering history on each jump.
		</p>
		<div class="flex gap-4">
			<Anchor
				items={basicItems.map((i) => ({
					...i,
					key: 'off-' + i.key,
					href: '#off-' + i.key.replace('basic-', '')
				}))}
				target={offsetContainer}
				offsetTop={28}
				targetOffset={12}
				replace
				affix={false}
				onChange={(href) => {
					activeHash = href;
				}}
			/>
			<div bind:this={offsetContainer} class="h-44 flex-1 space-y-4 overflow-y-auto rounded-lg border border-border-muted p-4">
				<section id="off-intro">
					<h3 class="text-sm font-medium text-txt-primary">Introduction</h3>
					<p class="mt-1 text-xs text-txt-secondary">Scroll to see <code>onChange</code> update.</p>
					<div class="h-20"></div>
				</section>
				<section id="off-install">
					<h3 class="text-sm font-medium text-txt-primary">Installation</h3>
					<p class="mt-1 text-xs text-txt-secondary">Middle segment.</p>
					<div class="h-20"></div>
				</section>
				<section id="off-usage">
					<h3 class="text-sm font-medium text-txt-primary">Usage</h3>
					<p class="mt-1 text-xs text-txt-secondary">Another section.</p>
					<div class="h-20"></div>
				</section>
				<section id="off-api">
					<h3 class="text-sm font-medium text-txt-primary">API Reference</h3>
					<p class="mt-1 text-xs text-txt-secondary">Last segment.</p>
					<div class="h-20"></div>
				</section>
			</div>
		</div>
		{#if activeHash}
			<p class="mt-2 text-[11px] text-txt-tertiary">Active: <code>{activeHash}</code></p>
		{/if}
	</Example>
</div>
