<script>
import { onMount } from 'svelte';
import createSliders from "$lib/js/sliders.js"
import Selector from "$lib/blocks/selector.svelte"

onMount(() => {
  createSliders()
});

</script>

<script context="module">
export let filmtype = 'ALL'
function selecttype(event) {
  switch (event.detail.value) {
    case 0:
      filmtype = 'ALL'
      break;
    case 1:
      filmtype = 'FILM'
      break;
    case 2:
      filmtype = 'TV_SHOW'
      break;
    default:
      filmtype = 'ALL'
  }
}

export let filmsort = 'RATING'
function selectsort(event) {
  switch (event.detail.value) {
    case 0:
      filmsort = 'RATING'
      break;
    case 1:
      filmsort = 'YEAR'
      break;
    default:
      filmsort = 'RATING'
  }
}
</script>

<div class="search__advanced">
  <ul class="search__category-list">
    <li class="search__category-item"><input type=checkbox value="24"> <span>Аниме</span></li>
    <li class="search__category-item"><input type=checkbox value="8"> <span>Биография</span></li>
    <li class="search__category-item"><input type=checkbox value="11"> <span>Боевик</span></li>
    <li class="search__category-item"><input type=checkbox value="10"> <span>Вестерн</span></li>
    <li class="search__category-item"><input type=checkbox value="14"> <span>Военный</span></li>
    <li class="search__category-item"><input type=checkbox value="5"> <span>Детектив</span></li>
    <li class="search__category-item"><input type=checkbox value="33"> <span>Детский</span></li>
    <li class="search__category-item"><input type=checkbox value="28"> <span>Для взрослых</span></li>
    <li class="search__category-item"><input type=checkbox value="22"> <span>Документальный</span></li>
    <li class="search__category-item"><input type=checkbox value="2"> <span>Драма</span></li>
    <li class="search__category-item"><input type=checkbox value="31"> <span>Игра</span></li>
    <li class="search__category-item"><input type=checkbox value="15"> <span>История</span></li>
    <li class="search__category-item"><input type=checkbox value="13"> <span>Комедия</span></li>
    <li class="search__category-item"><input type=checkbox value="27"> <span>Концерт</span></li>
    <li class="search__category-item"><input type=checkbox value="23"> <span>Короткометражка</span></li>
    <li class="search__category-item"><input type=checkbox value="3"> <span>Криминал</span></li>
    <li class="search__category-item"><input type=checkbox value="4"> <span>Мелодрама</span></li>
    <li class="search__category-item"><input type=checkbox value="16"> <span>Музыка</span></li>
    <li class="search__category-item"><input type=checkbox value="18"> <span>Мультфильм</span></li>
    <li class="search__category-item"><input type=checkbox value="20"> <span>Мюзикл</span></li>
    <li class="search__category-item"><input type=checkbox value="26"> <span>Новости</span></li>
    <li class="search__category-item"><input type=checkbox value="7"> <span>Приключения</span></li>
    <li class="search__category-item"><input type=checkbox value="30"> <span>Реальное ТВ</span></li>
    <li class="search__category-item"><input type=checkbox value="19"> <span>Семейный</span></li>
    <li class="search__category-item"><input type=checkbox value="21"> <span>Спорт</span></li>
    <li class="search__category-item"><input type=checkbox value="32"> <span>Ток-шоу</span></li>
    <li class="search__category-item"><input type=checkbox value="1"> <span>Триллер</span></li>
    <li class="search__category-item"><input type=checkbox value="17"> <span>Ужасы</span></li>
    <li class="search__category-item"><input type=checkbox value="6"> <span>Фантастика</span></li>
    <li class="search__category-item"><input type=checkbox value="9"> <span>Фильм-нуар</span></li>
    <li class="search__category-item"><input type=checkbox value="12"> <span>Фэнтези</span></li>
    <li class="search__category-item"><input type=checkbox value="29"> <span>Церемония</span></li>
  </ul>

  <div class="search__sliders">
    <div class="search__slider search__slider--years" id="years-slider"></div>
    <div class="search__slider search__slider--rating" id="rating-slider"></div>
  </div>

  <div class="search__selects">
    <div>
      <label class="search__select-label" for="film-type">Тип</label>
      <Selector
        id={"film-type"}
        className={"select--search"}
        value={0}
        options={["Любое", "Фильм", "Сериал"]}
        on:optionselect={selecttype}
      />
    </div>
    <div>
      <label class="search__select-label" for="sorting">Сортировка</label>
      <Selector
        id={"sorting"}
        className={"select--search"}
        value={0}
        options={["Рейтинг", "Год выпуска"]}
        on:optionselect={selectsort}
      />
    </div>
  </div>
</div>


<style lang="scss">
@import "../../scss/variables";

.search__advanced {
  align-items: baseline;
  max-height: 0;
  padding: 10px;
  overflow: hidden;
  font-family: 'Roboto', sans-serif;

  @media (min-width: 535px) {
    display: flex;
    max-height: inherit;
    align-items: flex-start;
  }
}

.search__category-list {
  overflow-y: scroll;
  overflow-x: hidden;
  width: max-content;
	height: 190px;
	color: #888;
	text-align: left;
  font-size: rel(1920, 18);

  @media (max-width: 1024px) {
    font-size: 18px;
  }
}

.search__sliders {
  margin: 0 auto;
}

.search__slider {
  position: relative;
  max-width: 300px;
  width: 15vw;

  @media (max-width: 1024px) {
    width: 35vw;
  }
}
.search__slider:last-child {
  top: 100px;
}

.search__selects {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 190px;
  width: min-content;
}
.search__select-label {
  color: #FFFFFF;
}

:global(.select--search) {
  color: #fff;
  font-size: rel(1920, 20);
  font-weight: 300;
}

input[type=checkbox]{
    background-color: #DDD;
    border-radius: 2px;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 17px;
    height: 17px;
    cursor: pointer;
    position: relative;
    top: 5px;
}

input[type=checkbox]:checked{
    background: #555555 url("data:image/gif;base64,R0lGODlhCwAKAIABAP////3cnSH5BAEKAAEALAAAAAALAAoAAAIUjH+AC73WHIsw0UCjglraO20PNhYAOw==") 3px 3px no-repeat;
}
</style>
