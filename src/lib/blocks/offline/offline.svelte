<script>
	import { WifiProblem, Refresh } from '$lib/icons';
</script>

<section>
	<div class="offline">
		<div class="visual">
			<WifiProblem />
		</div>
		<div class="text">
			<p>Нет интернета</p>
			<span> Проверьте подключение и обновите страницу </span>
		</div>
		<a href="/">
			<button>
				Обновить страницу <Refresh />
			</button>
		</a>
	</div>
</section>

<style lang="scss">
	section {
		display: flex;
		max-width: 1920px;
		padding: 20px 40px;
		flex-direction: column;
		align-items: flex-start;
		gap: 32px;
		flex: 1 0 0;
		align-self: stretch;

		@media (max-width: 768px) {
			padding: 16px 16px 40px 16px;
		}
	}

	button {
		appearance: none;
		border: none;
		display: flex;
		padding: 11px 24px;
		align-items: center;
		gap: 8px;
		border-radius: 32px;
		background: var(--white, #fff);
		color: var(--black, #000);
		font-family: Inter;
		font-size: 14px;
		font-weight: 500;
		line-height: 18px; /* 128.571% */
		user-select: none;

		transition: all ease 0.25s;

		:global(svg path) {
			transition: all ease 0.25s;
		}

		:global(svg path) {
			stroke: var(--black, #000);
		}

		@include hover {
			background: var(--black, #000);
			color: var(--white, #fff);

			:global(svg path) {
				stroke: var(--white, #fff);
			}
		}
	}

	.offline {
		display: flex;
		flex-direction: column;
		gap: 32px;
		justify-content: center;
		align-items: center;
		flex: 1 0 0;
		align-self: stretch;

		@media (max-width: 768px) {
			flex: 2 0 auto;
			align-items: center;
		}

		.visual {
			display: flex;
			justify-content: center;
			align-items: center;
			border: 1px solid rgba(255, 255, 255, 0.04);
			border-radius: 16px;
			width: 80px;
			height: 80px;
			box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.08);
			background: rgba(255, 255, 255, 0.02);
		}

		.text {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 16px;
		}

		p {
			font-weight: 700;
			font-size: 24px;
			line-height: 117%;
			color: var(--white);
		}

		span {
			max-width: 320px;
			font-weight: 400;
			font-size: 16px;
			line-height: 125%;
			text-align: center;
			color: var(--gray);
		}
	}
</style>
