<script>
	import { Cross, Arrow } from '$lib/icons';
	import { Button } from '$lib/elements';
</script>

<section>
	<img src="icons/qr.svg" alt="QR code" draggable="false" />
	<article>
		<h2>Как то так вот)</h2>
		<p>
			Скоро начнётся разработка глобального обновления. Все подробности, ход разработки, голосования
			за итоговые решения и прочее будут выходить в Телеграм-канале
		</p>
		<div class="more">
			<Button>
				Подробнее
				<Arrow />
			</Button>
		</div>
	</article>
	<div class="close">
		<Button circle>
			<Cross />
		</Button>
	</div>
</section>

<style lang="scss">
	section {
		display: flex;
		margin: 20px 40px;
		padding: 24px 32px;
		align-items: center;
		gap: 32px;
		align-self: stretch;
		border-radius: 20px;
		border: 1px solid rgba(255, 255, 255, 0.04);
		background: #1f2227;
		box-shadow: 0px 1px 0px 0px rgba(255, 255, 255, 0.08) inset;

		@media (max-width: 768px) {
			margin: 16px;
			padding: 19px;
		}
	}

	img {
		@media (max-width: 768px) {
			display: none;
		}
	}

	article {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 8px;
		padding-right: 40px;

		@media (max-width: 768px) {
			padding-right: 0;
			gap: 8px;
		}
	}

	h2 {
		color: #fff;

		/* H4 — Desktop */
		font-family: Inter;
		font-size: 18px;
		font-style: normal;
		font-weight: 700;
		line-height: 24px; /* 133.333% */
	}
	p {
		color: #fff;

		/* text-14-long */
		font-family: Inter;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: 22px; /* 157.143% */

		@media (max-width: 768px) {
			font-size: 12px;
			line-height: 16px; /* 133.333% */
		}
	}

	.more {
		margin-top: 8px;

		@media (max-width: 768px) {
			margin-top: 8px;
		}
	}

	.close {
		position: absolute;
		right: 20px;
		top: 20px;

		@media (max-width: 768px) {
			right: 8px;
			top: 8px;
		}
	}
</style>
