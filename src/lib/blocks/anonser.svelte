<script>
	import { Cross, Arrow } from '$lib/icons';
	import { Button } from '$lib/elements';
	import { onMount } from 'svelte';

	const publish = true;
	let show = false;
	let ver = 2;

	const hideClick = () => {
		let anonse = JSON.parse(localStorage.getItem('anonse'));
		show = false;
		anonse.show = false;
		anonse.ver = ver;
		localStorage.setItem('anonse', JSON.stringify(anonse));
	};

	onMount(() => {
		if (!publish) return;

		let anonse = JSON.parse(localStorage.getItem('anonse'));
		if (!anonse) {
			anonse = {};
		}
		if (anonse.ver != ver) {
			show = true;
			anonse.ver = ver;
			anonse.show = true;
		}
		show = anonse.show;
		localStorage.setItem('anonse', JSON.stringify(anonse));
	});
</script>

<section class:hide={!show || !publish}>
	<img
		src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&color=fce802&bgcolor=1f2227&data=http://tg.skyedge.xyz"
		alt="QR code"
		height="100"
		width="100"
		draggable="false"
	/>
	<article>
		<h2>Мы в Telegram</h2>
		<p>
			Следите за этим и другими проектами в нашем телеграм канале. Ход разработки, голосования за
			итоговые решения и прочее будут выходить там.
		</p>
		<div class="more">
			<a href="https://tg.skyedge.xyz/#banner" target="_blank">
				<Button>
					Открыть TG
					<Arrow />
				</Button>
			</a>
		</div>
	</article>
	<div class="close">
		<Button circle on:click={hideClick}>
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

		&.hide {
			display: none;
		}

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
