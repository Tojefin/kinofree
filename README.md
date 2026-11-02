# KINOFREE

[![Telegram](https://img.shields.io/badge/Telegram-24A1DE?style=for-the-badge)](https://t.me/+WRTVf77IofcxNDQ6)

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

## Сборка exe / apk (Tauri)

Приложение-обёртка живёт в `src-tauri/`, фронтенд берётся из `build/`.

### Локально

```powershell
powershell -ExecutionPolicy Bypass -File .\build-app.ps1 desktop   # exe (Windows)
powershell -ExecutionPolicy Bypass -File .\build-app.ps1 android   # apk
powershell -ExecutionPolicy Bypass -File .\build-app.ps1 all       # оба
```

Артефакты:

- exe: `src-tauri/target/release/bundle/nsis/Kinofree_<версия>_x64-setup.exe` (+ `.sig`)
- apk: `src-tauri/gen/android/app/build/outputs/apk/universal/release/`

Требуется: Rust (msvc), JDK 17, Android SDK/NDK. Ключи подписи лежат в `~/.tauri/` (не в репозитории) — без них обновления поверх старой версии невозможны, храните бэкап.

### На GitHub (рекомендуется)

Сборка запускается автоматически при пуше тега `v*` (workflow `.github/workflows/release.yml`):

1. Поднять версию в `package.json`, `src-tauri/tauri.conf.json` и `src-tauri/Cargo.toml`.
2. Закоммитить изменения и запушить тег:

```bash
git add -A
git commit -m "release: v5.0.2"
git tag v5.0.2
git push origin main --tags
```

3. В разделе [Releases](https://github.com/Tojefin/kinofree/releases) появится релиз с exe, apk и `latest.json` (файл для автообновления).

Необходимые секреты репозитория (Settings → Secrets and variables → Actions): `TAURI_SIGNING_PRIVATE_KEY`, `ANDROID_KEYSTORE_BASE64`, `TAURI_ANDROID_KEY_ALIAS`, `TAURI_ANDROID_KEY_PASSWORD`, `TAURI_ANDROID_STORE_PASSWORD`.

### Автообновление

- **exe**: при запуске проверяет `releases/latest/download/latest.json`, скачивает и устанавливает обновление автоматически.
- **apk**: при запуске проверяет последний релиз через GitHub API и предлагает скачать новый apk в браузере (Android запрещает тихую самообновляемость вне сторов).

Логика — в `src/lib/shared/scripts/autoUpdate/`.

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
