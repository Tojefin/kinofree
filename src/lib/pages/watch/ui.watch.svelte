<script>
	import { Films } from '$lib/blocks/films';
	import { Player } from '$lib/blocks/player';
	import ComplexSubHeder from './complex.subHeader.svelte';

	let film;
</script>

<div class="page-watch">
	<ComplexSubHeder title={film?.nameRu || film?.nameEn || film?.nameOriginal} year={film?.year} />
	<Player bind:film={film} />
	<Films type="recomends" />
</div>

<style lang="scss">
	.page-watch {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1 0 0;
		width: 100%;
	}
</style>
