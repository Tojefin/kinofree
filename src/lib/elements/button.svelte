<script>
	import { onMount } from 'svelte';
	import { vibroTap } from '$lib/scripts';
	export let contrast = false;
	export let circle = false;
	export let dark = false;
	export let nav = false;
	export let toggle = false;
	export let active = false;
	export let vibro = false;

	let element;

	onMount(() => {
		element.addEventListener('click', () => {
			if (vibro) {
				vibroTap();
			}
		});
	});
</script>

<button
	bind:this={element}
	class:contrast
	class:circle
	class:dark
	class:nav
	class:toggle
	class:active
	{...$$restProps}
	on:click
>
	<slot />
</button>

<style lang="scss">
	button {
		appearance: none;
		border: none;
		display: flex;
		padding: 11px 24px;
		align-items: center;
		gap: 8px;
		border-radius: 32px;
		background: var(--white, #fff);
		color: var(--black, #000);
		font-family: Inter;
		font-size: 14px;
		font-weight: 500;
		line-height: 18px; /* 128.571% */
		user-select: none;

		transition: all ease 0.25s;

		:global(svg path) {
			transition: all ease 0.25s;
		}

		&.toggle {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			flex-direction: row;
			gap: 10px;
			border: 1px solid rgba(255, 255, 255, 0.15);
			border-radius: 24px;
			padding: 10px 20px;
			box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.08);
			background: #1f2227;
			color: #fff;
			text-wrap: nowrap;

			&:hover {
				box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.08);
				background: #36393d;
			}

			&.active {
				color: #000;
				box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.08);
				background: var(--white);
			}
		}

		&.dark {
			color: #fff;
			border: 1px solid var(--light-1004, rgba(255, 255, 255, 0.04));
			background: #1f2227;
			box-shadow: 0px 1px 0px 0px rgba(255, 255, 255, 0.08) inset;

			:global(svg path) {
				stroke: var(--white, #fff);
			}

			@include hover {
				background: rgba(255, 255, 255, 0.15);
				color: var(--yellow, #fce802);

				:global(svg path) {
					stroke: var(--yellow, #fce802);
				}
			}
		}

		&.nav {
			display: flex;
			padding: 11px 24px;
			height: 100%;
			align-items: center;
			max-width: 250px;
			gap: 10px;
			border-radius: 16px;

			font-size: 16px;
			font-weight: 700;
			line-height: 20px; /* 125% */
			text-decoration: none;

			@media (max-width: 1024px) {
				max-width: inherit;
				display: flex;
				width: inherit;
				padding: 12px;
				flex-direction: column;
				justify-content: flex-start;
				align-items: flex-start;
				gap: 10px;
				border-radius: 12px;
				font-size: 14px;
				font-weight: 500;
				line-height: 18px; /* 128.571% */
				text-align: left;
			}

			&:active {
				transform: scale(90%);
			}

			@include hover {
				@media (max-width: 1024px) {
					border-radius: 12px;
				}

				border-radius: 16px;
			}
		}

		&.contrast {
			background: var(--yellow, #fce802);
		}

		&.circle {
			margin: 0;
			display: inline-flex;
			padding: 12px;
			align-items: center;
			gap: 10px;
			border-radius: 32px;
			border: 1px solid var(--light-1004, rgba(255, 255, 255, 0.04));
			background: var(--white, #fff);
			box-shadow: 0px 1px 0px 0px rgba(255, 255, 255, 0.08) inset;

			@media (max-width: 768px) {
				&.dark {
					padding: 12px;
				}

				padding: 0px;
				gap: 0;
				border: none;
				background: none;
				box-shadow: none;

				:global(svg path) {
					stroke: var(--white, #fff);
				}
			}

			&.dark {
				border: 1px solid var(--light-1004, rgba(255, 255, 255, 0.04));
				background: #1f2227;
				box-shadow: 0px 1px 0px 0px rgba(255, 255, 255, 0.08) inset;

				:global(svg path) {
					stroke: var(--white, #fff);
				}
			}
		}

		@include hover {
			background: var(--black, #000);
			color: var(--white, #fff);

			&.contrast {
				background: #414016;
			}

			&.circle {
				background: none;

				&.dark {
					border-radius: 32px;
					border: 1px solid #36393d;
					background: rgba(255, 255, 255, 0.25);
					box-shadow: 0px 1px 0px 0px rgba(255, 255, 255, 0.08) inset;

					@media (max-width: 768px) {
						padding: 12px;
						gap: 0;
					}
				}

				:global(svg path) {
					stroke: var(--yellow, #fce802);
				}
			}

			:global(svg path) {
				stroke: var(--white, #fff);
			}
		}
	}
</style>
