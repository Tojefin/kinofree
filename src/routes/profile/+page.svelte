<script>
	import { afterNavigate } from '$app/navigation';
	import { Header, ProfileHeader, Footer, ResultList } from '$lib/blocks';
	import { getWatchHistory } from '$lib/scripts';

	let data;
	let activeList = 'history';

	afterNavigate(() => {
		data = getWatchHistory();
	});
</script>

<div class="page-main">
	<Header />
	<ProfileHeader {activeList} />
	<ResultList
		lable={null}
		list={data}
		canDelete={activeList == 'history'}
		nothing={{
			title: 'История пуста',
			text: 'Здесь будет список фильмов, которые вы смотрели на своём устройстве'
		}}
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
