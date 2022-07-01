<script>
import { onMount } from 'svelte';
import { filmtype, filmsort } from "./filters.svelte"
import { getUrlVars } from "$lib/js/tools.js"
import { goto } from '$app/navigation';
import { status, data, req } from "$lib/elements/search/store.js"
import Filters from "./filters.svelte"

let title;
let lastTitle
let form;
let open = false;

onMount(()=>{
  if (location.pathname == '/search') {
    let args = getUrlVars()
    title.value = args.keyword ? decodeURI(args.keyword) : ''
  }
})

function toggleFilters() {
  open = !open
  if (open) {
    lastTitle = title.value
    title.value = "Режим поиска по фильтрам"
    title.disabled = true
  } else {
    title.value = lastTitle
    title.disabled = false
  }
  return open
}

function preSearch() {
  let newhref
  if (open) {
    toggleFilters()
    let genr = [];
    document.querySelectorAll('input[type=checkbox]:checked').forEach((item) => {
      if (genr == '') {
        genr = item.value;
      } else {
        genr = genr + "," + item.value;
      }
    });

    $req["genr"] = genr
    $req["sort"] = filmsort
    $req["type"] = filmtype
    $req["years"] = document.getElementById('years-slider').noUiSlider.get(true);
    $req["rating"] = document.getElementById('rating-slider').noUiSlider.get(true);

    $req.search = "genr"
    newhref = `search?genr=${$req["genr"]}&sort=${$req["sort"]}&type=${$req["type"]}&years=${$req["years"]}&rating=${$req["rating"]}`
  } else {
    $req["keyword"] = document.querySelector('#search-title').value

    $req.search = "keyword"
    newhref = `search?keyword=${$req["keyword"]}`
  }

  let url = new URL(newhref, window.location.origin)
  window.scrollTo(0, 0);
  $status = "search"
  goto(url)
}
</script>

<div class="search__form" class:search__form--open={open} bind:this={form}>
  <div class="search__simple">
    <input class="search__input" type="text" placeholder="Название фильма" id="search-title" name="title" bind:this={title} on:keypress={(e)=>{if (e.charCode === 13 && title.value) preSearch()}}>
    <button class="search__open-adv" id="open-adv" on:click="{toggleFilters}"></button>
    <button class="button search__button" on:click={()=>{if (title.value) preSearch()}}>Поиск</button>
  </div>
  <Filters/>
</div>

<style lang="scss">
@import "../../scss/variables";

.search__simple {
  width: 100%;
  height: 62px;
  display: flex;
  padding-left: 16px;
  padding-right: 6px;
  align-items: center;

  @media (max-width: 1440px) {
    height: 50px;
  }
}

.search__input {
  background: none;
  flex-grow: 1;
  border: none;
  height: 100%;
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: calc(100vw / 1920) * 18;
  line-height: rel(1920, 22);
  color: #AEAEAE;

  &:focus {
    outline: none;
  }

  @media (max-width: 1024px) {
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 14px;
    color: #E5E5E5;
  }
}

.search__open-adv {
  margin-right: 10px;
  width: 25px;
  height: 25px;
  background: url('/img/filters.svg') no-repeat;
  background-size: cover;

  @media (max-width: 535px) {
    display: none;
  }
}

.search__button {
  height: 52px;

  @media (max-width: 1440px) {
    height: 39px;
  }

  @media (max-width: 1024px) {
    font-size: 12px;
    line-height: 14px;
    padding: 12px 23px;
  }
}

.search__form {
	background: #0D0D0D;
	border-radius: 50px;
	width: rel(1920, 785);
  min-width: 460px;
	max-width: 785px;
	height: 62px;
  overflow: hidden;
	z-index: 1;
	transition: all 0.3s ease;

  @media (max-width: 1440px) {
    height: 50px;
  }

  @media (min-width: 535px) {
    &--open {
      height: 256px;
      border-radius: 15px;
    }
  }

  @media (max-width: 1024px) {
    width: 100%;
    min-width: 0;
  	max-width: inherit;
    margin-top: 7px;
  }
}
</style>
