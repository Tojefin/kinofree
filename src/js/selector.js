// by Tojefin
// v1.0
// Как использовать:
// 1. Разметить обычный селект
// 2. Указать id селекту
// 3. Добавить основной класс для селекта
// 4. В опции прописать числовой value от 0
// 5. Классы для стилей <основной класс>__[container, list, list--open, item, item--active]

//События селектов
function selectOnChange(origin, value, oldvalue) {
  if (value != oldvalue) {
    if (origin.id == 'filmState') {
      selectChangeValue(origin, 0, true)
    }
    if (origin.id == 'playerUsed') {
      loadPlayer()
    }
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
  oldvalue = origin.value
  let select = document.querySelector(`div#${origin.id}`)
  if (select) {
    select.value = value
    select.querySelector('span').innerText = select.querySelectorAll('li')[value].innerText
  }
  origin.value = value
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
      if (i == select.value) {
        options = `${options}<li class="${className}__item ${className}__item--active" value="${i}" onclick="selectOption(this)">${opt.innerText}</li>`
      } else {
        options = `${options}<li class="${className}__item" value="${i}" onclick="selectOption(this)">${opt.innerText}</li>`
      }
    });
    list.innerHTML = `${options}`
  }
}

// Инициализация селектов
const selectors = document.querySelectorAll('.selector')
if (selectors) {
  if (window.innerWidth > 768) {
    selectors.forEach((item) => {
      let select = `
          <span class="${item.classList}" onclick="selectToggle(this.parentNode)">${Array.from(item.querySelectorAll('option'))[item.value].innerText}</span>
          <ul class="${item.classList[0]}__list">
          </ul>
      `
      let element = document.createElement('div');
      element.id = item.id
      element.classList = `${item.classList[0]}__container`
      element.innerHTML = select
      item.parentNode.insertBefore(element, item);
      item.style.position = 'fixed';
      item.style.top = '-100vh';
    });
  } else {
    selectors.forEach((item) => {
      item.addEventListener('change', (event) => {
        let origin = document.querySelector(`select#${event.target.id}`)
        selectOnChange(origin, origin.value)
      });
    });
  }
}
