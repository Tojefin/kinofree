<script>
	import { Button } from '$lib/elements/button';
	import { ArrowIcon } from '$lib/shared/icons';

	export let title = '';
	export let year = '';
</script>

<section>
	<div class="back">
		<Button title="Назад" nav vibro dark circle on:click={() => history.back()}>
			<ArrowIcon left />
		</Button>
	</div>
	<h2>{title ?? ''}<span>{year ?? ''}</span></h2>
</section>

<style lang="scss">
	section {
		display: flex;
		max-width: 1920px;
		padding: 20px 40px;
		gap: 24px;
		align-items: center;
		align-self: stretch;

		@media (max-width: 768px) {
			flex: none;
			padding: 16px;
		}
	}

	h2 {
		font-weight: 700;
		font-size: 32px;
		line-height: 137%;
		color: var(--white);

		@media (max-width: 1024px) {
			display: flex;
			align-items: flex-start;
			justify-content: center;
			flex-direction: column;
			gap: 12px;
		}

		span {
			margin-left: 12px;
			color: var(--gray);

			@media (max-width: 1024px) {
				margin-left: 0;
				font-weight: 700;
				font-size: 16px;
				line-height: 125%;
			}
		}
	}

	.back {
		@media (max-width: 768px) {
			display: none;
		}
	}
</style>
