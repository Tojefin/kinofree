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
    history.back();
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
