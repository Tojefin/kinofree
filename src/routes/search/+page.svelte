<script>
	import { Header, SearchHeader, Footer, ResultList } from '$lib/blocks';
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';
	import { apiSearchFilm, apiPopularFilms } from '$lib/scripts';

	let params;

	let currentPage = 1;
	let films;
	let listName = '';

	async function getFilms() {
		if (params.key) {
			let searched = await apiSearchFilm(params.key, currentPage);
			films = searched.films;
			listName = 'Вот что нашли';
		}
		if (params.popular == '') {
			let populars = await apiPopularFilms(currentPage);
			films = populars.items;
			listName = 'Популярное';
		}
	}

	afterNavigate(async () => {
		params = Object.fromEntries($page.url.searchParams);
		films = undefined;
		await getFilms();
	});
</script>

<div class="page-main">
	<Header />
	<SearchHeader />
	<ResultList
		list={films}
		lable={listName}
		nothing={{ title: 'Ничего не найдено', text: 'Попробуйте другой запрос для поиска' }}
	/>
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
