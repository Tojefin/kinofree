<script>
	import { afterNavigate } from '$app/navigation';
	import { Button } from '$lib/elements/button';
	import { page } from '$app/stores';
	import { apiGetFilm } from '$lib/shared/api';
	import watchHistory from '$lib/shared/scripts/watchHistory';
	import pb from '$lib/shared/pocketbase';
	import { CheckboxGroup } from '$lib/elements/checkbox';

	export let film = '';

	$: rating = {
		score: film?.ratingKinopoisk || film?.ratingImdb,
		platform: film?.ratingKinopoisk ? 'Кинопоиск' : film?.ratingImdb ? 'IMDB' : ''
	};

	let isLogin;
	let isListed;

	let players = [];
	let activeIframe = '';
	let activeList = '';
	let params;

	let lists = [
		{ id: 'planned', label: 'Буду смотреть' },
		{ id: 'viewed', label: 'Просмотренно' },
		{ id: 'favorite', label: 'Любимое' }
	];

	function setActiveIframe(select) {
		activeIframe = select;
	}

	async function updateLists(id, activeList) {
		if (!activeList) {
			await pb.collection('lists').delete(isListed.id);
		}

		let data = {
			user: pb.authStore.model.id,
			film_id: id,
			status: activeList
		};

		if (isListed && activeList) {
			await pb.collection('lists').update(isListed.id, data);
		}
		if (!isListed && activeList) {
			await pb.collection('lists').create(data);
		}

		isListed = await pb.collection('lists').getFullList({
			filter: `film_id = "${params.id}"`
		});
		isListed = isListed[0];
	}

	afterNavigate(async () => {
		params = Object.fromEntries($page.url.searchParams);

		film = await apiGetFilm(params.id);
		watchHistory.add(film);

		players = [
			{
				name: 'Alloha',
				iframe: 'https://polati.newplayjj.com:9443/?token=a3fd119d8a9418f6c3f6a7ae628a41&kp='
			},
			{ name: 'Collaps', iframe: 'https://api.tobaco.ws/embed/kp/' },
			{ name: 'VideoCDN', iframe: 'https://49442664434375553.svetacdn.in/sZfbdItt5jeX?kp_id=' }
		];
		activeIframe = players[0].iframe;

		let kinobox = await fetch('https://kinobox.tv/api/players?kinopoisk=' + params.id).then((res) =>
			res.json()
		);
		kinobox = kinobox.filter((balanser) => {
			if (balanser.source == 'Kodik' && balanser.iframeUrl) {
				return true;
			}
		})[0];
		if (kinobox.source) {
			players = [...players, { name: kinobox.source, iframe: kinobox.iframeUrl }];
		}

		try {
			isLogin = pb.authStore.isValid;
			isListed = await pb.collection('lists').getFullList({
				filter: `film_id = "${params.id}"`
			});
			isListed = isListed[0];
			activeList = isListed?.status;
		} catch {}
	});
</script>

<section>
	<div class="box">
		{#if film == ''}
			Загрузка ...
		{:else}
			<div class="player">
				<iframe
					title="player"
					allowfullscreen="true"
					sandbox="allow-scripts allow-same-origin"
					src="{activeIframe}{film.kinopoiskId}"
				></iframe>
			</div>
			<aside>
				<div class="info">
					<div>
						{#if rating.score > 0}
							<span>{rating.platform}:</span>
							<mark
								class:okey={rating.score > 3.9 && rating.score < 7}
								class:bad={rating.score < 4}
							>
								{rating.score}
							</mark>
						{/if}
					</div>
					<p>
						{film.description || 'Описание не найдено'}
					</p>
				</div>

				<div class="actions">
					{#if isLogin}
						<div class="list">
							<h4>Добавить в профиль</h4>
							<div>
								<CheckboxGroup
									on:change={() => updateLists(params.id, activeList)}
									options={lists}
									bind:value={activeList}
								/>
							</div>
						</div>
					{/if}
					<div class="sources">
						<h4>Плееры</h4>
						<div>
							{#each players as player}
								<Button
									toggle
									active={activeIframe == player.iframe}
									on:click={() => setActiveIframe(player.iframe)}
								>
									{player.name}
								</Button>
							{/each}
						</div>
					</div>
				</div>
			</aside>
		{/if}
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

		@media (max-width: 1024px) {
			flex: none;
		}

		@media (max-width: 768px) {
			flex: none;
			padding: 16px;
		}
	}

	.box {
		display: flex;
		padding: 32px;
		justify-content: center;
		align-items: flex-start;
		gap: 48px;
		flex: 1 0 0;
		align-self: stretch;
		border-radius: 20px;
		border: 1px solid rgba(255, 255, 255, 0.04);
		background: #1f2227;
		box-shadow: 0px 1px 0px 0px rgba(255, 255, 255, 0.08) inset;

		@media (max-width: 1024px) {
			flex: none;
			gap: 24px;
			flex-direction: column;
		}

		@media (max-width: 768px) {
			padding: 16px;
		}
	}

	.player {
		aspect-ratio: 16/9;
		width: 100%;
		border-radius: 8px;
		overflow: hidden;
		background-color: transparent;

		iframe {
			aspect-ratio: 16/9;
			width: 100%;
		}
	}

	aside {
		display: flex;
		height: 100%;
		width: 50%;
		flex-direction: column;

		@media (max-width: 1024px) {
			width: 100%;
		}
	}

	.info {
		display: flex;
		gap: 16px;
		flex-direction: column;

		span {
			font-weight: 700;
			font-size: 18px;
			line-height: 133%;
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

		p {
			font-weight: 400;
			font-size: 16px;
			line-height: 150%;
			color: var(--white);
			max-height: 300px;
			overflow-y: scroll;
			padding-right: 5px;

			&::-webkit-scrollbar {
				width: 4px;
				border-radius: 30px;
			}

			&::-webkit-scrollbar-thumb {
				cursor: pointer;
				border-radius: 100px;
				background: #4f4c10;

				&:hover {
					background: var(--yellow, #fce802);
				}
			}

			&::-webkit-scrollbar-track {
				background-color: #13161b;
				border-radius: 100px;
			}
		}
	}

	.actions {
		padding-top: 40px;
		display: flex;
		gap: 32px;
		flex-direction: column;
	}

	.list {
		display: flex;
		flex-direction: column;
		gap: 16px;

		h4 {
			font-weight: 700;
			font-size: 16px;
			line-height: 125%;
			color: var(--gray);
		}

		div {
			display: flex;
			flex-direction: column;
			gap: 12px;
		}
	}

	.sources {
		display: flex;
		flex-direction: column;
		gap: 16px;

		h4 {
			font-weight: 700;
			font-size: 16px;
			line-height: 125%;
			color: var(--gray);
		}

		div {
			display: flex;
			flex-wrap: wrap;
			gap: 10px;
		}
	}
</style>
