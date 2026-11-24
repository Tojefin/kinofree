<script>
	import { onDestroy } from 'svelte';
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

	let inPlayer = false;
	let focusPollingInterval = null;
	let focusLostTicks = 0;
	let lastPlayerMessage = 0;
	let nativeFullscreen = false;

	onDestroy(() => {
		stopFocusPolling();
	});

	// Пассивная проверка: можно ли сейчас безопасно перехватить фокус.
	// Не используем события fullscreenchange — только текущее состояние,
	// т.к. у разных плееров полный экран реализован по-разному.
	function canTakeFocus() {
		if (nativeFullscreen) return false; // нативный полноэкранный слой (Android TV) — пульт у плеера
		if (document.hidden) return false; // страница скрыта
		if (!document.hasFocus()) return false; // окно не в фокусе
		if (document.fullscreenElement || document.webkitFullscreenElement) return false; // DOM-полноэкран
		if (Date.now() - lastPlayerMessage < 2000) return false; // плеер только что присылал сообщение — он жив
		return true;
	}

	// Событие приходит из нативного слоя (Kotlin FullscreenChromeClient)
	function handleAppFullscreen(event) {
		nativeFullscreen = !!event.detail;
		if (nativeFullscreen) {
			focusLostTicks = 0;
			// удерживаем DOM-фокус в плеере, если он слетел при переходе в полный экран
			if (inPlayer) {
				const iframe = document.querySelector('iframe');
				if (iframe && document.activeElement !== iframe) iframe.focus();
			}
		} else if (inPlayer) {
			// вышли из нативного фулскрина — возвращаем фокус на оверлей
			returnToOverlay(true);
		}
	}

	function startFocusPolling() {
		stopFocusPolling();
		focusLostTicks = 0;
		focusPollingInterval = setInterval(() => {
			if (!inPlayer) {
				stopFocusPolling();
				return;
			}
			if (!canTakeFocus()) {
				focusLostTicks = 0;
				return;
			}
			const iframe = document.querySelector('iframe');
			if (iframe && document.activeElement !== iframe && !iframe.matches(':focus')) {
				focusLostTicks++;
				// Возвращаем фокус только после трёх проверок подряд (~1.2 с),
				// чтобы не мешать кратковременной потере фокуса при переходе в полный экран
				if (focusLostTicks >= 3) returnToOverlay();
			} else {
				focusLostTicks = 0;
			}
		}, 400);
	}

	function stopFocusPolling() {
		if (focusPollingInterval) {
			clearInterval(focusPollingInterval);
			focusPollingInterval = null;
		}
	}

	function returnToOverlay(force = false) {
		// Никогда не перехватываем фокус, когда страница скрыта или активен полноэкран
		if (nativeFullscreen) return;
		if (document.hidden || !document.hasFocus()) return;
		if (document.fullscreenElement || document.webkitFullscreenElement) return;
		// Плеер недавно присылал сообщение — он жив, не мешаем (кроме явного выхода из полного экрана)
		if (!force && Date.now() - lastPlayerMessage < 2000) return;
		inPlayer = false;
		stopFocusPolling();
		const overlay = document.querySelector('.player-overlay');
		if (overlay) overlay.focus();
	}

	function handleOverlayKeydown(event) {
		const key = event.keyCode || event.which;
		// Enter (13), Space (32), DPAD_CENTER (179 на некоторых Android TV)
		if (key === 13 || key === 32 || key === 179) {
			event.preventDefault();
			const iframe = document.querySelector('iframe');
			if (iframe) {
				iframe.focus();
				inPlayer = true;
				startFocusPolling();
			}
		}
	}

	function handleWindowFocus() {
		// Окно снова получило фокус (например, вернулись из полноэкранного слоя)
		if (inPlayer && document.activeElement === document.body) {
			// Даём плееру шанс самому вернуть фокус, проверяем с задержкой
			setTimeout(() => {
				if (inPlayer && document.activeElement === document.body) {
					returnToOverlay();
				}
			}, 1500);
		}
	}

	function setActiveIframe(select) {
		activeIframe = select;
		inPlayer = false;
		stopFocusPolling();
	}

	function playerMessageHandler(event) {
		let message;
		if (typeof event.data === 'string') {
			try {
				message = JSON.parse(event.data);
			} catch {
				return;
			}
		} else {
			message = event.data;
		}

		if (!message || typeof message !== 'object') return;
		lastPlayerMessage = Date.now();

		if (message.event === 'exitfullscreen') {
			document
				.querySelector('iframe')
				.contentWindow.postMessage(JSON.stringify({ api: 'getTimeSave' }), '*');
			// Явный выход из полного экрана — возвращаем фокус на оверлей
			returnToOverlay(true);
		}
		if (message.event === 'pause') {
			document
				.querySelector('iframe')
				.contentWindow.postMessage(JSON.stringify({ api: 'getTimeSave' }), '*');
		}
		if (message.event === 'getTimeSave' && message?.saveInfo?.serial?.season) {
			watchHistory.setProgress(params.id, message.saveInfo.serial);
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
			progress = watchHistory.get(params.id)?._kinofree?.progress ?? null;

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

<svelte:window
	on:message={playerMessageHandler}
	on:focus={handleWindowFocus}
	on:appfullscreen={handleAppFullscreen}
/>
<section>
	<div class="box">
		<div class="player">
			{#key activeIframe}
				{#if !isBlocked}
					{#if activeIframe}
						<button
							class="player-overlay"
							class:active={inPlayer}
							aria-label="Управление плеером"
							on:keydown={handleOverlayKeydown}
						>
							{#if !inPlayer}
								<span class="hint">OK — перейти в плеер</span>
							{/if}
						</button>
						<iframe
							title="player"
							allowfullscreen="true"
							tabindex="-1"
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
