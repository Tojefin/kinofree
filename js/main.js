"use strict";

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
      to: function (value) {
        return "Год " + value;
      },
      from: function (value) {
        return value;
      }
    },
    pips: {
      mode: 'count',
      values: 5,
      density: 2
    }
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
      to: function (value) {
        return "Рейтинг " + value;
      },
      from: function (value) {
        return value;
      }
    },
    pips: {
      mode: 'count',
      values: 11,
      density: 5
    }
  });
}

try {
  createSliders();
} catch (e) {} finally {}

function toggleFilters() {
  document.querySelector('.search__form').classList.toggle("search__form--open");
}

document.addEventListener('DOMNodeInserted', e => {
  if (e.target.id == 'arc-widget-container') {
    let elm = e.target.childNodes[0].childNodes[0].contentWindow.document.querySelector('#launcher');
    elm.style.background = '#444';
  }
}); //https://github.com/Tojefin/JS-tools

function popupShow(id) {
  const container = document.querySelector('.popup-container');

  if (!container) {
    return console.log("Контейнер не найден");
  }

  container.addEventListener('click', function (event) {
    if (event.target == container) {
      popupShow();
    }
  });
  const templates = document.querySelector('#popups');

  if (!templates) {
    return console.log("Шаблоны не найдены");
  }

  if (id) {
    container.innerHTML = templates.content.querySelector('#' + id).outerHTML;
    window.location.hash = 'popup';

    if (container.classList.contains('popup-container--active')) {
      return;
    }
  }

  if (container.classList.contains('popup-container--active')) {
    container.innerHTML = '';
    history.replaceState("", document.title, window.location.pathname + window.location.search);
  }

  return container.classList.toggle('popup-container--active');
}

window.onhashchange = function (event) {
  if (event.oldURL.split('#').reverse()[0] == 'popup') {
    return popupShow();
  }
};

window.addEventListener('load', () => {
  if (window.location.href.split('#').reverse()[0] == 'popup') {
    history.replaceState("", document.title, window.location.pathname + window.location.search);
  }
});
window.addEventListener('load', event => {
  if (location.pathname == '/search') {
    search();
  }
});

