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
  document.querySelector('#age').innerText = res.ratingAgeLimits ? res.ratingAgeLimits.split('age')[1]+'+' : "-"
  document.querySelector('#desc').innerText = res.description ?? "-"

  let filmState = document.querySelector('select#filmState')
  filmState.addEventListener('selectorChange', () => {
    selectChangeValue(filmState, 0, true)
  })
  let playerUsed = document.querySelector('select#playerUsed')
  playerUsed.addEventListener('selectorChange', () => {
    loadPlayer(playerUsed.value)
  })
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
