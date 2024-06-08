<script>
	import { Header } from '$lib/blocks/header';
	import { Footer } from '$lib/blocks/footer';
	import './styles.scss';
</script>

<svelte:head>
	<title>KINOFREE</title>
</svelte:head>

<main class="app">
	<Header />
	<slot />
	<Footer />
</main>

<style>
	.app {
		overflow-x: hidden;
		min-height: 100vh;
		background: #13161b;
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 1920px;
	}
</style>
