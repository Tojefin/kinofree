<script>
	import './styles.scss';
</script>

<svelte:head>
	<title>KINOFREE</title>
</svelte:head>

<main class="app">
	<div class="view">
		<slot />
	</div>
</main>

<style>
	.app {
		overflow-x: hidden;
		min-height: 100vh;
		background: #13161b;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.view {
		width: 100vw;
		max-width: 1920px;
	}
</style>
