<script>
	import { goto, afterNavigate } from '$app/navigation';
	import { Button } from '$lib/elements';
	import { Arrow, Delete } from '$lib/icons';
	import { getWatchHistory } from '$lib/scripts';

	export let activeList = 'history';
	let nav;
	let watchHistory = [];

	function setActiveList(list) {
		activeList = list;
	}

	function clearWatchHistory() {
		localStorage.setItem('watch_history', JSON.stringify([]));
		goto(''); // обновляет страницу
	}

	function scrollFade() {
		let scrolled = nav.scrollLeft / (nav.scrollWidth - nav.clientWidth);
		if (scrolled < 0.01) {
			nav.style =
				'mask-image: linear-gradient(90deg,transparent 0%,rgba(0, 0, 0, 1) 0%,rgba(0, 0, 0, 1) 90%,transparent 100%)';
		}
		if (scrolled > 0.01 && scrolled < 0.99) {
			nav.style =
				'mask-image: linear-gradient(90deg,transparent 0%,rgba(0, 0, 0, 1) 10%,rgba(0, 0, 0, 1) 90%,transparent 100%)';
		}
		if (scrolled > 0.99) {
			nav.style =
				'mask-image: linear-gradient(90deg,transparent 0%,rgba(0, 0, 0, 1) 10%,rgba(0, 0, 0, 1) 100%,transparent 100%)';
		}
	}

	afterNavigate(() => {
		watchHistory = getWatchHistory();
	});
</script>

<section>
	<div class="top">
		<div class="back">
			<Button title="Назад" nav vibro dark circle on:click={() => history.back()}>
				<Arrow left />
			</Button>
		</div>
		<h2>Профиль</h2>
	</div>
	<div class="bottom">
		<nav bind:this={nav} on:scroll={scrollFade}>
			<Button toggle active={activeList == 'history'} on:click={() => setActiveList('history')}>
				История
			</Button>
			<!-- <Button toggle active={activeList == 'planned'} on:click={() => setActiveList('planned')}>
				Буду смотреть
			</Button>
			<Button toggle active={activeList == 'favorite'} on:click={() => setActiveList('favorite')}>
				Любимые
			</Button>
			<Button toggle active={activeList == 'viewed'} on:click={() => setActiveList('viewed')}>
				Просмотрено
			</Button> -->
		</nav>
		{#if activeList == 'history' && watchHistory.length}
			<button on:click={clearWatchHistory}>
				<Button circle dark vibro>
					<Delete />
				</Button>
				Очистить список «История»
			</button>
		{/if}
	</div>
</section>

<style lang="scss">
	section {
		display: flex;
		max-width: 1920px;
		padding: 20px 40px;
		flex-direction: column;
		gap: 40px;
		align-self: stretch;

		@media (max-width: 768px) {
			flex: none;
			padding: 16px;
		}
	}

	.top {
		display: flex;
		align-items: center;
		gap: 24px;

		h2 {
			font-weight: 700;
			font-size: 32px;
			line-height: 137%;
			color: var(--white);
		}
	}

	.bottom {
		display: flex;
		justify-content: space-between;
	}

	nav {
		overflow-x: scroll;
		transition: all 0.25s ease;
		mask-image: linear-gradient(90deg, rgba(0, 0, 0, 1) 90%, transparent 100%);
		display: flex;
		flex: 1 0 0;
		gap: 10px;

		&::-webkit-scrollbar {
			width: 0px;
			height: 0px;
		}

		:global(button) {
			padding: 10px 20px;
		}
	}

	button {
		appearance: none;
		border: none;
		background: none;
		padding: 0;
		display: flex;
		align-items: center;
		gap: 12px;

		font-weight: 500;
		font-size: 14px;
		line-height: 129%;
		color: var(--white);
		transition: all 0.25s ease;

		&:active {
			transform: scale(90%);
		}

		&:hover {
			:global(.circle) {
				padding: 7px;
				background: rgba(255, 255, 255, 0.25);

				:global(svg path) {
					stroke: var(--yellow, #fce802);
				}
			}
		}

		:global(.circle) {
			padding: 7px;
		}
	}

	.back {
		@media (max-width: 768px) {
			display: none;
		}
	}
</style>
