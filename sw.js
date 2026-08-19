const CACHE_NAME="habit-racer-v1";

const FILES_TO_CACHE=[
"./index.html",
"./manifest.json",
"./icon-192.png",
"./icon-512.png"
];

self.addEventListener("install",(e)=>{

e.waitUntil(

caches.open(CACHE_NAME).then((cache)=>{

return cache.addAll(FILES_TO_CACHE);

})

);

self.skipWaiting();

});

self.addEventListener("activate",(e)=>{

e.waitUntil(

caches.keys().then((keys)=>{

return Promise.all(

keys.filter((k)=>k!==CACHE_NAME).map((k)=>caches.delete(k))

);

})

);

self.clients.claim();

});

self.addEventListener("fetch",(e)=>{

e.respondWith(

caches.match(e.request).then((cached)=>{

return cached||fetch(e.request).catch(()=>caches.match("./index.html"));

})

);

});
