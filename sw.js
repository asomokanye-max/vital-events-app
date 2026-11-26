// Vital Events Notifier service worker: lets the app open on weak or no connection.
// Pages, icons and the Supabase library are kept on the phone and refreshed from the
// network whenever possible. Requests to the database (supabase.co) are NEVER stored,
// so names and events are never kept on the device.
const CACHE = "ven-v0.3.1";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png",
  "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(SHELL.map(u => c.add(u).catch(() => null)))));
  self.skipWaiting();
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.hostname.endsWith("supabase.co")) return;          // database: always live, never stored
  const mine = url.origin === self.location.origin || url.hostname === "cdn.jsdelivr.net";
  if (!mine) return;
  e.respondWith(
    fetch(req).then(res => {                                   // network first, so updates arrive
      if (res && (res.ok || res.type === "opaque")) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match("./index.html")))
  );
});