function preSearch() {
  let newhref;

  if (document.querySelector('.search__form').classList.contains("search__form--open")) {
    let genr = [];
    document.querySelectorAll('input[type=checkbox]:checked').forEach(item => {
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
    newhref = "search?genr=".concat(genr, "&sort=").concat(sorting, "&type=").concat(type, "&years=").concat(years, "&rating=").concat(rating);
  } else {
    let keyword = document.querySelector('#search-title').value;
    newhref = "search?keyword=".concat(keyword);
  }

  searchStart(newhref);
}

function searchStart(newhref) {
  if (location.pathname == '/search') {
    let url = new URL(newhref, window.location.origin);
    window.history.replaceState({}, '', url);
    window.scrollTo(0, 0);
    search();
  } else {
    location.href = newhref;
  }
}

async function search() {
  var _ref, _response$films, _response$totalPages;

  let section = document.querySelector('.result');
  let nav = section.querySelector('.result__nav');
  let container = section.querySelector('.result__list');
  container.innerHTML = "\n    <div class=\"card__loading\"></div>\n    <div class=\"card__loading\"></div>\n    <div class=\"card__loading\"></div>\n    <div class=\"card__loading\"></div>\n  ";
  let urlvars = getUrlVars();

  if (!urlvars.page) {
    urlvars.page = 1;
  }

  switch (urlvars[0]) {
    case 'keyword':
      var url = 'https://kinopoiskapiunofficial.tech/api/v2.2/films?keyword=' + urlvars.keyword + '&page=' + urlvars.page;
      document.querySelector('#search-title').value = decodeURI(urlvars.keyword);
      break;

    case 'genr':
      urlvars.genr = urlvars.genr.split(',');
      urlvars.rating = urlvars.rating.split(',');
      urlvars.years = urlvars.years.split(',');
      var url = 'https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=' + urlvars.genr + '&order=' + urlvars.sort + '&type=' + urlvars.type + '&ratingFrom=' + urlvars.rating[0] + '&ratingTo=' + urlvars.rating[1] + '&yearFrom=' + urlvars.years[0] + '&yearTo=' + urlvars.years[1] + '&page=' + urlvars.page;
      break;

    case 'popular':
      var url = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=' + urlvars.page;
      break;

    case 'premiers':
      let date = new Date();
      let month = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
      let tmonth = month[date.getMonth()];
      let year = date.getYear();
      var url = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=20' + year.toString().substring(1) + '&month=' + tmonth;
      break;

    case 'id':
      if (urlvars.type == 'similars') {
        var version = "2";
      } else {
        var version = "1";
      }

      var url = "https://kinopoiskapiunofficial.tech/api/v2.".concat(version, "/films/").concat(urlvars.id, "/").concat(urlvars.type);
      break;
  }

  let response = await apiReq(url);
  container.innerHTML = '';

  if (response == 'Error' || response == '') {
    container.innerHTML += "\n      <div>\n        <h2 class=\"card__title\">\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E</h2>\n        <p class=\"card__other\">\u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0437\u0430\u043F\u0440\u043E\u0441</p>\n      </div>\n    ";
    nav.innerHTML = '';
    return;
  }

  let res = (_ref = (_response$films = response.films) !== null && _response$films !== void 0 ? _response$films : response.items) !== null && _ref !== void 0 ? _ref : response;
  res.forEach(item => {
    var _item$kinopoiskId, _ref2, _item$nameRu, _ref3, _item$premiereRu, _ref4, _ref5, _item$ratingKinopoisk, _ref6, _ref7, _item$description;

    if (item.genres) {
      var genr = '';
      item.genres.forEach(i => {
        genr = "".concat(genr).concat(i.genre, " ");
      });
    }

    if (item.relationType) {
      if (item.relationType == "SEQUEL") {
        var linkType = 'Продолжение';
      } else if (item.relationType == "PREQUEL") {
        var linkType = 'Предыстория';
      }
    }

    var id = (_item$kinopoiskId = item.kinopoiskId) !== null && _item$kinopoiskId !== void 0 ? _item$kinopoiskId : item.filmId;
    var name = (_ref2 = (_item$nameRu = item.nameRu) !== null && _item$nameRu !== void 0 ? _item$nameRu : item.nameOriginal) !== null && _ref2 !== void 0 ? _ref2 : "-";
    var year = (_ref3 = (_item$premiereRu = item.premiereRu) !== null && _item$premiereRu !== void 0 ? _item$premiereRu : item.year) !== null && _ref3 !== void 0 ? _ref3 : "-";
    var rating = (_ref4 = (_ref5 = (_item$ratingKinopoisk = item.ratingKinopoisk) !== null && _item$ratingKinopoisk !== void 0 ? _item$ratingKinopoisk : item.rating) !== null && _ref5 !== void 0 ? _ref5 : item.ratingImdb) !== null && _ref4 !== void 0 ? _ref4 : "-";
    var desc = (_ref6 = (_ref7 = (_item$description = item.description) !== null && _item$description !== void 0 ? _item$description : genr) !== null && _ref7 !== void 0 ? _ref7 : linkType) !== null && _ref6 !== void 0 ? _ref6 : "-";
    var head = "\n      <a href=\"/watch?id=".concat(id, "\"><h2 class=\"card__title\" title=\"").concat(name, "\">").concat(name, "</h2></a>\n    ");
    var year = "\n      <small class=\"card__year\">".concat(year, "</small>\n    ");
    var rating = "\n      <small class=\"card__rating\">".concat(rating, "</small>\n    ");
    var text = "\n      <p class=\"card__desc\">".concat(desc, "</p>\n    ");
    container.innerHTML += "\n      <div class=\"card\">\n        <a href=\"/watch?id=".concat(id, "\"><img class=\"card__img\" loading=\"lazy\" src=\"").concat(item.posterUrlPreview, "\"></a>\n        <div class=\"card__info\">\n          ").concat(head, "\n          ").concat(year, "\n          ").concat(rating, "\n          ").concat(text, "\n        </div>\n      </div>\n    ");
  });
  let pageCount = (_response$totalPages = response.totalPages) !== null && _response$totalPages !== void 0 ? _response$totalPages : response.pagesCount;

  if (pageCount) {
    var prew = +urlvars.page - 1;
    var next = +urlvars.page + 1;
    let prewB = "<input class=\"button result__button\" type=\"button\" value=\"<\" onclick=\"searchStart('search".concat(location.search.replace("&page=" + urlvars.page, "&page=" + prew), "')\">");
    let nextB;
    let vars = getUrlVars();

    if (vars.page) {
      nextB = "<input class=\"button result__button\" type=\"button\" value=\">\" onclick=\"searchStart('search".concat(location.search.replace("&page=" + urlvars.page, "&page=" + next), "')\">");
    } else {
      nextB = "<input class=\"button result__button\" type=\"button\" value=\">\" onclick=\"searchStart('search".concat(location.search, "&page=2')\">");
    }

    if (urlvars.page == 1) {
      nav.innerHTML = "<p>\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 ".concat(urlvars.page, "</p> ").concat(nextB);
    } else if (pageCount != urlvars.page) {
      nav.innerHTML = "".concat(prewB, " <p>\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 ").concat(urlvars.page, "</p> ").concat(nextB);
    } else {
      nav.innerHTML = "".concat(prewB, " <p>\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 ").concat(urlvars.page, "</p>");
    }

    ;
  }
} //https://github.com/Tojefin/JS-tools
//События селектов


function selectOnChange(origin, valueId, oldvalueId) {
  if (valueId != oldvalueId) {
    if (origin.querySelectorAll('option')[oldvalueId]) {
      var oldvalue = origin.querySelectorAll('option')[oldvalueId].value;
    } else {
      var oldvalue = null;
    }

    let value = origin.value;
    const event = new CustomEvent('selectorChange', {
      bubbles: true,
      detail: {
        value: "".concat(value),
        oldvalue: "".concat(oldvalue),
        valueId: "".concat(valueId),
        oldvalueId: "".concat(oldvalueId)
      }
    });
    origin.dispatchEvent(event);
  }
} //Выбор опции


function selectOption(option) {
  let select = option.parentNode.parentNode;
  let origin = document.querySelector("select#".concat(select.id));
  selectChangeValue(origin, option.value);
  selectToggle(select);
} //Изменение значения


function selectChangeValue(origin, value, noevent) {
  let select = document.querySelector("div#".concat(origin.id));

  if (select) {
    var oldvalue = select.value;
    select.querySelector('span').innerText = select.querySelectorAll('li')[value].innerText;
    select.value = value;
  }

  origin.value = origin.querySelectorAll('option')[value].value;

  if (!noevent) {
    selectOnChange(origin, value, oldvalue);
  }
} //Вкл / выкл списка опций


function selectToggle(select) {
  let list = select.querySelector('ul');
  let className = select.querySelector('span').classList[0];
  list.classList.toggle("".concat(list.classList[0], "--open"));

  if (list.classList.contains("".concat(list.classList[0], "--open"))) {
    let options = "";
    document.querySelector("select#".concat(select.id)).querySelectorAll('option').forEach((opt, i) => {
      if (opt.value == select.value) {
        var classList = "".concat(className, "__item ").concat(className, "__item--active");
      } else {
        var classList = "".concat(className, "__item");
      }

      options = "".concat(options, "<li class=\"").concat(classList, "\" value=\"").concat(i, "\" onclick=\"selectOption(this)\">").concat(opt.innerText, "</li>");
    });
    list.innerHTML = "".concat(options);
    select.focus();
    select.addEventListener('focusout', () => {
      list.classList.remove("".concat(list.classList[0], "--open"));
      list.innerHTML = '';
    }, {
      once: true
    });
  } else {
    list.innerHTML = '';
  }
} // Инициализация селектов


const selectors = document.querySelectorAll('select');

if (selectors) {
  if (window.innerWidth > 768) {
    selectors.forEach(item => {
      let select = "\n        <span class=\"".concat(item.classList, "\" onclick=\"selectToggle(this.parentNode)\">").concat(Array.from(item.querySelectorAll('option'))[0].innerText, "</span>\n        <ul class=\"").concat(item.classList[0], "__list\"></ul>\n      ");
      let element = document.createElement('div');
      element.id = item.id;
      element.value = 0;
      element.tabIndex = '-1';
      element.classList = "".concat(item.classList[0], "__container");
      element.innerHTML = select;
      item.parentNode.insertBefore(element, item);
      item.style.cssText = "\n        position: fixed;\n        top: -100vh;\n      ";
    });
  } else {
    selectors.forEach(item => {
      item.addEventListener('change', event => {
        let origin = document.querySelector("select#".concat(event.target.id));
        selectOnChange(origin, origin.value, null);
      });
    });
  }
}

window.addEventListener('load', event => {
  if (location.pathname == '/watch') {
    watch();
  }
});

async function watch() {
  var _ref8, _res$nameRu, _res$year, _ref9, _ref10, _res$ratingKinopoisk, _ref11, _res$description;

  loadPlayer();
  let urlvars = getUrlVars();
  let url = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/' + urlvars.id + '';
  let res = await apiReq(url);
  document.title = res.nameRu + " — KinoFree";
  document.querySelector('#title').innerText = (_ref8 = (_res$nameRu = res.nameRu) !== null && _res$nameRu !== void 0 ? _res$nameRu : res.nameOriginal) !== null && _ref8 !== void 0 ? _ref8 : "-";
  document.querySelector('#year').innerText = (_res$year = res.year) !== null && _res$year !== void 0 ? _res$year : "-";
  document.querySelector('#rating').innerText = (_ref9 = (_ref10 = (_res$ratingKinopoisk = res.ratingKinopoisk) !== null && _res$ratingKinopoisk !== void 0 ? _res$ratingKinopoisk : res.rating) !== null && _ref10 !== void 0 ? _ref10 : res.ratingImdb) !== null && _ref9 !== void 0 ? _ref9 : "-";
  document.querySelector('#age').innerText = (_ref11 = res.ratingAgeLimits.split('age')[1] + '+') !== null && _ref11 !== void 0 ? _ref11 : "-";
  document.querySelector('#desc').innerText = (_res$description = res.description) !== null && _res$description !== void 0 ? _res$description : "-";
  let filmState = document.querySelector('select#filmState');
  filmState.addEventListener('selectorChange', () => {
    selectChangeValue(filmState, 0, true);
  });
  let playerUsed = document.querySelector('select#playerUsed');
  playerUsed.addEventListener('selectorChange', () => {
    loadPlayer(playerUsed.value);
  });
}

function watchSearch(type) {
  if (!document.querySelector('.result')) {
    let element = document.createElement('section');
    element.classList = 'result';
    element.id = 'result';
    element.innerHTML = "\n      <ul class=\"result__list\">\n      </ul>\n      <nav class=\"result__nav\">\n      </nav>\n    ";
    document.querySelector('.container').appendChild(element);
  }

  let urlvars = getUrlVars();
  let newhref = "watch?id=".concat(urlvars.id, "&type=").concat(type);
  let url = new URL(newhref, window.location.origin);
  window.history.replaceState({}, '', url);
  search();
  location.href = "#result";
}

function loadPlayer() {
  let urlvars = getUrlVars();
  let iframe = document.querySelector('.watch__player');
  var player = document.querySelector('select#playerUsed').value;

  switch (player) {
    case '0':
      iframe.src = "https://api1629919197.tobaco.ws/embed/kp/".concat(urlvars.id);
      break;

    case '1':
      iframe.src = "https://patriot.allohastream.com/?token=70f3e30270ec1a18376655a55e8646&kp=".concat(urlvars.id);
      break;

    case '2':
      iframe.src = "https://vcdn.kinoapi.club/sZfbdItt5jeX?kp_id=".concat(urlvars.id);
      break;

    default:
      iframe.src = "https://api1629919197.tobaco.ws/embed/kp/".concat(urlvars.id);
  }
}

function getUrlVars() {
  var vars = [],
      hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

  for (var i = 0; i < hashes.length; i++) {
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
      "X-API-KEY": "4b12f46d-638b-4bac-bf06-33865d3a3524"
    }
  });

  if (response.ok) {
    let data = await response.json();

    if (data.searchFilmsCountResult != 0) {
      return data;
    } else {
      console.log("Ошибка запроса");
      return 'Error';
    }
  } else {
    console.log("Ошибка сервера " + response.status);
    return 'Error';
  }
}