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
