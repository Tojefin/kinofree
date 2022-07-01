<script>
import { goto } from '$app/navigation';
import { status, data, req } from "$lib/elements/search/store.js"

function click(newhref) {
  $req.search = newhref
  let url = new URL("/search?"+newhref, window.location.origin)
  window.scrollTo(0, 0);
  $status = "search"
  goto(url)
}
</script>

<small class="search__help">Поверните для фильтров</small>
<nav class="search__nav">
  <span class="link" on:click={()=>click("popular")}>ПОПУЛЯРНОЕ</span>
  <span class="link" on:click={()=>click("premiers")}>ПРЕМЬЕРЫ</span>
  <span class="link" >ПОДБОРКИ</span>
</nav>

<style lang="scss">
@import "../../scss/variables";

.search__nav {
  position: absolute;
  top: 80px;
  right: 0;
  display: flex;

  font-weight: 400;
  font-size: rel(1920, 14);
  line-height: rel(1920, 17);

  & span {
    margin-left: 25px;
  }

  @media (max-width: 1440px) {
    top: 70px;
  }

  @media (max-width: 1024px) {
    font-size: 11px;
    line-height: 13px;
  }

  @media (max-width: 535px) {
    top: 80px;
    right: 50%;
    transform: translateX(50%);
    font-size: 11px;
    line-height: 13px;

    & span {
      margin: 0 10px;
    }
  }
}

.search__help {
  width: 100%;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 10px;
  line-height: 12px;
  color: #737373;
  display: inline-block;
  text-align: center;
  top: -3px;

  @media (min-width: 535px) {
    display: none;
  }
}
</style>
