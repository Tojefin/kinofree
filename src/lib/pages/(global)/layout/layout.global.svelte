<script>
	import { Header } from '$lib/blocks/header';
	import { Footer } from '$lib/blocks/footer';
	import './styles.scss';
</script>

<svelte:head>
	<title>KINOFREE</title>
</svelte:head>

<main class="app">
	<div class="content-view">
		<Header />
		<slot />
		<Footer />
	</div>
</main>

<style>
	.app {
		overflow-x: hidden;
		background: #13161b;
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100vh;
	}
	.content-view {
		max-width: 1920px;
		width: 100vw;
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
