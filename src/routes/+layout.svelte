<script>
	import { onMount } from 'svelte';
	import { Layout } from '$lib/pages/(global)/layout';
	import autoUpdate from '$lib/shared/scripts/autoUpdate';
	import externalLinks from '$lib/shared/scripts/externalLinks';

	onMount(() => {
		autoUpdate();
		externalLinks();
	});
</script>

<Layout>
	<slot />
</Layout>
