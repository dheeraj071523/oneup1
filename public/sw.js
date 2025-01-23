const cachename = "site-static-v1";
const dynamicCachename = "site-dynamic-v1";
const assets = [
  "/",
  "/styles/globals.css",
  "/manifest.json",
  "/images/default profile.jpg",
  "/images/full-logo-black.dc3e624a01f5dc34c84d.png",
  "/offline.html",
  // "/components/Header/style.js",
];

const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cachename).then((cache) => {
      console.log("caching shell assets");
      cache.addAll(assets).then(() => self.skipWaiting());
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("service worker has been activated");
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== cachename && key !== dynamicCachename)
          .map((key) => caches.delete(key))
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  console.log("fetch event", event);
  event.respondWith(
    caches
      .match(event.request)
      .then((cacheRes) => {
        return (
          cacheRes ||
          fetch(event.request).then((fetchRes) => {
            return caches.open(dynamicCachename).then((cache) => {
              cache.put(event.request.url, fetchRes.clone());
              limitCacheSize(dynamicCachename, 15);
              return fetchRes;
            });
          })
        );
      })
      .catch(() => {
        if (event.request.url.indexOf(".js") > -1) {
          caches.match("/offline.html");
        }

        if (event.request.mode === "navigate") {
          return caches.match("/offline.html");
        }
      })
  );
});
