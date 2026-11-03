<script>
	import { onDestroy, onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { Button } from '$lib/elements/button';
	import { page } from '$app/stores';
	import { apiGetFilm } from '$lib/shared/api';
	import watchHistory from '$lib/shared/scripts/watchHistory';
	import pb from '$lib/shared/pocketbase';
	import { CheckboxGroup } from '$lib/elements/checkbox';
	import { ExternalIcon } from '$lib/shared/icons';
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
	let progress;

	let lists = [
		{ id: 'planned', label: 'Буду смотреть' },
		{ id: 'view', label: 'Смотрю' }
	];

	let isTauriAndroid = false;
	let isAppFullscreen = false;

	onMount(() => {
		isTauriAndroid = '__TAURI_INTERNALS__' in window && /android/i.test(navigator.userAgent);
	});

	onDestroy(() => {
		if (isAppFullscreen) setAppFullscreen(false);
	});

	async function setAppFullscreen(state) {
		if (!isTauriAndroid) return

		isAppFullscreen = state;

		try {
			if (state) {
				await screen.orientation?.lock?.('landscape');
			} else {
				screen.orientation?.unlock?.();
			}
		} catch (error) {
			console.error(error);
		}

		try {
			const { getCurrentWindow } = await import('@tauri-apps/api/window');
			await getCurrentWindow().setFullscreen(state);
		} catch (error) {
			console.error(error);
		}
	}

	function setActiveIframe(select) {
		activeIframe = select;
	}

	function playerMessageHandler(event) {
		let message
		if (typeof event.data === "string") {
			message = JSON.parse(event.data)
		} else {
			message = event.data
		}

		if (message.event === "enterfullscreen") {
			setAppFullscreen(true)
		}
		if (message.event === "exitfullscreen") {
			document.querySelector("iframe").contentWindow.postMessage(JSON.stringify({api: "getTimeSave"}), "*");
			setAppFullscreen(false)
		}
		if (message.event === "pause") {
			document.querySelector("iframe").contentWindow.postMessage(JSON.stringify({api: "getTimeSave"}), "*");
		}
		if (message.event === "getTimeSave" && message.saveInfo.serial.season) {
			watchHistory.setProgress(params.id, message.saveInfo.serial)
		}
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
		isBlocked = blocked.includes(params.id);

		players = [
			{
				name: 'Alloha',
				iframe: 'https://robin-as.stravers.live/?token=c24c6d99f6f7cda8ec832fce104a69&kp='
			},
			{ name: 'Collaps', iframe: 'https://api.tobaco.ws/embed/kp/' }
		];
		activeIframe = players[0].iframe;

		try {
			film = await apiGetFilm(params.id);
			watchHistory.add(film);
			progress = watchHistory.get(params.id)?._kinofree?.progress ?? null

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

<svelte:window on:message={playerMessageHandler} />
<section>
	<div class="box">
		<div class="player" class:fullscreen={isAppFullscreen}>
			{#key activeIframe}
				{#if !isBlocked}
					{#if activeIframe}
						<iframe
							title="player"
							allowfullscreen="true"
							sandbox="allow-scripts allow-same-origin"
							src={activeIframe + params?.id}
							on:message={playerMessageHandler}
						></iframe>
					{/if}
				{:else}
					<ErrorTemplate
						title="Заблокированно"
						desc="По просьбе правообладателей, онлайн просмотр данного материалла недоступен"
					>
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
				<a href={`https://www.kinopoisk.ru/film/${params?.id}`} target="_blank">
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
				{#if progress}
					<span>Вы остановились на {progress.episode} серии {progress.season} сезона</span>
				{/if}
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

<style lang="scss">
	@import './styles.scss';
</style>
