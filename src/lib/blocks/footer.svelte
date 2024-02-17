<script>
	import Dmca from './modals/dmca.svelte';
	import { Telegram } from '$lib/icons';

	let dmcaModal = false;
</script>

<footer>
	<div>
		<a class="tg" href="https://tg.skyedge.xyz" target="_blank"> <Telegram /> Мы в Telegram </a>
		<nav>
			<button type="button" on:click={() => (dmcaModal = true)}>Правообладателям</button>
			<!-- <span>•</span>
			<button>Соглашение</button>
			<span>•</span>
			<button>Конфиденциальность</button> -->
		</nav>
	</div>
</footer>
<Dmca bind:isShow={dmcaModal} />

<style lang="scss">
	footer {
		display: flex;
		align-self: stretch;
		padding: 20px 40px 40px 40px;
		max-width: 1920px;

		@media (max-width: 768px) {
			padding: 16px 16px 40px;
			flex: 1 0 auto;
			width: -webkit-fill-available;
		}
	}

	div {
		display: flex;
		width: -webkit-fill-available;
		justify-content: center;
		align-items: center;
		gap: 16px;
		padding: 24px 32px;
		justify-content: space-between;
		align-self: stretch;
		border-radius: 20px;
		border: 1px solid var(--light-1004, rgba(255, 255, 255, 0.04));
		background: #1f2227;

		/* Border/Glow + Blur */
		box-shadow: 0px 1px 0px 0px rgba(255, 255, 255, 0.08) inset;
		backdrop-filter: blur(32px);

		@media (max-width: 768px) {
			align-self: flex-end;
			height: fit-content;
			padding: 20px;
			gap: 32px;
			align-items: flex-start;
			flex-direction: column;
		}
	}

	.tg {
		display: flex;
		align-items: center;
		gap: 10px;
		color: #fff;

		/* text-14-bold */
		font-family: Inter;
		font-size: 14px;
		font-style: normal;
		font-weight: 500;
		line-height: 18px; /* 128.571% */
		text-decoration: none;

		@include hover {
			color: #2ca4e0;
		}
	}

	nav {
		display: flex;
		align-items: center;
		gap: 16px;

		@media (max-width: 768px) {
			align-items: flex-start;
			flex-direction: column;
		}

		span {
			color: var(--gray, #c0c0c0);
			/* text-16-bold */
			font-family: Inter;
			font-size: 16px;
			font-style: normal;
			font-weight: 700;
			line-height: 20px; /* 125% */

			@media (max-width: 768px) {
				display: none;
			}
		}

		button {
			appearance: none;
			background: none;
			border: none;
			color: var(--gray, #c0c0c0);
			font-family: Inter;
			font-size: 14px;
			font-style: normal;
			font-weight: 400;
			line-height: normal;
			text-decoration-line: underline;
			cursor: pointer;

			@include hover {
				color: var(--white, #fff);
				text-decoration-line: none;
			}
		}
	}
</style>
