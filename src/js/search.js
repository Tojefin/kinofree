function preSearch(){
  if (document.querySelector('.search__form').classList.contains("search__form--open")) {
    let genr = [];
    document.querySelectorAll('input[type=checkbox]:checked').forEach((item) => {
      if (genr == '') {
        genr = item.value;
      } else {
        genr = genr + "," + item.value;
      }
    });

    var sorting = document.getElementById("sorting").value;
    var type = document.getElementById("film-type").value;
    var years = document.getElementById('years-slider').noUiSlider.get(true);
    var rating = document.getElementById('rating-slider').noUiSlider.get(true);

    location.href = `search.html?genr=${genr}&sort=${sorting}&type=${type}&years=${years}&rating=${rating}`
  } else {
    let keyword = document.querySelector('#search-title').value
    location.href = `search.html?keyword=${keyword}` //УБРАТЬ .html
  }
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
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

window.onload = async function() {
  if (location.pathname == '/search.html') {
    container = document.querySelector('.result')
    let urlvars = getUrlVars()
    if (!urlvars.page) {
      urlvars.page = 1;
    }
    switch (urlvars[0]) {
      case 'keyword':
        var url = ('https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=' + urlvars.keyword + '&page=' + urlvars.page);
        break;
      case 'genr':
        urlvars.genr = urlvars.genr.split(',')
        urlvars.rating = urlvars.rating.split(',')
        urlvars.years = urlvars.years.split(',')
        var url = ('https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-filters?genre=' + urlvars.genr + '&order=' + urlvars.sort + '&type=' + urlvars.type + '&ratingFrom=' + urlvars.rating[0] + '&ratingTo=' + urlvars.rating[1] + '&yearFrom=' + urlvars.years[0] + '&yearTo=' + urlvars.years[1] + '&page=' + urlvars.page);
        break;
      case 'popular':
        var url = ('https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=' + urlvars.page);
        break;
      case 'premiers':
        let date = new Date();
        let month = new Array();
        month[0] = "JANUARY";
        month[1] = "FEBRUARY";
        month[2] = "MARCH";
        month[3] = "APRIL";
        month[4] = "MAY";
        month[5] = "JUNE";
        month[6] = "JULY";
        month[7] = "AUGUST";
        month[8] = "SEPTEMBER";
        month[9] = "OCTOBER";
        month[10] = "NOVEMBER";
        month[11] = "DECEMBER";
        let tmonth = month[date.getMonth()];
        let year = date.getYear()
        var url = ('https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=20'+year.toString().substring(1)+'&month=' + tmonth);
        break;
    }

    let res = await apiReq(url)
    container.innerHTML = ''

    if (res == 'Error') {
      container.innerHTML += `
        <div>
          <h2 class="card__title">Ничего не найдено</h2>
          <p class="card__desc">Попробуйте изменить запрос</p>
        </div>
      `
      return
    }

    if (res.films) {
      var li = 'films';
    } else {
      var li = 'items';
    }

    res[li].forEach((item) => {
      var head = `
        <a href="/watch?id=${item.filmId}"><h2 class="card__title" title="${item.nameRu}">${item.nameRu}</h2></a>
      `
      if (item.premiereRu) {
        var year = `
          <small class="card__year">${item.premiereRu.replace('null', '-')}</small>
        `
      } else {
        var year = `
          <small class="card__year">${item.year.replace('null', '-')}</small>
        `
      }
      if (item.rating) {
        var rating = `
          <small class="card__rating">${item.rating.replace('null', '-')}</small>
        `
      } else {
        var rating = `
          <small class="card__rating">-</small>
        `
      }
      if (item.description) {
        var text = `
          <p class="card__desc">${item.description.replace('null', '-')}</p>
        `
      }
      if (item.genres) {
        var genr = ''
        item.genres.forEach((i) => {
          genr = `${genr}${i.genre} `
        });
        var text = `
          <p class="card__desc">${genr}</p>
        `
      }

      container.innerHTML += `
        <div class="card">
          <a href="/watch?id=${item.filmId}"><img class="card__img" loading="lazy" src="${item.posterUrl}"></a>
          <div class="card__info">
            ${head}
            ${year}
            ${rating}
            ${text}
          </div>
        </div>
      `
    });

    var prew = +urlvars.page - 1;
    var next = +urlvars.page + 1;
    if (urlvars.page == 1) {
      let vars = getUrlVars()
      if (vars.page) {
        container.innerHTML += `<input class="button result__button" type="button" value="Страница ${next}" onclick="location.href='${location.href.replace("&page="+urlvars.page, "&page="+next)}'">`
      } else {
        container.innerHTML += `<input class="button result__button" type="button" value="Страница ${next}" onclick="location.href='${location.href}&page=2'">`
      }

    } else {
      container.innerHTML +=`<div style="display: flex;"><input class="button result__button" type="button" value="Страница ${prew}" onclick="location.href='${location.href.replace("&page="+urlvars.page, "&page="+prew)}'"> <input class="button result__button" type="button" value="Страница ${next}" onclick="location.href='${location.href.replace("&page="+urlvars.page, "&page="+next)}'"></div>`
    };

  }
}
