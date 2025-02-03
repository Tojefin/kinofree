# KINOFREE

## Developing

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

```bash
npm run build
```

## Структура проекта

lib

> используйте index.js в качестве маршрутизатора импортов

- src/lib/blocks/\* - компонент со сложной логикой состоящий из элементов и доп файлы для него, решает бизнес задачи
- src/lib/elements/\* - маленький компонент с логикой только для своего UI
- src/lib/pages/\* - страницы, которые используются в роутере
	- ui. - главный компонент для экспорта
	- complex. - ситуативный компонент для разной компановки на одной странице
- src/lib/shared/\* - глобальные хелперы, иконки, api клиенты, сторы

routes

- src/routes/\* - схема из папок и файлов, отвечает за навигацию и отображение страниц
	- +page.svelte (+layout.svelte) - содержит 1 копмонент из pages

static

- static/\* - favicon.svg и robots.txt
- static/fonts - шрифты
- static/icons - иконки
- static/images - картинки
- static/styles - глобальные стили (reset.css, normalize.css)
