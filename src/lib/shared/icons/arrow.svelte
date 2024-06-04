<script>
	import { onMount } from 'svelte';

	export let circle = false;
	export let right = true;
	export let left = false;

	onMount(() => {
		if (left) right = false;
	});
</script>

{#if circle}
	<svg
		class:left
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g id="Arrow / Arrow_Circle_Right">
			<path
				id="Vector"
				d="M13 15L16 12M16 12L13 9M16 12H8M21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12Z"
				stroke="black"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</g>
	</svg>
{:else}
	<svg
		class:left
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g id="Arrow_Right">
			<path
				id="Vector"
				d="M21 12L16 7M21 12L16 17M21 12H3"
				stroke="black"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</g>
	</svg>
{/if}

<style lang="scss">
	.left {
		transform: rotate(180deg);
	}
</style>
