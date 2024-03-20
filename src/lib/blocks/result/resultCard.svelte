<script>
	import { goto } from '$app/navigation';
	import { Arrow, Delete } from '$lib/icons';
	import { onMount } from 'svelte';
	import { apiGetFilm, removeWatchHistory } from '$lib/scripts';

	export let canDelete = false;
	export let film;
	let rating = film.rating || film.ratingKinopoisk;

	function deleteHandler() {
		removeWatchHistory(film);
		goto('');
	}

	onMount(async () => {
		if (!film.description) {
			film = await apiGetFilm(film.filmId || film.id || film.kinopoiskId);
			rating = film.rating || film.ratingKinopoisk;
		}
	});
</script>

<a href={`/watch?id=${film.filmId || film.id || film.kinopoiskId}`}>
	<li>
		<img src={film.posterUrlPreview || film.posterUrl} alt="Постер" loading="lazy" inert />
		<div class="text">
			<h3 title={film.nameRu || film.nameEn || film.nameOriginal}>
				{film.nameRu || film.nameEn || film.nameOriginal}
			</h3>
			<time>{film.year}</time>
			<p title={film.description || ''}>
				{film.description || ''}
			</p>
			<div>
				{#if rating > 0}
					<span>Кинопоиск:</span>
					<mark class:okey={rating > 3.9 && rating < 7} class:bad={rating < 4}>
						{rating}
					</mark>
				{:else}
					<span></span>
				{/if}
			</div>
		</div>
		<div class="actions">
			{#if canDelete}
				<button class="delete" on:click|preventDefault={deleteHandler} title="Удалить">
					<Delete />
				</button>
			{/if}
			<div class="arrow">
				<Arrow />
			</div>
		</div>
	</li>
</a>

<style lang="scss">
	a {
		min-width: 0;
	}

	li {
		display: flex;
		gap: 12px;
		border: 1px solid rgba(255, 255, 255, 0.04);
		border-radius: 12px;
		padding: 24px 20px;
		box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.08);
		background: #1f2227;
		transition: all 0.25s ease;
		user-select: none;

		&:hover:not(:has(.delete:hover)) {
			background: #36393d;

			h3 {
				color: var(--yellow);
			}

			.arrow {
				:global(svg path) {
					stroke: var(--yellow);
				}
			}
		}

		@media (max-width: 768px) {
			padding: 16px;
		}
	}

	img {
		border-radius: 8px;
		min-width: 150px;
		height: 200px;
		object-fit: cover;

		@media (max-width: 768px) {
			border-radius: 4px;
			min-width: 80px;
			height: 86px;
		}
	}

	.text {
		min-width: 0;
	}

	h3 {
		font-weight: 700;
		font-size: 18px;
		line-height: 135%;
		color: var(--white, #fff);
		margin-bottom: 8px;
		transition: color 0.25s ease;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	time {
		font-weight: 700;
		font-size: 18px;
		line-height: 125%;
		color: var(--gray);
		display: inline-block;
		margin-bottom: 16px;
	}

	p {
		font-weight: 400;
		font-size: 14px;
		line-height: 160%;
		color: var(--gray);
		max-height: 92px;
		display: -webkit-box;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-bottom: 16px;

		@media (max-width: 768px) {
			display: none;
		}
	}

	span {
		font-weight: 400;
		font-size: 14px;
		line-height: 130%;
		color: var(--gray);
	}

	mark {
		font-weight: 700;
		font-size: 18px;
		line-height: 135%;
		background: none;
		color: var(--green);

		&.okey {
			color: #fc9802;
		}
		&.bad {
			color: var(--red);
		}
	}

	.actions {
		display: flex;
		gap: 12px;
		position: absolute;
		bottom: 24px;
		right: 20px;
		:global(svg path) {
			transition: stroke 0.25s ease;
			stroke: var(--white, #fff);
		}
	}

	button {
		border: none;
		background: none;
		padding: 0;
	}
	.delete {
		&:hover {
			z-index: 2;
			:global(svg path) {
				stroke: var(--yellow);
			}
		}
	}
</style>
