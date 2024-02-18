<script>
	import { Button, SearchBar } from '$lib/elements';
	import { Arrow } from '$lib/icons';
</script>

<section>
	<div class="back">
		<Button title="Назад" nav vibro dark circle on:click={() => history.back()}>
			<Arrow left />
		</Button>
	</div>
	<SearchBar />
</section>

<style lang="scss">
	section {
		display: flex;
		max-width: 1920px;
		padding: 20px 40px;
		flex-direction: row;
		align-items: center;
		gap: 24px;
		align-self: stretch;

		@media (max-width: 768px) {
			flex: none;
			padding: 16px;
		}
	}

	.back {
		@media (max-width: 768px) {
			display: none;
		}
	}
</style>
