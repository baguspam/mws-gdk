const staticCacheName = 'my-mwsPam-09';

self.addEventListener('install', function(event) {
    console.log('Installing...');

    // Create new caches
    let urlsToCaches = [
       '/index.html',
      '/manifest.json',
      '/assets/css/mzp-template.css',
      '/assets/css/menu.css',
      '/assets/css/body.css',
      '/assets/css/topbar-menu.css',
      '/assets/css/card.css',
      '/assets/css/font-awesome.min.css',
      '/assets/css/animated.css',
      '/assets/css/input.css',
      '/assets/css/table.css',
      '/assets/css/tabs.css',
      '/assets/css/404.css',
      '/assets/data/data_all.json',
      '/assets/js/menu.js',
      '/assets/js/jquery-3.3.1.min.js',
      '/assets/js/html5sql.js',
      '/assets/js/load-sql.js',
      '/assets/js/like.js',
      '/assets/js/share.js',
      '/assets/font/fontawesome-webfont.eot',
      '/assets/img/photo_profile.png'
    ];

    event.waitUntil(
        caches.open(staticCacheName).then(function(cache) {
            return cache.addAll(urlsToCaches);
        })
    );
});

self.addEventListener('activate', function(event) {
    console.log('Activating...');

    // Update all caches
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith('my-') && cacheName != staticCacheName;
                }).map(function(cacheName) {
                  return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    //console.log('Fetching...');

    event.respondWith(
        caches.match(event.request).then(function(response){
            //console.log(response);

            return response || fetch(event.request).then(function(response) {
                return caches.open(staticCacheName).then(function(cache) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            })
        })
    );
});