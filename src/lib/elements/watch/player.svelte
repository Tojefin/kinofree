<script>
import { playerSrc, filmId } from "./store.js"
import { onMount } from 'svelte';
import { getUrlVars } from "$lib/js/tools.js"
import { afterNavigate } from '$app/navigation';


afterNavigate(() => {
  init()
})
onMount(() => {
  init()
})

function init() {
  let urlvars = getUrlVars()
  $filmId = urlvars.id
  $playerSrc = `https://api.framprox.ws/embed/kp/${$filmId}`
}
</script>

<iframe class="watch__player" allowfullscreen sandbox="allow-same-origin allow-scripts" allow="autoplay *" src="{$playerSrc}"></iframe>

<style lang="scss">
@import "../../scss/variables";
.watch__player {
  min-width: rel(1920, 980);
  aspect-ratio: 16 / 9;
  border-radius: 20px;
  animation-duration: 3s;
  animation-name: gradientRoll;
  animation-iteration-count: infinite;
  margin-right: 5%;

  @media (max-width: 1024px) {
    max-width: 660px;
    width: rel(568, 528);
    margin-bottom: 25px;
  }

  @media (max-width: 567px) {
    max-width: 528px;
    width: rel(320, 280);
  }
}
</style>
