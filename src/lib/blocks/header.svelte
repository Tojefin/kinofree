<script>
	import { Coffee, Chart, User } from '$lib/icons';
	import { Button } from '$lib/elements';
	import { vibroTap } from '$lib/scripts';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let donater = 'Поддержать проект';

	onMount(async () => {
		if (Math.random() > 0.5) {
			let data = await fetch('https://last-donation-api.vercel.app/api/last_donation');
			data = await data.json();
			if (data) {
				donater = `${data.donator_info.name} - ${data.amount} ${data.origin_currency}`;
			}
		}
	});
</script>

<header>
	<a href="/"><h1>KINOFREE</h1></a>
	<nav class:hideMobile={$page.url.pathname != '/'}>
		<a class="button" href="https://www.donationalerts.com/r/tojefin" target="_blank">
			<Button nav vibro dark style="white-space: nowrap; overflow: hidden;">
				<Coffee />
				{donater}
			</Button>
		</a>
		<a class="button" href="/search?popular">
			<Button nav vibro dark>
				<Chart />
				Популярно сейчас
			</Button>
		</a>
	</nav>
	<a class="profile" href="/profile">
		<button on:click={vibroTap}>
			<User />
			<p>Профиль</p>
		</button>
	</a>
</header>

<style lang="scss">
	header {
		padding: 40px 40px 20px;
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: 32px;
		align-self: stretch;
		justify-content: space-between;

		@media (max-width: 1024px) {
			grid-template-columns: auto auto;
			align-items: stretch;
		}

		@media (max-width: 768px) {
			padding: 40px 16px 20px;
		}
	}

	h1 {
		color: var(--white, #fff);
		cursor: pointer;
		font-family: Inter;
		font-size: 3rem;
		font-style: normal;
		font-weight: 800;
		line-height: 3.875rem; /* 129.167% */
		letter-spacing: -0.24rem;

		transition: all ease 0.25s;

		@include hover {
			color: var(--yellow, #fce802);
		}
	}

	nav {
		display: flex;
		align-items: center;
		gap: 16px;
		width: inherit;
		width: 100%;

		@media (max-width: 1024px) {
			grid-row: 2;
			grid-column: 1 / span 2;
		}
	}

	.hideMobile {
		@media (max-width: 768px) {
			display: none;
		}
	}

	.profile {
		align-self: center;
		justify-self: end;

		button {
			display: flex;
			padding: 11px 24px;
			height: 100%;
			align-items: center;
			gap: 10px;
			border-radius: 16px;
			border: 1px solid var(--light-1004, rgba(255, 255, 255, 0.04));
			background: #1f2227;
			box-shadow: 0px 1px 0px 0px rgba(255, 255, 255, 0.08) inset;
			user-select: none;

			transition: all ease 0.25s;

			:global(svg path) {
				transition: all ease 0.25s;
			}

			color: var(--white, #fff);
			/* text-16-bold */
			font-family: Inter;
			font-size: 16px;
			font-style: normal;
			font-weight: 700;
			line-height: 20px; /* 125% */
			text-decoration: none;

			&:active {
				transform: scale(90%);
			}

			@include hover {
				border: 1px solid #36393d;
				background: rgba(255, 255, 255, 0.15);
				box-shadow: 0px 1px 0px 0px rgba(255, 255, 255, 0.08) inset;
				color: var(--yellow, #fce802);

				:global(svg path) {
					stroke: var(--yellow, #fce802);
				}
			}

			@media (max-width: 1024px) {
				margin: 0;
				height: auto;
				display: inline-flex;
				padding: 12px;
				align-items: center;
				border-radius: 32px;
				border: 1px solid var(--light-1004, rgba(255, 255, 255, 0.04));
				background: #1f2227;
				box-shadow: 0px 1px 0px 0px rgba(255, 255, 255, 0.08) inset;

				p {
					display: none;
				}
			}
		}
	}

	a {
		text-decoration: none;
	}
	.button {
		@media (max-width: 1024px) {
			width: -webkit-fill-available;
			height: 100%;
		}
	}
</style>
