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
