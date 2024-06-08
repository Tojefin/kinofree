<script>
	import ComplexSubHeader from './complex.subHeader.svelte';
	import { Films } from '$lib/blocks/films';
</script>

<div class="page-profile">
	<ComplexSubHeader />
	<Films type="lastviewed" />
</div>

<style lang="scss">
	.page-profile {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100vh;
		width: 100%;
	}
</style>
