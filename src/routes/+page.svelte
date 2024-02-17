<script>
	import { Header, Anonser, SearchSection, Last, Footer } from '$lib/blocks';
	import { page } from '$app/stores';
</script>

<div class="page-main">
	<Header />
	{#if $page.url.hash == '#donat' || $page.url.hash == '#profile'}
		<Anonser />
	{/if}
	<SearchSection />
	<Last />
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
