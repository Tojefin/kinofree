<script>
	import { Button } from '$lib/elements/button';
	import { CrossIcon } from '$lib/shared/icons';

	export let isShow;

	let dialog;

	function closeModal() {
		dialog.close();
	}

	$: if (dialog && isShow) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	aria-modal="true"
	bind:this={dialog}
	on:close={() => (isShow = false)}
	on:click|self={closeModal}
	on:click|stopPropagation
	{...$$restProps}
>
	<!-- <div class="box">

	</div> -->

	<div class="close">
		<Button circle autofocus on:click={closeModal}>
			<CrossIcon />
		</Button>
	</div>
	<div class="header">
		<slot name="title" />
		<slot name="subtitle" />
	</div>
	<div class="content">
		<slot name="content" />
	</div>
	<div class="footer">
		<slot name="footer" />
	</div>
</dialog>

<style lang="scss">
	dialog[open] {
		position: fixed;
		border-radius: 20px;
		padding: 48px 40px;
		margin: 80px auto;
		overflow: hidden;
		height: min-content;
		width: 100%;
		max-width: 800px;
		max-height: -webkit-fill-available;
		border: 1px solid rgba(255, 255, 255, 0.04);
		background: #1f2227;
		box-shadow: 0px 1px 0px 0px rgba(255, 255, 255, 0.08) inset;
		display: flex;
		flex-direction: column;

		&::backdrop {
			background: rgba(0, 0, 0, 0.6);
			backdrop-filter: blur(7.5px);
			animation: fade 0.25s ease-out;
			overscroll-behavior: contain;
			cursor: pointer;
			position: fixed;
		}
		&.close::backdrop {
			animation: fade 0.25s ease-out;
			animation-direction: reverse;
		}

		@media (max-width: 768px) {
			box-shadow: none;
			border: none;
			border-radius: 0;
			margin: 0;
			height: 100vh;
			position: fixed;
		}

		@keyframes fade {
			from {
				opacity: 0;
			}
			to {
				opacity: 1;
			}
		}
	}

	.header {
		padding-bottom: 12px;

		:global(h2) {
			margin-bottom: 4px;
			color: #fff;

			/* H2 — Desktop */
			font-size: 28px;
			font-weight: 700;
			line-height: 32px; /* 114.286% */
		}
		:global(span) {
			color: var(--gray, #c0c0c0);

			/* text-16-long */
			font-size: 16px;
			font-weight: 400;
			line-height: 24px; /* 150% */
		}
	}

	.content {
		overflow-y: scroll;
		padding: 24px 20px 44px 0;
		margin-bottom: -40px;
		mask-image: linear-gradient(to bottom, black 90%, transparent 100%);
		&::-webkit-scrollbar {
			width: 8px;
		}

		&::-webkit-scrollbar-track {
			background-color: none;
			border-radius: 100px;
		}

		&::-webkit-scrollbar-thumb {
			cursor: pointer;
			border-radius: 100px;
			background: #4f4c10;

			&:hover {
				background: var(--yellow, #fce802);
			}
		}

		:global(h3) {
			margin-bottom: 24px;
			color: #fff;

			/* H4 — Desktop */
			font-size: 18px;
			font-weight: 700;
			line-height: 24px; /* 133.333% */
		}
		:global(p) {
			color: #fff;

			/* text-16-long */
			font-size: 16px;
			font-weight: 400;
			line-height: 24px; /* 150% */
		}
	}

	.footer {
		padding-top: 12px;

		@media (max-width: 768px) {
			width: 100%;
			:global(button) {
				width: 100%;
				justify-content: space-between;
			}
		}
	}

	.close {
		position: absolute;
		top: 16px;
		right: 16px;
	}
</style>
