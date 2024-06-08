<script>
	import { LoupeIcon, ListIcon } from '$lib/shared/icons';
	import ResultCard from './resultCard.svelte';

	export let lable = '';
	export let list;
	// TODO: Сделать коллбэк на удаление и другие экшены
	export let canDelete = false;
	export let nothing = {
		title: 'Ничего не найдено',
		text: '',
		disable: false
	};
</script>

<section class:disable={Array.isArray(list) && !list.length && nothing.disable}>
	{#if !Array.isArray(list)}
		<div class="loader">
			<div class="loader-spin" />
		</div>
	{:else if list[0]}
		{#if lable}
			<h2>{lable}</h2>
		{/if}
		<ul>
			{#each list as film (film.filmId || film.id || film.kinopoiskId)}
				<ResultCard {film} {canDelete} />
			{/each}
		</ul>
	{:else if !nothing.disable}
		<div class="nothing">
			<div class="visual">
				{#if nothing.title == 'Ничего не найдено'}
					<LoupeIcon />
				{:else}
					<ListIcon />
				{/if}
			</div>
			<div class="text">
				<p>
					{nothing.title}
				</p>
				<span>
					{nothing.text}
				</span>
			</div>
		</div>
	{/if}
</section>

<style lang="scss">
	section {
		display: flex;
		max-width: 1920px;
		padding: 20px 40px;
		flex-direction: column;
		align-items: flex-start;
		gap: 32px;
		flex: 1 0 0;
		align-self: stretch;

		&.disable {
			padding: 0;
		}

		@media (max-width: 768px) {
			padding: 16px 16px 40px 16px;
		}
	}

	.loader {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 1 0 0;
		align-self: stretch;

		@media (max-width: 768px) {
			flex: 2 0 auto;
			align-items: center;
		}
	}
	.loader-spin {
		font-size: 10px;
		width: 1em;
		height: 1em;
		border-radius: 50%;
		position: relative;
		text-indent: -9999em;
		animation: mulShdSpin 1.1s infinite ease;
		transform: translateZ(0);
	}
	@keyframes mulShdSpin {
		0%,
		100% {
			box-shadow:
				0em -2.6em 0em 0em #ffffff,
				1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2),
				2.5em 0em 0 0em rgba(255, 255, 255, 0.2),
				1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2),
				0em 2.5em 0 0em rgba(255, 255, 255, 0.2),
				-1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2),
				-2.6em 0em 0 0em rgba(255, 255, 255, 0.5),
				-1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7);
		}
		12.5% {
			box-shadow:
				0em -2.6em 0em 0em rgba(255, 255, 255, 0.7),
				1.8em -1.8em 0 0em #ffffff,
				2.5em 0em 0 0em rgba(255, 255, 255, 0.2),
				1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2),
				0em 2.5em 0 0em rgba(255, 255, 255, 0.2),
				-1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2),
				-2.6em 0em 0 0em rgba(255, 255, 255, 0.2),
				-1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5);
		}
		25% {
			box-shadow:
				0em -2.6em 0em 0em rgba(255, 255, 255, 0.5),
				1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7),
				2.5em 0em 0 0em #ffffff,
				1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2),
				0em 2.5em 0 0em rgba(255, 255, 255, 0.2),
				-1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2),
				-2.6em 0em 0 0em rgba(255, 255, 255, 0.2),
				-1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
		}
		37.5% {
			box-shadow:
				0em -2.6em 0em 0em rgba(255, 255, 255, 0.2),
				1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5),
				2.5em 0em 0 0em rgba(255, 255, 255, 0.7),
				1.75em 1.75em 0 0em #ffffff,
				0em 2.5em 0 0em rgba(255, 255, 255, 0.2),
				-1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2),
				-2.6em 0em 0 0em rgba(255, 255, 255, 0.2),
				-1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
		}
		50% {
			box-shadow:
				0em -2.6em 0em 0em rgba(255, 255, 255, 0.2),
				1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2),
				2.5em 0em 0 0em rgba(255, 255, 255, 0.5),
				1.75em 1.75em 0 0em rgba(255, 255, 255, 0.7),
				0em 2.5em 0 0em #ffffff,
				-1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2),
				-2.6em 0em 0 0em rgba(255, 255, 255, 0.2),
				-1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
		}
		62.5% {
			box-shadow:
				0em -2.6em 0em 0em rgba(255, 255, 255, 0.2),
				1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2),
				2.5em 0em 0 0em rgba(255, 255, 255, 0.2),
				1.75em 1.75em 0 0em rgba(255, 255, 255, 0.5),
				0em 2.5em 0 0em rgba(255, 255, 255, 0.7),
				-1.8em 1.8em 0 0em #ffffff,
				-2.6em 0em 0 0em rgba(255, 255, 255, 0.2),
				-1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
		}
		75% {
			box-shadow:
				0em -2.6em 0em 0em rgba(255, 255, 255, 0.2),
				1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2),
				2.5em 0em 0 0em rgba(255, 255, 255, 0.2),
				1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2),
				0em 2.5em 0 0em rgba(255, 255, 255, 0.5),
				-1.8em 1.8em 0 0em rgba(255, 255, 255, 0.7),
				-2.6em 0em 0 0em #ffffff,
				-1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);
		}
		87.5% {
			box-shadow:
				0em -2.6em 0em 0em rgba(255, 255, 255, 0.2),
				1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2),
				2.5em 0em 0 0em rgba(255, 255, 255, 0.2),
				1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2),
				0em 2.5em 0 0em rgba(255, 255, 255, 0.2),
				-1.8em 1.8em 0 0em rgba(255, 255, 255, 0.5),
				-2.6em 0em 0 0em rgba(255, 255, 255, 0.7),
				-1.8em -1.8em 0 0em #ffffff;
		}
	}

	.nothing {
		display: flex;
		flex-direction: column;
		gap: 32px;
		justify-content: center;
		align-items: center;
		flex: 1 0 0;
		align-self: stretch;

		@media (max-width: 768px) {
			flex: 2 0 auto;
			align-items: center;
		}

		.visual {
			display: flex;
			justify-content: center;
			align-items: center;
			border: 1px solid rgba(255, 255, 255, 0.04);
			border-radius: 16px;
			width: 80px;
			height: 80px;
			box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.08);
			background: rgba(255, 255, 255, 0.02);
		}

		.text {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 16px;
		}

		p {
			font-weight: 700;
			font-size: 24px;
			line-height: 117%;
			color: var(--white);
		}

		span {
			max-width: 320px;
			font-weight: 400;
			font-size: 16px;
			line-height: 125%;
			text-align: center;
			color: var(--gray);
		}
	}

	h2 {
		font-weight: 700;
		font-size: 28px;
		line-height: 115%;
		color: var(--white, #fff);
	}

	ul {
		display: grid;
		gap: 32px;
		grid-template-columns: repeat(2, 1fr);
		width: 100%;

		@media (max-width: 1024px) {
			grid-template-columns: repeat(1, 1fr);
		}
	}
</style>
