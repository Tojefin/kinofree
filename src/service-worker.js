const CACHE_NAME = 'offline';
const OFFLINE_URL = 'offline';

// В Tauri-приложении (exe/apk) все файлы локальные, а service worker
// ломает навигацию по кастомному протоколу tauri.localhost — самоуничтожаемся
const IS_TAURI = self.location.hostname === 'tauri.localhost' || self.location.protocol === 'tauri:';

if (IS_TAURI) {
	self.addEventListener('install', () => self.skipWaiting());

	self.addEventListener('activate', (event) => {
		event.waitUntil(
			(async () => {
				await caches.delete(CACHE_NAME);
				await self.registration.unregister();
				await self.clients.claim();
			})()
		);
	});
} else {
	self.addEventListener('install', (event) => {
		event.waitUntil(
			(async () => {
				const cache = await caches.open(CACHE_NAME);
				await cache.add(new Request(OFFLINE_URL, { cache: 'reload' }));
			})()
		);
		self.skipWaiting();
	});

	self.addEventListener('activate', (event) => {
		event.waitUntil(
			(async () => {
				if ('navigationPreload' in self.registration) {
					await self.registration.navigationPreload.enable();
				}
			})()
		);

		self.clients.claim();
	});

	self.addEventListener('fetch', (event) => {
		if (event.request.mode === 'navigate') {
			event.respondWith(
				(async () => {
					try {
						const preloadResponse = await event.preloadResponse;
						if (preloadResponse) {
							return preloadResponse;
						}

						const networkResponse = await fetch(event.request);
						return networkResponse;
					} catch (error) {
						console.log(
							'Не удалось получить данные; вместо этого возвращаем страницу для автономного режима.',
							error
						);

						const cache = await caches.open(CACHE_NAME);
						const cachedResponse = await cache.match(OFFLINE_URL);
						return cachedResponse;
					}
				})()
			);
		}
	});
}
