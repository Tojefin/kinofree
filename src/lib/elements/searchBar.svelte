<script>
	import { goto } from '$app/navigation';
	import { Loupe, Cross, Arrow } from '$lib/icons';
	import { vibroTap } from '$lib/scripts';
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';

	let params;

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
		goto('./search?key=' + inputValue);
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
			on:keydown={(e) => {
				if (e.key == 'Enter') search();
			}}
			bind:value={inputValue}
			bind:this={input}
			type="text"
			placeholder="Фильм или сериал"
		/>
		<button class="clear" on:click={clearinput} class:canClear={inputValue}>
			<Cross small />
		</button>
	</div>
	<button
		class="search"
		disabled={!(inputValue.length > 0)}
		on:click={() => {
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
