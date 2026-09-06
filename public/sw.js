const CACHE = 'steak-hub-v2'

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      cache.addAll(['/Steak-Hub/', '/Steak-Hub/index.html', '/Steak-Hub/favicon.svg', '/Steak-Hub/manifest.webmanifest']),
    ),
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))),
    ),
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return
  event.respondWith(
    caches.match(req).then((cached) => {
      const fetched = fetch(req)
        .then((response) => {
          if (response && response.ok && response.type === 'basic') {
            const clone = response.clone()
            caches.open(CACHE).then((cache) => cache.put(req, clone))
          }
          return response
        })
        .catch(() => cached)
      return cached || fetched
    }),
  )
})
