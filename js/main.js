function createSliders() {
  var yearsSlider = document.getElementById('years-slider');
  noUiSlider.create(yearsSlider, {
    start: [1950, 2022],
    tooltips: [true, true],
    connect: true,
    range: {
      min: [1950, 1],
      max: [2022, 1]
    },
    format: {
      to: function(value) {
        return "Год " + value;
      },
      from: function(value) {
        return value;
      }
    },
    pips: {
      mode: 'count',
      values: 5,
      density: 2
    },
  });
  var ratingSlider = document.getElementById('rating-slider');
  noUiSlider.create(ratingSlider, {
    start: [0, 10],
    tooltips: [true, true],
    connect: true,
    range: {
      min: [0, 1],
      max: [10, 1]
    },
    format: {
      to: function(value) {
        return "Рейтинг " + value;
      },
      from: function(value) {
        return value;
      }
    },
    pips: {
      mode: 'count',
      values: 11,
      density: 5
    },
  });
}
try {
  createSliders();
} catch (e) {

} finally {

}
function toggleFilters(){
  document.querySelector('.search__form').classList.toggle("search__form--open");
}
document.addEventListener('DOMNodeInserted', e => {
  if (e.target.id == 'arc-widget-container') {
    let elm = e.target.childNodes[0].childNodes[0].contentWindow.document.querySelector('#launcher');
    elm.style.background = '#444';
  }
})
function popupShow(id) {
  const container = document.querySelector('.popup-container')
  if (!container) {return console.log("Контейнер не найден")}
  container.addEventListener('click', function(event){
    if (event.target == container) {popupShow();}
  })

  const templates = document.querySelector('#popups')
  if (!templates) {return console.log("Шаблоны не найдены")}

  if (id) {
    container.innerHTML = templates.content.querySelector('#'+id).outerHTML;
    window.location.hash = 'popup';
    if (container.classList.contains('popup-container--active')) {return}
  }

  if (container.classList.contains('popup-container--active')) {
    history.replaceState("", document.title, window.location.pathname + window.location.search);
  }
  return container.classList.toggle('popup-container--active');
}

window.onhashchange = function(event) {
  if (event.oldURL.split('#').reverse()[0] == 'popup') {
    return popupShow();
  }
}

window.addEventListener('load', () => {
  if (window.location.href.split('#').reverse()[0] == 'popup') {
    history.replaceState("", document.title, window.location.pathname + window.location.search);
  }
});
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

    let sorting = document.getElementById("sorting").value;
    let type = document.getElementById("film-type").value;
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

  let res = await apiReq(url)
  container.innerHTML = ''

  if (res == 'Error') {
    container.innerHTML += `
      <div>
        <h2 class="card__title">Ничего не найдено</h2>
        <p class="card__other">Попробуйте изменить запрос</p>
      </div>
    `
    nav.innerHTML = ''
    return
  }

  res = res.films ?? res.items
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

  var prew = +urlvars.page - 1;
  var next = +urlvars.page + 1;
  if (urlvars.page == 1) {
    let vars = getUrlVars()
    if (vars.page) {
      nav.innerHTML = `<p>Страница ${urlvars.page}</p> <input class="button result__button" type="button" value=">" onclick="searchStart('search${location.search.replace("&page="+urlvars.page, "&page="+next)}')">`
    } else {
      nav.innerHTML = `<p>Страница ${urlvars.page}</p> <input class="button result__button" type="button" value=">" onclick="searchStart('search${location.search}&page=2')">`
    }

  } else {
    nav.innerHTML =`<input class="button result__button" type="button" value="<" onclick="searchStart('search${location.search.replace("&page="+urlvars.page, "&page="+prew)}')"> <p>Страница ${urlvars.page}</p> <input class="button result__button" type="button" value=">" onclick="searchStart('search${location.search.replace("&page="+urlvars.page, "&page="+next)}')">`
  };
}
// by Tojefin
// v1.0
// Как использовать:
// 1. Разметить обычный селект
// 2. Указать id селекту
// 3. Добавить основной класс для селекта
// 4. В опции прописать числовой value от 0
// 5. Классы для стилей <основной класс>__[container, list, list--open, item, item--active]

//События селектов
function selectOnChange(origin, value, oldvalue) {
  if (value != oldvalue) {
    if (origin.id == 'filmState') {
      selectChangeValue(origin, 0, true)
    }
    if (origin.id == 'playerUsed') {
      loadPlayer()
    }
  }
}

//Выбор опции
function selectOption(option) {
  let select = option.parentNode.parentNode
  let origin = document.querySelector(`select#${select.id}`)
  selectChangeValue(origin, option.value)
  selectToggle(select)
}

