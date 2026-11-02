<script>
	import { onMount } from 'svelte';
	import { Layout } from '$lib/pages/(global)/layout';
	import autoUpdate from '$lib/shared/scripts/autoUpdate';

	onMount(autoUpdate);
</script>

<Layout>
	<slot />
</Layout>
