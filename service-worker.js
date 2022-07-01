const CACHE_NAME = "offline";
const OFFLINE_URL = "offline";
self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.add(new Request(OFFLINE_URL, { cache: "reload" }));
  })());
  self.skipWaiting();
});
self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    if ("navigationPreload" in self.registration) {
      await self.registration.navigationPreload.enable();
    }
  })());
  self.clients.claim();
});
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const preloadResponse = await event.preloadResponse;
        if (preloadResponse) {
          return preloadResponse;
        }
        const networkResponse = await fetch(event.request);
        return networkResponse;
      } catch (error) {
        console.log("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435; \u0432\u043C\u0435\u0441\u0442\u043E \u044D\u0442\u043E\u0433\u043E \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u0435\u043C \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0434\u043B\u044F \u0430\u0432\u0442\u043E\u043D\u043E\u043C\u043D\u043E\u0433\u043E \u0440\u0435\u0436\u0438\u043C\u0430.", error);
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(OFFLINE_URL);
        return cachedResponse;
      }
    })());
  }
});
