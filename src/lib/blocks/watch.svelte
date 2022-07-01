<script>
import Player from "$lib/elements/watch/player.svelte";
import Info from "$lib/elements/watch/info.svelte";
</script>

<section class="watch">
  <Player/>
  <Info/>
</section>

<style lang="scss">
@import "../scss/variables";

.watch {
  margin-top: 80px;
  margin-left: 86px;
  display: flex;

  @media (max-width: 1023px) {
    margin-left: 20px;
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 768px) {
    margin-right: 20px;
    margin-top: 70px;
  }
}
</style>
