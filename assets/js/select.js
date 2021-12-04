function select(input, value) {
  document.getElementById(input).value = value;
  document.getElementById(input).textContent = value;
  selectToggle(input+'-list')
}

function selectToggle(list) {
  document.getElementById(list).classList.toggle('select__list--open')
}
