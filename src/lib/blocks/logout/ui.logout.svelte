<script>
	import { goto } from '$app/navigation';
	import { Button } from '$lib/elements/button';
	import { LogoutIcon } from '$lib/shared/icons';
	import pb from '$lib/shared/pocketbase';

	function logout() {
		pb.authStore.clear();
		goto('');
	}
</script>

<Button dark circle on:click={logout}>
	<LogoutIcon />
</Button>
