<script>
	import ComplexSubHeader from './complex.subHeader.svelte';
	import { Films } from '$lib/blocks/films';

	let activeList
</script>

<div class="page-profile">
	<ComplexSubHeader bind:activeList />
	<Films type={activeList} />
</div>

<style lang="scss">
	.page-profile {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1 0 0;
		width: 100%;
	}
</style>
