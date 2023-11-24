<script>
  import { status, data, req } from '$lib/elements/search/store.js';
  import { getUrlVars } from '$lib/js/tools.js';
  import { goto } from '$app/navigation';
  import Card from '$lib/elements/result/card.svelte';
  import Nav from '$lib/elements/result/nav.svelte';

  let result = [];
  let pagesCount;
  let curPage;

  $: status, statusObserver($status);
  const statusObserver = (ns) => {
    if (ns == 'render') {
      render($data);
    }
  };

  function render(apidata) {
    result = [];
    pagesCount = apidata.totalPages ?? apidata.pagesCount;
    curPage = getUrlVars().page ?? '1';
    let films = apidata.films ?? apidata.items ?? apidata;

    films.forEach((item) => {
      if (item.genres) {
        var genr = '';
        item.genres.forEach((i) => {
          genr = `${genr}${i.genre} `;
        });
      }
      if (item.relationType) {
        if (item.relationType == 'SEQUEL') {
          var linkType = 'Продолжение';
        } else if (item.relationType == 'PREQUEL') {
          var linkType = 'Предыстория';
        } else if (item.relationType == 'REMAKE') {
          var linkType = 'Ремейк';
        }
      }
      let id = item.kinopoiskId ?? item.filmId;
      let poster = item.posterUrlPreview;
      let name = item.nameRu ?? item.nameOriginal ?? '-';
      let year = item.premiereRu ?? item.year ?? '-';
      let rating =
        item.ratingKinopoisk ?? item.rating ?? item.ratingImdb ?? '-';
      let desc = item.description ?? genr ?? linkType ?? '-';

      result = [
        ...result,
        {
          id: id,
          poster: poster,
          name: name,
          year: year,
          rating: rating,
          desc: desc,
        },
      ];
    });
    $status = 'ready';
  }

  const Navigate = (event) => {
    let newhref;
    let urlvars = getUrlVars();

    if (urlvars.page) {
      $req.page = event.detail.newPage;
      newhref = location.search.replace(
        '&page=' + urlvars.page,
        '&page=' + event.detail.newPage
      );
    } else {
      $req.page = 2;
      newhref = location.search + '&page=2';
    }

    $req.search = urlvars[0];
    let url = new URL('/search' + newhref, window.location.origin);
    window.scrollTo(0, 0);
    $status = 'search';
    goto(url);
  };
</script>

{#if $status}
  <div class="result">
    <ul class="result__list">
      {#if $status == 'await'}
        <div class="card__loading"></div>
        <div class="card__loading"></div>
        <div class="card__loading"></div>
        <div class="card__loading"></div>
      {/if}

      {#if $status == 'error'}
        <div class="error">
          <h2 class="error__title">Ничего не найдено</h2>
          <p class="error__sub">Попробуйте изменить запрос</p>
        </div>
      {/if}

      {#if $status == 'ready'}
        {#each result as f}
          <Card
            id={f.id}
            poster={f.poster}
            name={f.name}
            year={f.year}
            rating={f.rating}
            desc={f.desc}
          />
        {/each}
      {/if}
    </ul>

    {#if $status == 'ready'}
      <Nav {pagesCount} {curPage} on:Nav={Navigate} />
    {/if}
  </div>
{/if}

<style lang="scss">
  @import '../scss/variables';

  .result {
    margin-top: 100px;
    margin-left: 86px;
    margin-bottom: 20px;

    @media (max-width: 1024px) {
      margin-left: 20px;
    }

    @media (max-width: 768px) {
      margin-right: 20px;
      margin-top: 70px;
    }
  }

  .error {
    &__title {
      color: #eee;
    }

    &__sub {
      color: #777;
    }
  }

  .result__list {
    display: grid;
    grid-row-gap: 28px;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: none;
    margin-bottom: 20px;

    @media (max-width: 1024px) {
      grid-row-gap: 40px;
      grid-template-columns: repeat(1, 1fr);
      justify-items: center;
    }
  }

  .card__other {
    font-family: 'Montserrat', sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: rel(1920, 20);
    line-height: rel(1920, 24);
    color: #9c9c9c;

    @media (max-width: 1024px) {
      font-size: 18px;
      line-height: 21px;
    }

    @media (max-width: 567px) {
      font-size: 10px;
      line-height: 12px;
    }
  }

  .card__loading {
    width: rel(1920, 786);
    height: rel(1920, 255);
    border-radius: 20px;
    animation-duration: 3s;
    animation-name: gradientRoll;
    animation-iteration-count: infinite;

    @media (max-width: 1024px) {
      max-width: 660px;
      width: rel(568, 528);
      height: rel(568, 171);
    }

    @media (max-width: 567px) {
      max-width: 528px;
      width: rel(320, 280);
      height: rel(320, 91);
    }
  }
</style>
