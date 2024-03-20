<script>
	import { goto } from '$app/navigation';
	import { Loupe, Cross, Arrow } from '$lib/icons';
	import { vibroTap, apiSearchFilm } from '$lib/scripts';
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';

	let params;
	let suggest = {
		select: -1,
		list: []
	};

	let input;
	let inputFocus = false;
	let inputValue = '';

	function focusStatus(newState) {
		inputFocus = newState;
	}
	function clearinput() {
		inputValue = '';
		input.focus();
	}
	function search() {
		if (!inputValue.trim()) return;
		goto('./search?key=' + encodeURIComponent(inputValue));
	}

	let timer = null;
	function inputHandler(e) {
		if (e.key == 'ArrowUp' || e.key == 'ArrowDown' || inputValue.trim().length < 3) return;

		if (timer) clearTimeout(timer);
		suggest.select = -1;
		timer = setTimeout(async () => {
			let { films } = await apiSearchFilm(inputValue);
			if (films) {
				suggest.list = films
					.map((obj) => {
						return { title: `${obj.nameRu || obj.nameEn} ${obj.year || ''}`, id: obj.filmId };
					})
					.slice(0, 5);
			} else {
				suggest.list = [];
			}
			suggest.list[-1] = { title: inputValue };
		}, 400);
	}

	function inputController(e) {
		if (e.key == 'Enter') search();
		if (e.key == 'ArrowUp') {
			if (suggest.list.length > 0 && suggest.select > -1) {
				suggest.select--;
				inputValue = suggest.list[suggest.select].title;
			}
		}
		if (e.key == 'ArrowDown') {
			if (suggest.list.length > 0 && suggest.select + 1 < suggest.list.length) {
				suggest.select++;
				inputValue = suggest.list[suggest.select].title;
			}
		}
	}

	afterNavigate(() => {
		params = Object.fromEntries($page.url.searchParams);
		if (params.key) {
			inputValue = params.key;
		}
	});
</script>

<div class="searchBar">
	<div class="input" class:inputFocus class:inputValue={inputValue.length && !inputFocus}>
		<div class="loupe">
			<Loupe />
		</div>
		<input
			on:focus={() => focusStatus(true)}
			on:blur={() => focusStatus(false)}
			on:keydown={inputController}
			on:keyup={inputHandler}
			bind:value={inputValue}
			bind:this={input}
			type="text"
			placeholder="Фильм или сериал"
		/>
		<button class="clear" on:click={clearinput} class:canClear={inputValue}>
			<Cross small />
		</button>

		{#if inputFocus && suggest.list.length && inputValue.trim().length > 2}
			<ul class="suggest">
				{#each suggest.list as { title, id }}
					<button
						on:pointerdown|stopPropagation={() => {
							inputValue = title
							goto(`/search?key=${title}`);
						}}
					>
						{title}
					</button>
				{/each}
			</ul>
		{/if}
	</div>
	<button
		class="search"
		disabled={!(inputValue.trim().length > 0)}
		on:pointerdown={() => {
			vibroTap();
			search();
		}}
	>
		<p>Найти</p>
		<Arrow circle />
	</button>
</div>

<style lang="scss">
	.searchBar {
		display: flex;
		gap: 8px;
		width: 100%;
	}

	.loupe {
		left: 24px;
		position: absolute;

		@media (max-width: 768px) {
			left: 20px;
		}
	}

	.clear {
		right: 24px;
		position: absolute;
		display: flex;
		background: none;
		border: none;
		visibility: hidden;
		padding: 0;

		@media (max-width: 768px) {
			right: 20px;
		}

		:global(g) {
			opacity: 0.5;
		}
		@include hover {
			:global(g) {
				opacity: 1;
			}
		}
	}
	.canClear {
		visibility: visible;
	}

	.suggest {
		top: calc(100% + 12px);
		position: absolute;
		display: flex;
		flex-direction: column;
		border-top: 1px solid #3a393e;
		border-radius: 12px;
		box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
		width: 100%;
		background: #fff;
		overflow: hidden;
		z-index: 3;

		button {
			background: #fff;
			border: none;
			text-align: start;
			font-family: var(--font-family);
			font-weight: 400;
			font-size: 14px;
			line-height: 129%;
			color: var(--black);
			padding: 12px 16px;
			@include hover {
				background: var(--gray);
			}
		}
	}

	.input {
		display: flex;
		max-width: 560px;
		width: 100%;
		height: 56px;
		align-items: center;
		cursor: pointer;
		gap: 10px;
		border-radius: 40px;
		border: 1px solid var(--light-1004, rgba(255, 255, 255, 0.04));
		background: #424549;
		box-shadow: 0px 1px 0px 0px rgba(255, 255, 255, 0.08) inset;
		transition: all ease 0.25s;

		@media (max-width: 768px) {
			max-width: 100%;
			width: -webkit-fill-available;
		}

		.loupe {
			:global(g) {
				opacity: 0.2;
			}
		}

		@include hover {
			border-radius: 40px;
			border: 1px solid var(--light-1004, rgba(255, 255, 255, 0.04));
			background: #1f2227;
			box-shadow: 0px 1px 0px 0px rgba(255, 255, 255, 0.08) inset;

			.loupe {
				:global(g) {
					opacity: 1;
				}
			}
		}

		&.inputFocus {
			border-radius: 40px;
			outline: 4px solid rgba(252, 232, 3, 0.2);
			background: #fff;
			.loupe {
				:global(g) {
					opacity: 1;
					:global(path) {
						stroke: #000;
					}
				}
			}
		}

		&.inputValue {
			border-radius: 40px;
			background: #fff;

			input {
				color: #000;
			}

			.loupe {
				:global(g) {
					opacity: 0.2;
					:global(path) {
						stroke: #000;
					}
				}
			}

			@include hover {
				border-radius: 40px;
				background: #fff;
				.loupe {
					:global(g) {
						opacity: 1;
						:global(path) {
							stroke: #000;
						}
					}
				}
			}
		}
	}

	input {
		color: #fff;
		padding: 16px 58px;
		/* text-16 */
		font-family: Inter;
		font-size: 16px;
		font-style: normal;
		font-weight: 400;
		line-height: 20px; /* 125% */
		border: none;
		max-width: 560px;
		width: 100%;
		background: none;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;

		&::placeholder {
			color: var(--gray, #c0c0c0);
		}

		&:focus {
			color: var(--black, #000);
			&::placeholder {
				color: transparent;
			}
		}
	}

	.search {
		border: none;
		display: inline-flex;
		padding: 16px 24px;
		justify-content: center;
		align-items: center;
		gap: 8px;
		border-radius: 48px;
		background: var(--yellow, #fce802);
		color: var(--black, #000);
		/* text-16-bold */
		font-family: Inter;
		font-size: 16px;
		font-style: normal;
		font-weight: 700;
		line-height: 20px; /* 125% */
		transition: all ease 0.25s;
		user-select: none;

		@media (max-width: 768px) {
			width: fit-content;
			padding: 16px;

			p {
				display: none;
			}
		}

		&:active {
			transform: scale(90%);
		}

		@include hover {
			box-shadow:
				0px 4px 64px 0px rgba(252, 232, 3, 0.32),
				0px 4px 32px 0px rgba(252, 232, 3, 0.32);
		}

		&:disabled {
			opacity: 0.2;
			&:active {
				transform: none;
			}

			@include hover {
				box-shadow: none;
			}
		}
	}
</style>
