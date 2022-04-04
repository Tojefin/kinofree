//https://github.com/Tojefin/JS-tools

//События селектов
function selectOnChange(origin, valueId, oldvalueId) {
  if (valueId != oldvalueId) {
    if (origin.querySelectorAll('option')[oldvalueId]) {
      var oldvalue = origin.querySelectorAll('option')[oldvalueId].value
    } else {
      var oldvalue = null
    }
    let value = origin.value
    const event = new CustomEvent('selectorChange', {
      bubbles: true,
      detail: {value: `${value}`, oldvalue: `${oldvalue}`,
        valueId: `${valueId}`, oldvalueId: `${oldvalueId}`}
      });
    origin.dispatchEvent(event);
  }
}

//Выбор опции
function selectOption(option) {
  let select = option.parentNode.parentNode
  let origin = document.querySelector(`select#${select.id}`)
  selectChangeValue(origin, option.value)
  selectToggle(select)
}

//Изменение значения
function selectChangeValue(origin, value, noevent) {
  let select = document.querySelector(`div#${origin.id}`)
  if (select) {
    oldvalue = select.value
    select.querySelector('span').innerText = select.querySelectorAll('li')[value].innerText
    select.value = value
  }
  origin.value = origin.querySelectorAll('option')[value].value
  if (!noevent) {
    selectOnChange(origin, value, oldvalue)
  }
}

//Вкл / выкл списка опций
function selectToggle(select) {
  let list = select.querySelector('ul')
  let className = select.querySelector('span').classList[0]
  list.classList.toggle(`${list.classList[0]}--open`)
  if (list.classList.contains(`${list.classList[0]}--open`)) {
    let options = ``;
    document.querySelector(`select#${select.id}`).querySelectorAll('option').forEach((opt, i) => {
      if (opt.value == select.value) {
        classList = `${className}__item ${className}__item--active`
      } else {
        classList = `${className}__item`
      }
      options = `${options}<li class="${classList}" value="${i}" onclick="selectOption(this)">${opt.innerText}</li>`
    });
    list.innerHTML = `${options}`
    select.focus();
    select.addEventListener('focusout', () => {
      list.classList.remove(`${list.classList[0]}--open`)
      list.innerHTML = '';
    }, {once: true})
  } else {
    list.innerHTML = '';
  }
}

// Инициализация селектов
const selectors = document.querySelectorAll('select')
if (selectors) {
  if (window.innerWidth > 768) {
    selectors.forEach((item) => {
      let select = `
        <span class="${item.classList}" onclick="selectToggle(this.parentNode)">${Array.from(item.querySelectorAll('option'))[0].innerText}</span>
        <ul class="${item.classList[0]}__list"></ul>
      `
      let element = document.createElement('div');
      element.id = item.id
      element.value = 0
      element.tabIndex = '-1'
      element.classList = `${item.classList[0]}__container`
      element.innerHTML = select
      item.parentNode.insertBefore(element, item);
      item.style.cssText = `
        position: fixed;
        top: -100vh;
      `;
    });
  } else {
    selectors.forEach((item) => {
      item.addEventListener('change', (event) => {
        let origin = document.querySelector(`select#${event.target.id}`)
        selectOnChange(origin, origin.value, null)
      });
    });
  }
}
