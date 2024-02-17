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

routes

- src/routes/\* - схема из папок и страниц, отвечает за навигацию и отображение страниц
- src/routes/\*/+page.svelte (+layout.svelte) - состоит из блоков и отвечает за их отображение на основании глобальных состояний

lib

> используйте index.js в качестве маршрутизатора импортов

- src/lib/blocks/\* - компонент со сложной логикой состоящий из элементов и доп файлы для него, решает бизнес задачи
- src/lib/elements/\* - маленький компонент с логикой только для своего UI
- src/lib/stores/\* - глобальные сторы
- src/lib/scripts/\* - глобальные js функции

static

- static/\* - favicon.svg и robots.txt
- static/fonts - шрифты
- static/icons - иконки
- static/images - картинки
- static/styles - глобальные стили (reset.css, normalize.css)
