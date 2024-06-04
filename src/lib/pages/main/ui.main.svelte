<script>
	import { Anonser } from '$lib/blocks/anonser';
	import { LastViwed } from '$lib/blocks/lastViwed';
	import ComplexSearch from './complex.search.svelte'
</script>

<div class="page-main">
	<Anonser />
	<ComplexSearch />
	<LastViwed />
</div>

<style lang="scss">
	.page-main {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 70vh;
		width: 100%;
	}
</style>
