<script>
	import { createEventDispatcher } from 'svelte';
	import { Checkbox } from '$lib/elements/checkbox';
	export let options = [];
	const dispatch = createEventDispatcher();

	export let value = '';

	$: dispatch('change', value)

</script>

{#each options as item}
	<Checkbox
		id={item.id}
		label={item.label}
		checked={value == item.id ? true : false}
		on:input={(e) => {
			value = e.target.checked ? item.id : undefined;
		}}
	/>
{/each}
