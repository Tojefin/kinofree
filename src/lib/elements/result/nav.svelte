<script>
import { createEventDispatcher, tick } from 'svelte';
const dispatch = createEventDispatcher();

export let pagesCount = 1;
export let curPage = "1";

let manual;
</script>

<nav class="result__nav">
  {#if curPage > 1}
    <input class="button result__button" type="button" value="<" on:click={()=>dispatch('Nav', {newPage: --curPage} )}>
  {/if}

  <p>Страница
    <input type="text" bind:this={manual}
     value="{curPage}"
     on:keypress={(e)=>{if (e.charCode === 13 && manual.value <= pagesCount && manual.value > 0) dispatch('Nav', {newPage: manual.value} )}}
     on:input={manual.size = manual.value.length+1}
     maxlength="2" size={curPage.length+1} />
   / {pagesCount}</p>

  {#if pagesCount > 1 && curPage != pagesCount}
    <input class="button result__button" type="button" value=">" on:click={()=>dispatch('Nav', {newPage: ++curPage} )}>
  {/if}
</nav>

<style lang="scss">
@import "../../scss/variables";

p input {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: rel(1920, 28);
  line-height: rel(1920, 30);
  background: none;
  color: #fff;
  width: auto;

  @media (max-width: 1024px) {
    font-size: 20px;
    line-height: 24px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 16px;
  }
}

.result__nav {
  display: flex;
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: rel(1920, 28);
  line-height: rel(1920, 30);
  color: #FFFFFF;
  align-items: center;
  gap: 15px;

  @media (max-width: 1024px) {
    font-size: 20px;
    line-height: 24px;
    margin-left: 0;
    justify-content: center;
  }

  @media (max-width: 768px) {
    padding: 5px 15px;
    font-size: 14px;
    line-height: 16px;
  }
}

.result__button {
  width: fit-content;
  font-size: rel(1920, 40);

  @media (max-width: 1024px) {
    padding: 15px 25px;
    font-size: 24px;
  }

  @media (max-width: 768px) {
    padding: 15px 25px;
    font-size: 20px;
  }

  @media (max-width: 567px) {
    padding: 8px 15px;;
    font-size: 18px;
    line-height: 22px;
  }
}

</style>
