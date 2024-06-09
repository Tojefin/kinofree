<script>
	import ComplexSubHeader from './complex.subHeader.svelte';
	import { Films } from '$lib/blocks/films';
</script>

<div class="page-search">
	<ComplexSubHeader />
	<Films />
</div>

<style lang="scss">
	.page-search {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1 0 0;
		width: 100%;
	}
</style>
