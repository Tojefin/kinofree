<script>
import { playerSrc, filmId } from "./store.js"
import { onMount } from 'svelte';
import { getUrlVars, apiReq } from "$lib/js/tools.js"
import { status, req } from "$lib/elements/search/store.js"
import { afterNavigate } from '$app/navigation';
import Selector from "$lib/blocks/selector.svelte"

let title = "Загрузка..."
let [year, rating, age, desc] = Array(4).fill('-');
let filmstate = 0

afterNavigate(() => init())

const init = async () => {
  let urlvars = getUrlVars()
  let url = ('https://kinopoiskapiunofficial.tech/api/v2.2/films/' + urlvars.id + '');
  let res = await apiReq(url)

  let data = JSON.parse(localStorage.getItem('watch_history'));
  if (!data) {data = []}
  let target = data.filter((obj)=>obj.id == urlvars.id)[0]
  if (target == undefined) {
    data.unshift({ id: urlvars.id, name: res.nameRu ?? res.nameOriginal, poster: res.posterUrlPreview })
    if (data.length > 24) {
      data.pop()
    }
    localStorage.setItem('watch_history', JSON.stringify(data))
  } else {
    let index = data.indexOf(target)
    data.splice(index, 1)
    data.unshift({ id: urlvars.id, name: res.nameRu ?? res.nameOriginal, poster: res.posterUrlPreview })
    if (data.length > 24) {
      data.pop()
    }
    localStorage.setItem('watch_history', JSON.stringify(data))
  }

  document.title = res.nameRu + " — KinoFree"
  title = res.nameRu ?? res.nameOriginal ?? "-"
  year = res.year ?? "-"
  rating = res.ratingKinopoisk ?? res.rating ?? res.ratingImdb ?? "-"
  age = res.ratingAgeLimits ? res.ratingAgeLimits.split('age')[1]+'+' : "-"
  desc = res.description ?? "-"

  $status = undefined
}

function selectPlayer(event) {
  switch (event.detail.value) {
    case 0:
      $playerSrc = `https://api1629919197.tobaco.ws/embed/kp/${$filmId}`
      break;
    case 1:
      $playerSrc = `https://polati.newplayjj.com:9443/?token=a3fd119d8a9418f6c3f6a7ae628a41&kp=${$filmId}` 
      break;
    case 2:
      $playerSrc = `//49442664434375553.svetacdn.in/sZfbdItt5jeX?kp_id=${$filmId}`
      break;
    default:
      $playerSrc = `https://api1629919197.tobaco.ws/embed/kp/${$filmId}`
  }
}

function click(newtype) {
  $req.search = 'id'
  $req.id = getUrlVars().id
  $req.type = newtype

  $status = "search"
}

function blockfilmstate(event) {
  filmstate = event.detail.value
  filmstate = 0
}

</script>

<div class="filminfo">
  <div class="filminfo__texts">
    <h2 class="filminfo__title" id="title">{title}</h2>
    <small class="filminfo__num" id="year">{year}</small>
    <small class="filminfo__num filminfo__num--rating" id="rating">{rating}</small>
    <small class="filminfo__num" id="age">{age}</small>
    <p class="filminfo__desc" id="desc">{desc}</p>
  </div>
  <div class="filminfo__nav">
    {#key filmstate}
      <Selector
        id={"filmState"}
        className={"filminfo__other"}
        value={filmstate}
        options={["Не просмотрено", "Смотрю", "Просмотрено", "Запланировано"]}
        on:optionselect={blockfilmstate}
      />
    {/key}
    <span class="link filminfo__other" on:click={()=>click("sequels_and_prequels")}>Связанное</span>
    <span class="link filminfo__other" on:click={()=>click("similars")}>Похожее</span>
    <br>
    <p class="filminfo__other">Плеер:</p>
    <Selector
      id={"playerUsed"}
      className={"filminfo__other"}
      value={0}
      options={["ALPHA", "BETA", "GAMMA"]}
      on:optionselect={selectPlayer}
    />
  </div>
</div>

<style lang="scss">
@import "../../scss/variables";
.filminfo {
  @media (max-width: 1023px) {
    max-width: 660px;
    width: rel(568, 528);
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 567px) {
    max-width: 528px;
    width: rel(320, 280);
  }
}

.filminfo__texts{
  @media (max-width: 1023px) {
    order: 2
  }
}

.filminfo__nav{
  @media (max-width: 1023px) {
    order: 1
  }
}

.filminfo__title {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: rel(1920, 26);
  line-height: rel(1920, 32);
  color: #FFFFFF;
  margin-bottom: 5%;

  @media (max-width: 1023px) {
    font-size: 26px;
    line-height: 32px;
  }

  @media (max-width: 567px) {
    font-size: 18px;
    line-height: 22px;
  }
}

.filminfo__num {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: rel(1920, 20);
  line-height: rel(1920, 24);
  display: inline-block;
  color: #FFFFFF;
  margin-bottom: 5%;
  margin-right: 45px;

  &--rating {
    color: #5AFF91;
  }

  @media (max-width: 1023px) {
    font-size: 20px;
    line-height: 24px;
    margin-right: 25px;
  }

  @media (max-width: 567px) {
    font-size: 16px;
    line-height: 20px;
  }
}

.filminfo__desc {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 300;
  font-size: rel(1920, 20);
  line-height: rel(1920, 24);
  color: #9C9C9C;
  margin-bottom: 5%;
  padding-right: 10%;

  @media (max-width: 1023px) {
    font-size: 20px;
    line-height: 24px;
    max-height: 200px;
    overflow-y: scroll;
  }

  @media (max-width: 567px) {
    font-size: 16px;
    line-height: 20px;
  }
}

:global(.filminfo__other) {
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: rel(1920, 18);
  line-height: rel(1920, 22);
  color: #FFFFFF;
  display: inline-block;
  margin-bottom: 2%;
  margin-right: 32px;

  @media (max-width: 1023px) {
    font-size: 18px;
    line-height: 22px;
    margin-right: 15px;
  }

  @media (max-width: 567px) {
    font-size: 16px;
    line-height: 20px;
  }
}

</style>
