<script lang="ts">
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';
	import { apiSearchFilm, apiPopularFilms } from '$lib/shared/api';
	import { ResultList } from '$lib/elements/result';
	import watchHistory from '$lib/shared/scripts/watchHistory';
	

	export let type = 'search';

	let errorText = { title: 'Ничего не найдено', text: 'Попробуйте другой запрос для поиска', disable: false };
	let params;
	let currentPage = 1;
	let films;
	let listName = '';

	async function getSearch() {
		params = Object.fromEntries($page.url.searchParams);
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
	async function getLastViewed() {
		films = watchHistory.get();
		errorText = {
			title: 'История пуста',
			text: 'Здесь будет список фильмов, которые вы смотрели на своём устройстве',
			disable: false
		};
	}
	async function getSimilar() {
		params = Object.fromEntries($page.url.searchParams);
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
		films = undefined;
		switch (type) {
			case 'search':
				await getSearch();
				break;
			case 'lastviewed':
				await getLastViewed();
				break;
			case 'similar':
				await getSimilar();
				break;
			default:
				break;
		}
	});
</script>

<ResultList list={films} lable={listName} nothing={errorText} />
