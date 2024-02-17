<script>
	import { Header, Offline, Footer } from '$lib/blocks';
	import { page } from '$app/stores';
</script>

<div class="page-main">
	<Header />
	<Offline />
	<Footer />
</div>

<style lang="scss">
	.page-main {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100vh;
	}
</style>
