<script>
	import { Header, WatchHeader, WatchPlayer, ResultList, Footer } from '$lib/blocks';
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';
	import { apiGetFilm, addWatchHistory, apiRecomendFilms } from '$lib/scripts';

	let params;
	let film;
	let recomends;

	afterNavigate(async () => {
		params = Object.fromEntries($page.url.searchParams);
		film = await apiGetFilm(params.id);
		recomends = await apiRecomendFilms(params.id);
		addWatchHistory(film);
	});
</script>

<div class="page-main">
	<Header />
	<WatchHeader title={film?.nameRu || film?.nameEn || film?.nameOriginal} year={film?.year} />
	{#if film}
		<WatchPlayer {film} />
	{/if}
	<ResultList list={recomends} lable="Похожие фильмы" nothing={{ disable: true }} />
	<Footer />
</div>

<style lang="scss">
	.page-main {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100vh;
	}
</style>
