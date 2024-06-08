<script>
	import { LoginProviders } from '$lib/blocks/modals';

	let providerModal = false
</script>

<button class="login" on:click={() => (providerModal = true)}>
	<p>Войти в аккаунт</p>
	<span>Синхронизация списков на разных устройствах</span>
</button>
<LoginProviders bind:isShow={providerModal} />

<style lang="scss">
	button {
		display: flex;
		flex-direction: column;
		max-width: 1920px;
		padding: 20px;
		gap: 8px;
		align-self: stretch;
		border-radius: 20px;
		background: var(--yellow, #fce802);
		transition: all ease 0.45s;
		cursor: pointer;
		user-select: none;
		border: none;

		@media (max-width: 768px) {
			padding: 20px;
			gap: 20px;
			flex-direction: column;
			align-items: flex-start;
		}

		&:active {
			transform: scale(98%);
		}

		@include hover {
			box-shadow: 0px 4px 64px 0px rgba(252, 232, 3, 0.2);
		}
	}

	p {
		font-family: var(--font-family);
		font-weight: 700;
		font-size: 18px;
		line-height: 133%;
		color: var(--black);
	}

	span {
		font-family: var(--font-family);
		font-weight: 400;
		font-size: 14px;
		line-height: 129%;
		color: #3a393e;
	}
</style>
