<script>
import {active} from "$lib/elements/popups/store-popup.js";

export let title = 'Title';
export let text = 'Text';
export let link = false;

function click() {
  $active = link
}
</script>

<div class="info__block">
  <h2 class="info__tite">{title}</h2>
  <p class="info__text">{@html text}</p>
  {#if link}
    <span class="link info__link" on:click={click}>подробнее</span>
  {/if}
</div>

<style lang="scss">
@import "../../scss/variables";
.info__block {
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 400;
  width: rel(1920, 398);
  color: #FFFFFF;

  @media (max-width: 1023px) {
    width: rel(1024, 398);
  }

  @media (max-width: 768px) {
    max-width: 398px;
    width: 100%;
  }
}

.info__tite {
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: rel(1920, 24);
  line-height: rel(1920, 28);
  margin-bottom: 20px;
  text-transform: uppercase;

  @media (max-width: 1023px) {
    font-size: 18px;
    line-height: 22px;
    margin-bottom: 5px;
  }
}

.info__text {
  font-weight: 400;
  font-size: rel(1920, 20);
  line-height: rel(1920, 24);
  color: #BFBFBF;
  margin-bottom: rel(1920, 25);

  @media (max-width: 1023px) {
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 10px;
  }
}

.info__link {
  font-size: rel(1920, 18);
  line-height: rel(1920, 22);

  @media (max-width: 1023px) {
    font-size: 16px;
    line-height: 20px;
  }
}
</style>
