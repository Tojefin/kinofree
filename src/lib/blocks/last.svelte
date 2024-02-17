<script>
	import { goto } from '$app/navigation';
	import { Button } from '$lib/elements';
	import { Arrow } from '$lib/icons';
	import { vibroTap } from '$lib/scripts';
	import { onMount } from 'svelte';

	let lastFilm;
	let lastTime;

	const timeOptions = {
		month: 'long',
		day: 'numeric',
		timezone: 'UTC'
	};

	function clickHandler() {
		vibroTap();
		goto('/watch?id=' + lastFilm?.kinopoiskId);
	}

	onMount(() => {
		let local = JSON.parse(localStorage.getItem('last_film'));
		if (local) {
			let { film, time } = local;
			lastFilm = film;
			lastTime = time;
		}
	});
</script>

{#if lastFilm}
	<section on:click={clickHandler} on:keydown={null} role="button" tabindex="-0">
		<div class="info">
			<img src={lastFilm.posterUrlPreview} alt="Фильм" />
			<div class="text">
				<h3>{lastFilm.nameRu || lastFilm.nameEn || lastFilm.nameOriginal}</h3>
				<div class="time">
					<p>Последний просмотр</p>
					<span>{new Date(lastTime).toLocaleString('ru', timeOptions)}</span>
				</div>
			</div>
		</div>
		<div class="more">
			<Button>
				Смотреть дальше
				<Arrow />
			</Button>
		</div>
	</section>
{/if}

<style lang="scss">
	section {
		display: flex;
		max-width: 1920px;
		margin: 20px 40px;
		padding: 20px;
		align-items: flex-end;
		gap: 8px;
		align-self: stretch;
		border-radius: 20px;
		background: var(--yellow, #fce802);
		transition: all ease 0.45s;
		cursor: pointer;
		user-select: none;

		@media (max-width: 768px) {
			margin: 16px;
			padding: 20px;
			gap: 20px;
			flex-direction: column;
			align-items: flex-start;
		}

		&:active {
			transform: scale(98%);
		}

		:global(button) {
			transition: all ease 0.25s;
		}

		@include hover {
			box-shadow: 0px 4px 64px 0px rgba(252, 232, 3, 0.2);

			:global(button) {
				background: var(--black, #000);
				color: var(--white, #fff);

				:global(svg path) {
					stroke: var(--white, #fff);
				}
			}
		}
	}

	.info {
		display: flex;
		align-items: center;
		gap: 20px;
		flex: 1 0 0;

		@media (max-width: 768px) {
			width: -webkit-fill-available;
		}

		img {
			display: flex;
			width: 64px;
			height: 64px;
			justify-content: center;
			align-items: center;
			object-fit: cover;
			border-radius: 8px;

			@media (max-width: 768px) {
				display: none;
			}
		}
		.text {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			gap: 8px;
			flex: 1 0 0;
			align-self: stretch;
			overflow: hidden;

			h3 {
				overflow: hidden;
				color: #000;
				white-space: nowrap;
				text-overflow: ellipsis;
				width: -webkit-fill-available;
				/* H4 — Desktop */
				font-family: Inter;
				font-size: 18px;
				font-style: normal;
				font-weight: 700;
				line-height: 24px; /* 133.333% */
			}
			.time {
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				gap: 2px;
				align-self: stretch;

				p {
					color: #3a393e;

					/* text-14 */
					font-family: Inter;
					font-size: 14px;
					font-style: normal;
					font-weight: 400;
					line-height: 18px; /* 128.571% */
				}
				span {
					color: #3a393e;

					/* text-14-bold */
					font-family: Inter;
					font-size: 14px;
					font-style: normal;
					font-weight: 500;
					line-height: 18px; /* 128.571% */
				}
			}
		}
	}

	.more {
		margin-top: 8px;
	}
</style>
