<script>
	import { goto } from '$app/navigation';
	import { Button } from '$lib/elements';
	import { IconLogout } from '$lib/icons';
	import { pb } from '$lib/scripts';

	function logout() {
		pb.authStore.clear();
		goto('');
	}
</script>

<Button dark circle on:click={logout}>
	<IconLogout />
</Button>
