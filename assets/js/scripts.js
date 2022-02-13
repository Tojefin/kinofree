function addEvent() {
  var button = document.querySelector('#search-button');
  var title = document.querySelector('#search-title');
  button.addEventListener('click', function() {
    return search(getType());
    console.log(title);
  });
  title.addEventListener('keyup', function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      return search(getType());
      console.log(title);
    }
  });
}

async function getInfo(id) {
  let url = ('https://kinopoiskapiunofficial.tech/api/v2.2/films/' + id + '');
  let response = await fetch(url, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": "4b12f46d-638b-4bac-bf06-33865d3a3524",
    },
  });
  if (response.ok) {
    //console.log(await response.json());
    return await response.json();
  } else {
    return alert('error', response.status);
  }
}

function getType() {
  if (document.querySelector('.search').classList.contains("search--open")) {return 'filters';} else {return  'keyword';}
}

function getCard(id, img, title, year, rating, desc) {
  let link = "?watch="+id;
  return '<li class="card"><a href="'+link+'"><img class="card__img" src="'+img+'"></a><div class="card__info"><a href="'+link+'"><h3 class="card__title">'+title+'</h3></a><data class="card__year">'+year+'</data><p class="card__rating">'+rating+'</p><p class="card__descript">'+desc+'</p><small class="card__help">Поверните для описания</small></div></li>';
}

function getLoading() {
  return '<li class="card" id="loading"><img class="card__loading" src="assets/img/search-result.svg"></li>'
}

