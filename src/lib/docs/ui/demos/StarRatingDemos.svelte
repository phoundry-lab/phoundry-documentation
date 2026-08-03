<script lang="ts">
	import Example from '$lib/docs/ui/Example.svelte';
	import StarRating from '$phoundry/components/ratings/StarRating.svelte';

	let interactive = $state(3);
	let half = $state(3.5);
	let tenScale = $state(7);

	const interactiveCode = `<StarRating
  rating={rating}
  onchange={(v) => rating = v}
/>`;

	const halfCode = `<StarRating
  rating={rating}
  allowHalf
  onchange={(v) => rating = v}
/>`;

	const readonlyCode = `<StarRating rating={4} readonly />
<StarRating rating={2.5} readonly allowHalf />`;

	const sizesCode = `<StarRating rating={3} size="xs" readonly />
<StarRating rating={3} size="sm" readonly />
<StarRating rating={3} size="md" readonly />
<StarRating rating={3} size="lg" readonly />`;

	const maxCode = `<StarRating rating={score} max={10} onchange={(v) => score = v} />`;
</script>

<div class="space-y-8">
	<Example title="Interactive" code={interactiveCode}>
		<StarRating
			rating={interactive}
			onchange={(v: number) => {
				interactive = v;
			}}
		/>
		<p class="mt-2 text-xs text-txt-tertiary">Rating: {interactive}</p>
	</Example>

	<Example title="Half Stars" code={halfCode}>
		<StarRating
			rating={half}
			allowHalf
			onchange={(v: number) => {
				half = v;
			}}
		/>
		<p class="mt-2 text-xs text-txt-tertiary">Rating: {half}</p>
	</Example>

	<Example title="Readonly" code={readonlyCode}>
		<div class="flex flex-col gap-2">
			<div class="flex items-center gap-3">
				<StarRating rating={4} readonly />
				<span class="text-xs text-txt-tertiary">4 / 5</span>
			</div>
			<div class="flex items-center gap-3">
				<StarRating rating={2.5} readonly allowHalf />
				<span class="text-xs text-txt-tertiary">2.5 / 5</span>
			</div>
		</div>
	</Example>

	<Example title="Custom max (10 stars)" code={maxCode}>
		<p class="mb-2 text-xs text-txt-secondary">
			<code>max</code> adjusts star count and <code>aria-valuemax</code>; keyboard Home/End still jump to 0 / max.
		</p>
		<StarRating rating={tenScale} max={10} onchange={(v: number) => (tenScale = v)} />
		<p class="mt-2 text-xs text-txt-tertiary">Value: {tenScale} / 10</p>
	</Example>

	<Example title="Sizes" code={sizesCode}>
		<div class="flex items-center gap-6">
			<div class="flex flex-col items-center gap-1">
				<StarRating rating={3} size="xs" readonly />
				<span class="text-[10px] text-txt-tertiary">xs</span>
			</div>
			<div class="flex flex-col items-center gap-1">
				<StarRating rating={3} size="sm" readonly />
				<span class="text-[10px] text-txt-tertiary">sm</span>
			</div>
			<div class="flex flex-col items-center gap-1">
				<StarRating rating={3} size="md" readonly />
				<span class="text-[10px] text-txt-tertiary">md</span>
			</div>
			<div class="flex flex-col items-center gap-1">
				<StarRating rating={3} size="lg" readonly />
				<span class="text-[10px] text-txt-tertiary">lg</span>
			</div>
		</div>
	</Example>
</div>
