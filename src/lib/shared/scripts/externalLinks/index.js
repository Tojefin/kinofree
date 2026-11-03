// В Tauri window.open / target="_blank" заблокированы — внешние ссылки
// (донат, telegram, kinopoisk, mailto) открываем в системном браузере
export default function externalLinks() {
	if (!('__TAURI_INTERNALS__' in window)) return;

	document.addEventListener('click', async (event) => {
		try {
			const link = event.target?.closest?.('a[href]');
			if (!link) return;

			const url = new URL(link.href, location.href);
			const isExternalHttp =
				(url.protocol === 'http:' || url.protocol === 'https:') && url.origin !== location.origin;

			if (!isExternalHttp && url.protocol !== 'mailto:') return;

			event.preventDefault();
			const { openUrl } = await import('@tauri-apps/plugin-opener');
			await openUrl(url.toString());
		} catch (error) {
			console.error(error);
		}
	});
}