async function search(type, page) {
  document.querySelector('.main-info').classList.add('hide');
  document.querySelector('.result').classList.remove('hide');

  var title = document.querySelector('#search-title');

  $('.result_list').empty();
  for (let i = 0; i <= 6; i++) {
    $('.result_list').append(getLoading());
  }

  if (type === 'keyword') {

      let url = ('https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=' + title.value + '&page=1');
      let response = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "4b12f46d-638b-4bac-bf06-33865d3a3524",
        },
      });
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        $('.result_list').empty();
        $(data.films).each(function(index, item) {
          $('.result_list').append(getCard(item.filmId, item.posterUrlPreview, item.nameRu, item.year, item.rating, item.description));
        });
      } else {
        alert('Поиск не дал результата ', response.status);
      }
    }
    if (type === 'filters') {
      window.scrollTo(0, 0);
      let genr = '';
      $('input[type=checkbox]:checked').each(function(index) {
        if (genr == '') {
          genr = $(this).val();
        } else {
          genr = genr + ", " + $(this).val();
        }
      });

      var order = document.getElementById("sorting").value;
      var ftype = document.getElementById("film-type").value;
      var years = document.getElementById('years-slider').noUiSlider.get(true);
      var rating = document.getElementById('rating-slider').noUiSlider.get(true);
      if (page === undefined) {
        page = 1
      };
      //console.log(genr+" "+order+" "+ftype+" "+years[0]+" "+years[1]+" "+rating[0]+" "+rating[1]);

      let url = ('https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-filters?genre=' + genr + '&order=' + order + '&type=' + ftype + '&ratingFrom=' + rating[0] + '&ratingTo=' + rating[1] + '&yearFrom=' + years[0] + '&yearTo=' + years[1] + '&page=' + page);
      let response = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "4b12f46d-638b-4bac-bf06-33865d3a3524",
        },
      });
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        $('.result_list').empty();
        $(data.films).each(function(index, item) {
          let genr = '';
          $(item.genres).each(function(index, list) {
            if (genr == '') {
              genr = list.genre;
            } else {
              genr = genr + ", " + list.genre;
            }
          });
          $('.result_list').append(getCard(item.filmId, item.posterUrlPreview, item.nameRu, item.year, item.rating, genr));
        });
        var prew = page - 1;
        var next = page + 1;
        if (page == 1) {
          $('.result_list').append('<input type="button" value="Страница ' + next + '" onclick="search(`' + type + '`, 2)" class="button">');
        } else {
          $('.result_list').append('<div style="display: flex;"><input type="button" value="Страница ' + prew + '" onclick="search(`' + type + '`, ' + prew + ')" class="button"> <input type="button" value="Страница ' + next + '" onclick="search(`' + type + '`, ' + next + ')" class="button"></div>')
        };
      } else {
        alert('error', response.status);
      }
    }
    if (type === 'populars') {
      window.scrollTo(0, 0);
      if (page === undefined) {
        page = 1
      };
      let url = ('https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=' + page);
      let response = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "4b12f46d-638b-4bac-bf06-33865d3a3524",
        },
      });
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        $('.result_list').empty();
        $(data.films).each(function(index, item) {
          let genr = '';
          $(item.genres).each(function(index, list) {
            if (genr == '') {
              genr = list.genre;
            } else {
              genr = genr + ", " + list.genre;
            }
          });
          $('.result_list').append(getCard(item.filmId, item.posterUrlPreview, item.nameRu, item.year, item.rating, genr));
        });
        var prew = page - 1;
        var next = page + 1;
        if (page == 1) {
          $('.result_list').append('<input type="button" value="Страница ' + next + '" onclick="search(`' + type + '`, 2)" class="button">');
        } else {
          $('.result_list').append('<div style="display: flex;"><input type="button" value="Страница ' + prew + '" onclick="search(`' + type + '`, ' + prew + ')" class="button"> <input type="button" value="Страница ' + next + '" onclick="search(`' + type + '`, ' + next + ')" class="button"></div>')
        };
      } else {
        alert('error', response.status);
      }
    }
    if (type === 'premiers') {
      var date = new Date();
      var month = new Array();
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
      var tmonth = month[date.getMonth()];

      window.scrollTo(0, 0);
      let url = ('https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2022&month=' + tmonth);
      let response = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "4b12f46d-638b-4bac-bf06-33865d3a3524",
        },
      });
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        $('.result_list').empty();
        $(data.items).each(function(index, item) {
          let genr = '';
          $(item.genres).each(function(index, list) {
            if (genr == '') {
              genr = list.genre;
            } else {
              genr = genr + ", " + list.genre;
            }
          });
          $('.result_list').append(getCard(item.filmId, item.posterUrlPreview, item.nameRu, item.premiereRu, 'Длительность '+item.duration, genr));
        });
      } else {
        alert('error', response.status);
      }

    }
    if (type === 'similars') {
      let url = ('https://kinopoiskapiunofficial.tech/api/v2.2/films/' + page + '/similars');
      let response = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "4b12f46d-638b-4bac-bf06-33865d3a3524",
        },
      });
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        $('.result_list').empty();
        $(data.items).each(function(index, item) {
          $('.result_list').append(getCard(item.filmId, item.posterUrlPreview, item.nameRu));
        });
      } else {
        alert('error', response.status);
      }
    }
    if (type === 'sequels') {
      let url = ('https://kinopoiskapiunofficial.tech/api/v2.1/films/' + page + '/sequels_and_prequels');
      let response = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "4b12f46d-638b-4bac-bf06-33865d3a3524",
        },
      });
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        $('.result_list').empty();
        $(data).each(function(index, item) {
          $('.result_list').append(getCard(item.filmId, item.posterUrlPreview, item.nameRu, item.relationType));
        });
      } else {
        alert('error', response.status);
      }
    }
  }
  function select(input, value) {
    document.getElementById(input).value = value;
    document.getElementById(input).textContent = value;
    selectToggle(input+'-list')
  }

  function selectToggle(list) {
    document.getElementById(list).classList.toggle('select__list--open')
  }
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
  const content = document.querySelector('.content');

  window.onload = async function() {

    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('watch')) {
      document.querySelector('.header').classList.toggle('hide');
      document.querySelector('.vert').classList.toggle('hide');
      document.querySelector('.view').classList.toggle('hide');
      var id = urlParams.get('watch')
      watch(id);
      return;
    }
    else {
      createSliders();
      addEvent();
      document.querySelector('.header').classList.toggle('hide');
      document.querySelector('.search').classList.toggle('hide');
      document.querySelector('.menu--main').classList.toggle('hide');
      document.querySelector('.main-info').classList.toggle('hide');
    }
  }
  function toggleFilters(){
    document.querySelector('.search').classList.toggle("search--open");
  }

  function toggleInfo(){
    document.querySelector('.main-info__general').classList.toggle("hide");
    document.querySelector('.main-info__updates').classList.toggle("hide");
  }
  async function watch(id) {
    let data = await getInfo(id);
    document.title = data.nameRu + " — KinoFree"
    console.log();
    document.querySelector('#sim').setAttribute( "onClick", "javascript: search('similars', "+id+")")
    document.querySelector('#linked').setAttribute( "onClick", "javascript: search('sequels', "+id+")")
    $('.vert__info').append('<h3 class="view__title">' + data.nameRu + '</h3><data class="view__year">' + data.year + '</data><p class="view__rating">' + data.ratingKinopoisk + '</p>');
    $('.view__info').append('<h3 class="view__title">' + data.nameRu + '</h3><data class="view__year">' + data.year + '</data><p class="view__rating">' + data.ratingKinopoisk + '</p><p class="view__descript">' + data.description + '</p>');
    loadPlayer();
  }

  function loadPlayer() {
    const urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('watch');
    var player = document.querySelector('#player-select').value;
    switch (player) {
      case 'Alpha':
        $('#player').html('<iframe allowfullscreen sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation" src="https://api1629919197.tobaco.ws/embed/kp/' + id + '" allow="autoplay *"></iframe>')
        break;
      case 'Beta':
        $('#player').html('<iframe allowfullscreen sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation" src="https://patriot.allohastream.com/?token=70f3e30270ec1a18376655a55e8646&amp;kp=' + id + '" allow="autoplay *"></iframe>')
        break;
      case 'Gamma':
        $('#player').html('<iframe allowfullscreen sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation" src="https://vcdn.kinoapi.club/D89KbjxSAELP?kp_id=' + id + '" allow="autoplay *"></iframe>')
        break;
      default:
        $('#player').html('<iframe allowfullscreen sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation" src="https://api1629919197.tobaco.ws/embed/kp/' + id + '" allow="autoplay *"></iframe>')
    }
  }

  function linkcopy() {
    url = window.location.href
    navigator.clipboard.writeText(url).then(function() {
      console.log('URL copy successful');
    }, function(err) {
      console.error('URL copy error', err);
    });
  }
