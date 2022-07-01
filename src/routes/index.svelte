<script>
  import Info from "$lib/blocks/info.svelte";
  import Popup from "$lib/blocks/popup.svelte";
  import Popup_antiad from "$lib/elements/popups/antiad.svelte";
  import Popup_dmca from "$lib/elements/popups/dmca.svelte";
  import Popup_donate from "$lib/elements/popups/donate.svelte";
  import Popup_update from "$lib/elements/popups/update.svelte";
</script>

<svelte:head>
  <title>KinoFree | Смотрите кино онлайн</title>
</svelte:head>

<Info/>
<Popup>
  <Popup_antiad/>
  <Popup_dmca/>
  <Popup_donate/>
  <Popup_update/>
</Popup>
