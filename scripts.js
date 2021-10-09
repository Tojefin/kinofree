
  document.addEventListener('DOMContentLoaded', function () {
    var search = document.querySelector('#search');
    var title = document.querySelector('#search-title');
		var template = $('#hidden-template').html();
		if (search) {
      search.addEventListener('click', function () {
				$(".listBlock").remove();
        if (document.getElementById("form").style.height == '256px'){
					var type = 'filters'
				} else{
          var type = 'keyword'
				}
        return search_parse(type);
				console.log(title);
      });
    }
    if (title) {
      title.addEventListener('keyup', function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
					$(".listBlock").remove();
          if (document.getElementById("form").style.height == '256px'){
  					var type = 'filters'
  				} else{
            var type = 'keyword'
  				}
          return search_parse(type);
					console.log(title);
        }
      });
    }
  });


	var title = document.querySelector('#search-title');
  var template = $('#hidden-template').html();

	async function search_parse(type, page) {
		$('#search-list').empty();
		for (let i = 0; i <= 6; i++) {
			$('#search-list').append(template);
		}
		$("#about").remove();
    if (type === 'keyword'){
        let url = ('https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=' + title.value + '&page=1');
        let response = await fetch(url , {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "4b12f46d-638b-4bac-bf06-33865d3a3524",
          },
        });
        if (response.ok) {
          let data = await response.json();
          console.log(data);
          $('#search-list').empty();
          $(data.films).each(function(index, item) {
            $('#search-list').append('<div class="listBlock"><img class="listImg" onclick="watch('+item.filmId+')" src="'+ item.posterUrlPreview +'" width="20%" height="20%"><div style="display: grid;grid-template-columns: repeat(5, 1fr);grid-template-rows: repeat(5, 1fr);height: 0px;margin: 10px 10px;width: -webkit-fill-available;"><text class="listName" onclick="watch('+item.filmId+')">' + item.nameRu + '</text><text class="listYear">' + item.year + '</text><text class="listRating">' + item.rating + '</text><text class="listDesc">' + item.description + '</text></div></div>');
          });
        } else {
          alert('error', response.status);
        }
    }
    if (type === 'filters'){
        window.scrollTo(0, 0);
        let genr = '';
        $('input[type=checkbox]:checked').each(function(index){
          if (genr == ''){genr = $(this).val();} else{genr = genr+", "+$(this).val();}
        });

        var order = document.getElementById("sorting").value;
        var ftype = document.getElementById("kinotype").value;
        var years = document.getElementById('years-slider').noUiSlider.get(true);
        var rating = document.getElementById('rating-slider').noUiSlider.get(true);
        if (page === undefined){page=1};
        //console.log(genr+" "+order+" "+ftype+" "+years[0]+" "+years[1]+" "+rating[0]+" "+rating[1]);

        let url = ('https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-filters?genre='+genr+'&order='+order+'&type='+ftype+'&ratingFrom='+rating[0]+'&ratingTo='+rating[1]+'&yearFrom='+years[0]+'&yearTo='+years[1]+'&page='+page);
        let response = await fetch(url , {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "4b12f46d-638b-4bac-bf06-33865d3a3524",
          },
        });
        if (response.ok) {
          let data = await response.json();
          console.log(data);
          $('#search-list').empty();
          $(data.films).each(function(index, item) {
            let genr = '';
            $(item.genres).each(function(index, list){
              if (genr == ''){genr = list.genre;} else{genr = genr+", "+list.genre;}
            });
            $('#search-list').append('<div class="listBlock"><img class="listImg" onclick="watch('+item.filmId+')" src="'+ item.posterUrlPreview +'" width="20%" height="20%"><div style="display: grid;grid-template-columns: repeat(5, 1fr);grid-template-rows: repeat(5, 1fr);height: 0px;margin: 10px 10px;width: -webkit-fill-available;"><text class="listName" onclick="watch('+item.filmId+')">' + item.nameRu + '</text><text class="listYear">' + item.year + '</text><text class="listRating">' + item.rating + '</text><text class="listDesc">' + genr + '</text></div></div>');
          });
          var prew = page-1;
          var next = page+1;
          if (page == 1){$('#search-list').append('<input type="button" value="Страница '+next+'" onclick="search_parse(`'+type+'`, 2)" class="subbutton" style="display: flex;">');
        } else{$('#search-list').append('<div style="display: flex;"><input type="button" value="Страница '+prew+'" onclick="search_parse(`'+type+'`, '+prew+')" class="subbutton"> <input type="button" value="Страница '+next+'" onclick="search_parse(`'+type+'`, '+next+')" class="subbutton"></div>')};
        } else {alert('error', response.status);}
      }
      if (type === 'populars'){
        window.scrollTo(0, 0);
        if (page === undefined){page=1};
        let url = ('https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page='+page);
        let response = await fetch(url , {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "4b12f46d-638b-4bac-bf06-33865d3a3524",
          },
        });
        if (response.ok) {
          let data = await response.json();
          console.log(data);
          $('#search-list').empty();
          $(data.films).each(function(index, item) {
            let genr = '';
            $(item.genres).each(function(index, list){
              if (genr == ''){genr = list.genre;} else{genr = genr+", "+list.genre;}
            });
            $('#search-list').append('<div class="listBlock"><img class="listImg" onclick="watch('+item.filmId+')" src="'+ item.posterUrlPreview +'" width="20%" height="20%"><div style="display: grid;grid-template-columns: repeat(5, 1fr);grid-template-rows: repeat(5, 1fr);height: 0px;margin: 10px 10px;width: -webkit-fill-available;"><text class="listName" onclick="watch('+item.filmId+')">' + item.nameRu + '</text><text class="listYear">' + item.year + '</text><text class="listRating">' + item.rating + '</text><text class="listDesc">' + genr + '</text></div></div>');
          });
          var prew = page-1;
          var next = page+1;
          if (page == 1){$('#search-list').append('<input type="button" value="Страница '+next+'" onclick="search_parse(`'+type+'`, 2)" class="subbutton" style="display: flex;">');
        } else{$('#search-list').append('<div style="display: flex;"><input type="button" value="Страница '+prew+'" onclick="search_parse(`'+type+'`, '+prew+')" class="subbutton"> <input type="button" value="Страница '+next+'" onclick="search_parse(`'+type+'`, '+next+')" class="subbutton"></div>')};
        } else {alert('error', response.status);}
      }
      if (type === 'premiers'){
        var date=new Date();
        var month=new Array();
        month[0]="JANUARY";
        month[1]="FEBRUARY";
        month[2]="MARCH";
        month[3]="APRIL";
        month[4]="MAY";
        month[5]="JUNE";
        month[6]="JULY";
        month[7]="AUGUST";
        month[8]="SEPTEMBER";
        month[9]="OCTOBER";
        month[10]="NOVEMBER";
        month[11]="DECEMBER";
        var tmonth = month[date.getMonth()];

        window.scrollTo(0, 0);
        let url = ('https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2021&month='+tmonth);
        let response = await fetch(url , {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "4b12f46d-638b-4bac-bf06-33865d3a3524",
          },
        });
        if (response.ok) {
          let data = await response.json();
          console.log(data);
          $('#search-list').empty();
          $(data.items).each(function(index, item) {
            let genr = '';
            $(item.genres).each(function(index, list){
              if (genr == ''){genr = list.genre;} else{genr = genr+", "+list.genre;}
            });
            $('#search-list').append('<div class="listBlock"><img class="listImg" onclick="watch('+item.filmId+')" src="'+ item.posterUrlPreview +'" width="20%" height="20%"><div style="display: grid;grid-template-columns: repeat(5, 1fr);grid-template-rows: repeat(5, 1fr);height: 0px;margin: 10px 10px;width: -webkit-fill-available;"><text class="listName" onclick="watch('+item.filmId+')">' + item.nameRu + '</text><text class="listYear">' + item.premiereRu + '</text><text class="listRating" style="color: #d018a0">' + item.duration + ' минут</text><text class="listDesc">' + genr + '</text></div></div>');
          });
        } else {alert('error', response.status);}

      }
      if (type === 'similars'){
        let url = ('https://kinopoiskapiunofficial.tech/api/v2.2/films/'+page+'/similars');
        let response = await fetch(url , {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "4b12f46d-638b-4bac-bf06-33865d3a3524",
          },
        });
        if (response.ok) {
          let data = await response.json();
          console.log(data);
          $('#search-list').empty();
          $(data.items).each(function(index, item) {
            $('#search-list').append('<div class="listBlock"><img class="listImg" onclick="watch('+item.filmId+')" src="'+ item.posterUrlPreview +'" width="20%" height="20%"><div style="display: grid;grid-template-columns: repeat(5, 1fr);grid-template-rows: repeat(5, 1fr);height: 0px;margin: 10px 10px;width: -webkit-fill-available;"><text class="listName" onclick="watch('+item.filmId+')">' + item.nameRu + '</text><text class="listYear"></text><text class="listRating"></text><text class="listDesc"></text></div></div>');
          });
        } else {
          alert('error', response.status);
        }
      }
      if (type === 'sequels'){
        let url = ('https://kinopoiskapiunofficial.tech/api/v2.1/films/'+page+'/sequels_and_prequels');
        let response = await fetch(url , {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "4b12f46d-638b-4bac-bf06-33865d3a3524",
          },
        });
        if (response.ok) {
          let data = await response.json();
          console.log(data);
          $('#search-list').empty();
          $(data).each(function(index, item) {
            $('#search-list').append('<div class="listBlock"><img class="listImg" onclick="watch('+item.filmId+')" src="'+ item.posterUrlPreview +'" width="20%" height="20%"><div style="display: grid;grid-template-columns: repeat(5, 1fr);grid-template-rows: repeat(5, 1fr);height: 0px;margin: 10px 10px;width: -webkit-fill-available;"><text class="listName" onclick="watch('+item.filmId+')">' + item.nameRu + '</text><text class="listYear"></text><text class="listRating"></text><text class="listDesc"></text></div></div>');
          });
        } else {
          alert('error', response.status);
        }
      }
  }
	function watch(id) {
		var url = new URL("http://kinofree.skyedge.xyz/");
		url.searchParams.append('watch', id);
		window.location.href = url
	}
  function advancetform() {
		var form = document.getElementById("form");
		var advancet = document.querySelector(".advancet");

		if (advancet.style.maxHeight == '256px'){
			form.style.height = "56px";
			advancet.style.maxHeight = "0px";
		} else{
			form.style.height = "256px";
			advancet.style.maxHeight = "256px";
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

	window.onload = async function() {
		const urlParams = new URLSearchParams(window.location.search);
		if (urlParams.has('watch')){
			var id = urlParams.get('watch')
			$("#hiddeonplayer").remove();
			$('#player').append('<iframe src="https://apilordfilms-s.tobaco.ws/embed/kp/'+id+'" allow="autoplay *" width="500" height="300" allowfullscreen="" webkitallowfullscreen="" mozallowfullscreen="" oallowfullscreen="" msallowfullscreen="" style="border: hidden;border-radius: 10px;width: 90%;min-height: 50vh;box-shadow: 0px 0px 4px 0px rgb(80 80 80 / 70%);margin: 20px 0px;"></iframe>');
			let data = await getInfo(id);
			$('#film-info').append('<div style="display:flex;"><input title="Скопировать ссылку" type="button" value="Ссылка &#128279;" class="subbutton" onclick="linkcopy()" style="margin: 0 5px 0 0;"> <input title="Найти фильмы похожие на этот" type="button" value="Похожее" class="subbutton" onclick="search_parse(`similars`, '+id+')" style="margin: 0 5px 0 0;"> <input title="Показать фильмы связанные с этим" type="button" value="Связанное" class="subbutton" onclick="search_parse(`sequels`, '+id+')" style="margin: 0 5px 0 0;"></div><text style="font-size: 24px;">' + data.nameRu + '</text><br><text style="margin-right: 10px;">' + data.year + '</text><text style="color: #aea">' + data.ratingKinopoisk + '</text><br><text style="bottom: 10px;position: relative;display: block;margin: 10px 0;" class="listDesc">' + data.description + '</text>');
		}
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
				},
		});
		}

	async function getInfo(id) {
		let url = ('https://kinopoiskapiunofficial.tech/api/v2.2/films/' + id +'');
		let response = await fetch(url , {
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
