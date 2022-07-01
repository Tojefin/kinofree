<script>
import { onMount } from "svelte"
import Card from "$lib/elements/profile/card.svelte"

let data = [];

onMount(() => {
  loadlist()
})

function loadlist() {
  data = JSON.parse(localStorage.getItem('watch_history'));
  if (!data) {
    localStorage.setItem('watch_history', JSON.stringify([]));
    data = [];
  }
}

</script>


<section>
  <h2>История просмотра</h2>
  <div>
    {#if data[0]}
      {#each data as f }
        <Card id={f.id} poster={f.poster} name={f.name} on:updateList={loadlist}/>
      {/each}
    {:else}
      <p>Хранит 8 последних просмотров</p>
    {/if}
  </div>
</section>

<style lang="scss">
section {
  margin-top: 50px;
  margin-left: 86px;
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    margin-left: 20px;
    grid-row-gap: 40px;
  }

  @media (max-width: 567px) {
    margin-right: 20px;
    margin-top: 70px;
  }
}

h2 {
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: rel(1920, 26);
  line-height: rel(1920, 32);
  color: #FFFFFF;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 12px;
  margin-bottom: 30px;

  @media (max-width: 1024px) {
    font-size: 20px;
    line-height: 24px;
  }

  @media (max-width: 568px) {
    margin-bottom: 6px;
    font-size: 14px;
    line-height: 17px;
  }
}

p {
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: rel(1920, 16);
  line-height: rel(1920, 18);
  color: #ccc;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 12px;
  margin-bottom: 30px;

  @media (max-width: 1024px) {
    font-size: 14px;
    line-height: 16px;
  }

  @media (max-width: 568px) {
    margin-bottom: 6px;
    font-size: 12px;
    line-height: 14px;
  }
}

div {
  display: grid;
  grid-row-gap: 28px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: none;
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
  }

  @media (max-width: 567px) {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
