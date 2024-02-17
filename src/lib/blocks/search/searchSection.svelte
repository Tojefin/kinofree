<script>
	import { SearchBar } from '$lib/elements';
</script>

<section>
	<div class="box">
		<SearchBar />
	</div>
</section>

<style lang="scss">
	section {
		display: flex;
		max-width: 1920px;
		padding: 20px 40px;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		flex: 1 0 0;
		align-self: stretch;

		@media (max-width: 768px) {
			flex: none;
			padding: 40px 16px;
		}
	}

	.box {
		display: flex;
		padding: 32px;
		justify-content: center;
		align-items: center;
		gap: 12px;
		flex: 1 0 0;
		align-self: stretch;
		border-radius: 20px;
		border: 1px solid rgba(255, 255, 255, 0.04);
		background: #1f2227;
		box-shadow: 0px 1px 0px 0px rgba(255, 255, 255, 0.08) inset;

		@media (max-width: 768px) {
			gap: 8px;
			flex: none;
			padding: 0;
			border: none;
			background: none;
			box-shadow: none;
		}

		:global(.searchBar) {
			justify-content: center;
		}
	}
</style>
