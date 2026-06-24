<script>
	import { afterNavigate } from '$app/navigation';
	import { Button } from '$lib/elements/button';
	import { page } from '$app/stores';
	import { apiGetFilm } from '$lib/shared/api';
	import watchHistory from '$lib/shared/scripts/watchHistory';
	import pb from '$lib/shared/pocketbase';
	import { CheckboxGroup } from '$lib/elements/checkbox';
	import { ArrowIcon, ExternalIcon } from '$lib/shared/icons';
	import { ErrorTemplate } from '$lib/elements/error';
	import { CrossIcon, RefreshIcon } from '$lib/shared/icons';
	import blocked from '$lib/shared/stores/blocked';

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
	let isBlocked;

	let lists = [
		{ id: 'planned', label: 'Буду смотреть' },
		{ id: 'view', label: 'Смотрю' }
	];

	function setActiveIframe(select) {
		activeIframe = select;
	}

	async function updateLists(id, activeList) {
		if (!activeList && isListed) {
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
		isBlocked = blocked.includes(params.id)

		film = await apiGetFilm(params.id);
		watchHistory.add(film);

		players = [
			{
				name: 'Alloha',
				iframe: 'https://attractive-as.allarknow.online/?token=a3fd119d8a9418f6c3f6a7ae628a41&kp='
			},
			{ name: 'Collaps', iframe: 'https://api.tobaco.ws/embed/kp/' },
			{ name: 'Lumex', iframe: 'https://49442664434375553.svetacdn.in/sZfbdItt5jeX?kp_id=' }
		];
		activeIframe = players[0].iframe;

		try {
			isLogin = pb.authStore.isValid;
			if (isLogin) {
				isListed = await pb.collection('lists').getFullList({
					filter: `film_id = "${params.id}"`
				});
				isListed = isListed[0];
				activeList = isListed?.status;
			}
		} catch (error) {
			console.error(error);
		}
	});
</script>

{#if film != ''}
	<section>
		<div class="box">
			<div class="player">
				{#key activeIframe}
					{#if !isBlocked}
						<iframe
							title="player"
							allowfullscreen="true"
							sandbox="allow-scripts allow-same-origin"
							src={activeIframe + film.kinopoiskId}
						></iframe>
					{:else}
						<ErrorTemplate title="Заблокированно" desc="По просьбе правообладателей, онлайн просмотр данного материалла недоступен">
							<CrossIcon slot="icon" />
							<a href="/" slot="action">
								<Button>
									Перейти на главную <RefreshIcon />
								</Button>
							</a>
						</ErrorTemplate>
					{/if}
				{/key}
			</div>
			<aside>
				<div class="info">
					<a href={`https://www.kinopoisk.ru/film/${params.id}`} target="_blank">
						<div class="rating">
							{#if rating.score > 0}
								<mark
									class:okey={rating.score > 3.9 && rating.score < 7}
									class:bad={rating.score < 4}
								>
									{rating.score}
								</mark>
								<span>{rating.platform}</span>
								<ExternalIcon />
							{/if}
						</div>
					</a>
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
					{#if !isBlocked}
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
					{/if}
				</div>
			</aside>
		</div>
	</section>
{/if}

<style lang="scss">
	@import './styles.scss';
</style>
