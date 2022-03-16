document.addEventListener('DOMNodeInserted', e => {
  if (e.target.id == 'arc-widget-container') {
    e.target.childNodes[0].childNodes[0]
    .contentWindow.document.querySelector('#launcher')
    .style.background = '#444'
  }
})
