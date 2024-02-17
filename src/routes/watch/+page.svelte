<script>
	import { Header, WatchHeader, WatchPlayer, ResultList, Footer } from '$lib/blocks';
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';
	import { apiGetFilm, addWatchHistory, setLastFilm } from '$lib/scripts';

	let params;
	let film;

	afterNavigate(async () => {
		params = Object.fromEntries($page.url.searchParams);
		film = await apiGetFilm(params.id);
		addWatchHistory(film);
		setLastFilm(film);
	});
</script>

<div class="page-main">
	<Header />
	<WatchHeader title={film?.nameRu || film?.nameEn || film?.nameOriginal} year={film?.year} />
	<WatchPlayer {film} />
	<!-- <ResultList lable="Похожие фильмы" /> -->
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
