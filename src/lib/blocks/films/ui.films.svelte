<script>
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';
	import { apiSearchFilm, apiPopularFilms, apiRecomendFilms } from '$lib/shared/api';
	import { ResultList } from '$lib/elements/result';
	import watchHistory from '$lib/shared/scripts/watchHistory';
	import pb from '$lib/shared/pocketbase';

	export let type = 'search';

	$: LoadFilms(type);

	let nothing = { disable: true };
	let params;
	let currentPage = 1;
	let films = [];
	let listName = '';
	let canDelete = false;

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
		nothing = {
			title: 'Ничего не найдено',
			text: 'Попробуйте другой запрос для поиска',
			disable: false
		};
	}

	async function getHistory() {
		films = watchHistory.get();
		nothing = {
			title: 'История пуста',
			text: 'Здесь будет список фильмов, которые вы смотрели на своём устройстве',
			disable: false
		};
		canDelete = true;
	}

	async function getBase(status) {
		films = await pb.collection('lists').getFullList({
			sort: '-created',
			filter: `status = "${status}"`
		});
		canDelete = true;
	}

	async function getRecomends() {
		params = Object.fromEntries($page.url.searchParams);
		let recomend = await apiRecomendFilms(params.id);
		films = recomend;
		listName = 'Похожие фильмы';
		nothing = {
			disable: true
		};
	}

	async function LoadFilms(type) {
		films = undefined;
		switch (type) {
			case 'search':
				await getSearch();
				break;
			case 'history':
				await getHistory();
				break;
			case 'planned':
				await getBase('planned');
				nothing = {
					title: 'Список пуст',
					text: '',
					disable: false
				};
				break;
			case 'favorite':
				await getBase('favorite');
				nothing = {
					title: 'Список пуст',
					text: '',
					disable: false
				};
				break;
			case 'viewed':
				await getBase('viewed');
				nothing = {
					title: 'Список пуст',
					text: '',
					disable: false
				};
				break;
			case 'recomends':
				await getRecomends();
				break;
			default:
				break;
		}
	}

	afterNavigate(async () => {
		LoadFilms(type);
	});
</script>

<ResultList list={films} lable={listName} {nothing} {canDelete} />
