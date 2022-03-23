document.addEventListener('DOMNodeInserted', e => {
  if (e.target.id == 'arc-widget-container') {
    let elm = e.target.childNodes[0].childNodes[0].contentWindow.document.querySelector('#launcher');
    elm.style.background = '#444';
  }
})
