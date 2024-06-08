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
		min-height: 100vh;
		width: 100%;
	}
</style>
