<script>
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

export let id;
export let poster;
export let name;

function removeItem() {
  let data = JSON.parse(localStorage.getItem('watch_history'));
  if (!data) {data = []}
  let target = data.filter((obj)=>obj.id == id)[0]

  if (target == undefined) {
    console.error("Error target undefined");
    return
  }

  let index = data.indexOf(target)
  data.splice(index, 1)
  localStorage.setItem('watch_history', JSON.stringify(data))

  dispatch('updateList');
}

</script>

<div class="card">
  <a href="/watch?id={id}"><img class="card__img" loading="lazy" src="{poster}"></a>
  <a href="/watch?id={id}"><h2 class="card__title" title="{name}">{name}</h2></a>
  <button on:click={removeItem}>удалить</button>
</div>

<style lang="scss">
@import "../../scss/variables";

button {
  position: absolute;
  bottom: 5px;
  right: 10px;
  text-align: right;
  color: #555;
  background: none;
  cursor: pointer;
  width: fit-content;
}

.card {
  background: #212121;
  border-radius: 20px;
  width: rel(1920, 330);
  height: rel(1920, 560);
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    max-width: 660px;
    width: rel(568, 160);
    height: rel(568, 270);
  }

  @media (max-width: 567px) {
    max-width: 528px;
    width: rel(320, 170);
    height: rel(320, 290);;
  }
}

.card__img {
  animation-duration: 3s;
  animation-name: gradientRoll;
  animation-iteration-count: 3;
  border-radius: 20px;
  aspect-ratio: 360 / 533;
  width: 100%;
}

.card__title {
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: rel(1920, 24);
  line-height: rel(1920, 32);
  color: #FFFFFF;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 0px;
  margin-bottom: 5px;
  margin-left: 10px;

  @media (max-width: 1024px) {
    font-size: 18px;
    line-height: 24px;
  }

  @media (max-width: 568px) {
    margin-bottom: 6px;
    font-size: 14px;
    line-height: 17px;
  }
}

</style>
