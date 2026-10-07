const CACHE = "bennowo-v1";
const SHELL = [
    "index.html",
    "about.html",
    "projects.html",
    "css/styles.css",
    "css/projects.css",
    "manifest.webmanifest",
];

self.addEventListener("install", (e) => {
    e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)));
});

self.addEventListener("activate", (e) => {
    e.waitUntil(
        caches
            .keys()
            .then((keys) =>
                Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))),
            ),
    );
});

self.addEventListener("fetch", (e) => {
    if (e.request.method !== "GET") return;
    e.respondWith(
        caches.match(e.request).then(
            (hit) =>
                hit ||
                fetch(e.request)
                    .then((res) => {
                        const copy = res.clone();
                        caches.open(CACHE).then((c) => c.put(e.request, copy));
                        return res;
                    })
                    .catch(() => caches.match("index.html")),
        ),
    );
});
