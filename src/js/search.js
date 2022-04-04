window.addEventListener('load', (event) => {
  if (location.pathname == '/search') {
    search()
  }
});

function preSearch(){
  let newhref
  if (document.querySelector('.search__form').classList.contains("search__form--open")) {
    let genr = [];
    document.querySelectorAll('input[type=checkbox]:checked').forEach((item) => {
      if (genr == '') {
        genr = item.value;
      } else {
        genr = genr + "," + item.value;
      }
    });

    let sorting = document.querySelector("select#sorting").value;
    let type = document.querySelector("select#film-type").value;
    let years = document.getElementById('years-slider').noUiSlider.get(true);
    let rating = document.getElementById('rating-slider').noUiSlider.get(true);

    newhref = `search?genr=${genr}&sort=${sorting}&type=${type}&years=${years}&rating=${rating}`
  } else {
    let keyword = document.querySelector('#search-title').value
    newhref = `search?keyword=${keyword}`
  }
  searchStart(newhref)
}

function searchStart(newhref){
  if (location.pathname == '/search') {
    let url = new URL(newhref, window.location.origin)
    window.history.replaceState({}, '', url)
    window.scrollTo(0, 0);
    search()
  } else {
    location.href = newhref
  }
}

async function search() {
  section = document.querySelector('.result')
  nav = section.querySelector('.result__nav')
  container = section.querySelector('.result__list')
  container.innerHTML = `
    <div class="card__loading"></div>
    <div class="card__loading"></div>
    <div class="card__loading"></div>
    <div class="card__loading"></div>
  `

  let urlvars = getUrlVars()
  if (!urlvars.page) {urlvars.page = 1;}

  switch (urlvars[0]) {
    case 'keyword':
      var url = ('https://kinopoiskapiunofficial.tech/api/v2.2/films?keyword=' + urlvars.keyword + '&page=' + urlvars.page);
      document.querySelector('#search-title').value = decodeURI(urlvars.keyword)
      break;
    case 'genr':
      urlvars.genr = urlvars.genr.split(',')
      urlvars.rating = urlvars.rating.split(',')
      urlvars.years = urlvars.years.split(',')
      var url = ('https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=' + urlvars.genr + '&order=' + urlvars.sort + '&type=' + urlvars.type + '&ratingFrom=' + urlvars.rating[0] + '&ratingTo=' + urlvars.rating[1] + '&yearFrom=' + urlvars.years[0] + '&yearTo=' + urlvars.years[1] + '&page=' + urlvars.page);
      break;
    case 'popular':
      var url = ('https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=' + urlvars.page);
      break;
    case 'premiers':
      let date = new Date();
      let month = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
      let tmonth = month[date.getMonth()];
      let year = date.getYear()
      var url = ('https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=20'+year.toString().substring(1)+'&month=' + tmonth);
      break;
    case 'id':
      if (urlvars.type == 'similars') {
        var version = "2"
      } else {var version = "1"}
      var url = (`https://kinopoiskapiunofficial.tech/api/v2.${version}/films/${urlvars.id}/${urlvars.type}`);
      break;
  }

  let response = await apiReq(url)
  container.innerHTML = ''

  if (response == 'Error' || response =='') {
    container.innerHTML += `
      <div>
        <h2 class="card__title">Ничего не найдено</h2>
        <p class="card__other">Попробуйте изменить запрос</p>
      </div>
    `
    nav.innerHTML = ''
    return
  }

  res = response.films ?? response.items ?? response
  res.forEach((item) => {
    if (item.genres) {
      var genr = '';
      item.genres.forEach((i) => {genr = `${genr}${i.genre} `});
    }
    if (item.relationType) {
      if (item.relationType == "SEQUEL") {
        var linkType = 'Продолжение';
      } else if (item.relationType == "PREQUEL") {
        var linkType = 'Предыстория';
      }
    }
    var id = item.kinopoiskId ?? item.filmId;
    var name = item.nameRu ?? item.nameOriginal ?? "-";
    var year = item.premiereRu ?? item.year ?? "-";
    var rating = item.ratingKinopoisk ?? item.rating ?? item.ratingImdb ?? "-";
    var desc = item.description ?? genr ?? linkType ?? "-";

    var head = `
      <a href="/watch?id=${id}"><h2 class="card__title" title="${name}">${name}</h2></a>
    `;
    var year = `
      <small class="card__year">${year}</small>
    `;
    var rating =`
      <small class="card__rating">${rating}</small>
    `;
    var text = `
      <p class="card__desc">${desc}</p>
    `;

    container.innerHTML += `
      <div class="card">
        <a href="/watch?id=${id}"><img class="card__img" loading="lazy" src="${item.posterUrlPreview}"></a>
        <div class="card__info">
          ${head}
          ${year}
          ${rating}
          ${text}
        </div>
      </div>
    `;
  });

  let pageCount = response.totalPages ?? response.pagesCount;

  if (pageCount) {
    var prew = +urlvars.page - 1;
    var next = +urlvars.page + 1;

    let prewB = `<input class="button result__button" type="button" value="<" onclick="searchStart('search${location.search.replace("&page="+urlvars.page, "&page="+prew)}')">`
    let nextB

    let vars = getUrlVars()
    if (vars.page) {
      nextB = `<input class="button result__button" type="button" value=">" onclick="searchStart('search${location.search.replace("&page="+urlvars.page, "&page="+next)}')">`
    } else {
      nextB = `<input class="button result__button" type="button" value=">" onclick="searchStart('search${location.search}&page=2')">`
    }

    if (urlvars.page == 1) {
      nav.innerHTML = `<p>Страница ${urlvars.page}</p> ${nextB}`
    } else if (pageCount != urlvars.page) {
      nav.innerHTML =`${prewB} <p>Страница ${urlvars.page}</p> ${nextB}`
    } else {
      nav.innerHTML =`${prewB} <p>Страница ${urlvars.page}</p>`
    };
  }
}