//Изменение значения
function selectChangeValue(origin, value, noevent) {
  oldvalue = origin.value
  let select = document.querySelector(`div#${origin.id}`)
  if (select) {
    select.value = value
    select.querySelector('span').innerText = select.querySelectorAll('li')[value].innerText
  }
  origin.value = value
  if (!noevent) {
    selectOnChange(origin, value, oldvalue)
  }
}

//Вкл / выкл списка опций
function selectToggle(select) {
  let list = select.querySelector('ul')
  let className = select.querySelector('span').classList[0]
  list.classList.toggle(`${list.classList[0]}--open`)
  if (list.classList.contains(`${list.classList[0]}--open`)) {
    let options = ``;
    document.querySelector(`select#${select.id}`).querySelectorAll('option').forEach((opt, i) => {
      if (i == select.value) {
        options = `${options}<li class="${className}__item ${className}__item--active" value="${i}" onclick="selectOption(this)">${opt.innerText}</li>`
      } else {
        options = `${options}<li class="${className}__item" value="${i}" onclick="selectOption(this)">${opt.innerText}</li>`
      }
    });
    list.innerHTML = `${options}`
  }
}

// Инициализация селектов
const selectors = document.querySelectorAll('.selector')
if (selectors) {
  if (window.innerWidth > 768) {
    selectors.forEach((item) => {
      let select = `
          <span class="${item.classList}" onclick="selectToggle(this.parentNode)">${Array.from(item.querySelectorAll('option'))[item.value].innerText}</span>
          <ul class="${item.classList[0]}__list">
          </ul>
      `
      let element = document.createElement('div');
      element.id = item.id
      element.classList = `${item.classList[0]}__container`
      element.innerHTML = select
      item.parentNode.insertBefore(element, item);
      item.style.position = 'fixed';
      item.style.top = '-100vh';
    });
  } else {
    selectors.forEach((item) => {
      item.addEventListener('change', (event) => {
        let origin = document.querySelector(`select#${event.target.id}`)
        selectOnChange(origin, origin.value)
      });
    });
  }
}
window.addEventListener('load', (event) => {
  if (location.pathname == '/watch') {
    watch()
  }
});

async function watch() {
  loadPlayer()
  let urlvars = getUrlVars()
  let url = ('https://kinopoiskapiunofficial.tech/api/v2.2/films/' + urlvars.id + '');
  let res = await apiReq(url)

  document.title = res.nameRu + " — KinoFree"
  document.querySelector('#title').innerText = res.nameRu ?? res.nameOriginal ?? "-"
  document.querySelector('#year').innerText = res.year ?? "-"
  document.querySelector('#rating').innerText = res.ratingKinopoisk ?? res.rating ?? res.ratingImdb ?? "-"
  document.querySelector('#age').innerText = res.ratingAgeLimits.split('age')[1]+'+' ?? "-"
  document.querySelector('#desc').innerText = res.description ?? "-"
}

function watchSearch(type) {

  if (!document.querySelector('.result')) {
    let element = document.createElement('section');
    element.classList = 'result';
    element.id = 'result'
    element.innerHTML = `
      <ul class="result__list">
      </ul>
      <nav class="result__nav">
      </nav>
    `
    document.querySelector('.container').appendChild(element);
  }

  let urlvars = getUrlVars();
  let newhref = `watch?id=${urlvars.id}&type=${type}`;
  let url = new URL(newhref, window.location.origin);
  window.history.replaceState({}, '', url);
  search();
  location.href = "#result"
}

function loadPlayer() {
  let urlvars = getUrlVars()
  let iframe = document.querySelector('.watch__player')
  var player = document.querySelector('select#playerUsed').value;
  switch (player) {
    case '0':
      iframe.src = `https://api1629919197.tobaco.ws/embed/kp/${urlvars.id}`
      break;
    case '1':
      iframe.src = `https://patriot.allohastream.com/?token=70f3e30270ec1a18376655a55e8646&kp=${urlvars.id}`
      break;
    case '2':
      iframe.src = `https://vcdn.kinoapi.club/sZfbdItt5jeX?kp_id=${urlvars.id}`
      break;
    default:
      iframe.src = `https://api1629919197.tobaco.ws/embed/kp/${urlvars.id}`
  }
}
function getUrlVars() {
  var vars = [], hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for(var i = 0; i < hashes.length; i++){
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}

async function apiReq(url) {
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": "4b12f46d-638b-4bac-bf06-33865d3a3524",
    },
  });
  if (response.ok) {
    let data = await response.json();
    if (data.searchFilmsCountResult != 0) {
      return data
    } else {
      console.log("Ошибка запроса");
      return 'Error'
    }
  } else {
    console.log("Ошибка сервера "+response.status);
    return 'Error'
  }
}