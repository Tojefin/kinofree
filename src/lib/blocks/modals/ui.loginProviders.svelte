<script>
	import { goto } from '$app/navigation';
	import pb from '$lib/shared/pocketbase';
	import { ModalBox } from '$lib/elements/mobalBox';

	export let isShow;

	async function auth() {
		await pb.collection('users').authWithOAuth2({ provider: 'google' });
		goto('');
	}
</script>

<ModalBox bind:isShow>
	<h2 slot="title">Вход в Kinofree</h2>
	<section slot="content">
		<span>Войдите через удобный вам сервис</span>
		<ul>
			<button on:click={auth}><img src="/icons/google.svg" alt="google" /></button>
		</ul>
	</section>
</ModalBox>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}
	button {
		background: none;
		border: none;
	}
</style>
