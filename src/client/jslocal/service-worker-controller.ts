// ServiceWorker in Typescript
// - found Events to use by looking at typings/globals/service_worker_api/index.d.ts and
//   looking for the 'on' event functions.

import { MessageObject } from '../app/shared/service-worker/messages.interface';

function debugEvent(event: Event): void {
  console.debug('Event: ', event.type, event);
};

function debugMsg(...args: any[]): void {
  var msg = '';
  for (var i = 0; i < args.length; i++) {
    msg += args[i];
  }
  console.debug(msg);
};

const version = '1';
const cacheBase = 'cache-v.';
const cacheName = cacheBase + version;

/**
 * Delete all caches but the current one
 * @param event
 * @param cacheName is cache to clean.  Or if undefined then clean ALL but the current cache
 */
function deleteOtherCaches(event: any): void {
  debugMsg('  deleteOtherCaches function - dont clean cache: ' + cacheName);
  event.waitUntil(
    self.caches.keys().then((cacheNames: string[]) => {
      // WARNING - Intellij says there is a syntax error here but AFIACT there isn't.  Don't spent time looking at this.
      return Promise.all(cacheNames.filter((cacheToTest: string) => {
          return cacheToTest !== cacheName;
        }).map((cacheToDelete: string) => {
          debugMsg('    delete cache: ' + cacheToDelete);
          self.caches.delete(cacheToDelete);
        })
      );
    })
  );
}

/**
 * Delete the named cache
 * @param event
 * @param cacheToDelete to delete
 */
function deleteCache(event: any, cacheToDelete: string): void {
  debugMsg('  deleteCache - clean cache: ' + cacheToDelete);
  event.waitUntil(
    self.caches.keys().then((cacheNames: string[]) => {
      // WARNING - Intellij says there is a syntax error here but AFIACT there isn't.  Don't spent time looking at this.
      return Promise.all(cacheNames.filter((cacheToTest: string) => {
          return cacheToTest === cacheToDelete;
        }).map((cacheToDelete: string) => {
          self.caches.delete(cacheToDelete);
        })
      );
    })
  );
}

self.addEventListener('install', (event: InstallEvent) => {
  debugEvent(event);
  debugMsg('Install: cache: ' + cacheName);
  event.waitUntil(
    self.caches.open(cacheName)
      .then((cache: Cache) => {
        cache.add('/');
      })
  );
});

self.addEventListener('activate', (event: ExtendableEvent) => {
  debugEvent(event);
  deleteOtherCaches(event);
});

/**
 * Retrieve from Cache and if not available then retrieve from network and store in cache
 */
self.addEventListener('fetch', (event: FetchEvent) => {
  // TODO: Consider implementing https://github.com/GoogleChrome/sw-precache - it updates cache if content changes
  event.respondWith(
    self.caches.open(cacheName).then((cache: Cache) => {  // 'cache-v.3'
      return cache.match(event.request).then((response: Response) => {
        if (response) {
          console.info('  matched: ', response.url);
          return response;
        }
        return self.fetch(event.request).then((response: Response) => {
          if (event.request.method.toString() === 'GET') {
            if (event.request.url.toString().startsWith('http')) {
              cache.put(event.request, response.clone());
              console.debug('cache: ', event.request.url);
            }
          } else if (event.request.method.toString() === 'POST') {
            // DEBUG for GEOD-232
            console.debug('  POST fetch event - url: ', event.request.url.toString());
            // let url = getServiceOfInterest(event.request.url.toString());
            // PERSUING not going through POST as can't interact with the App - using 'update_cache_entry' message from the Service
          }
          return response;
        });
      });
    })
  );
});

self.addEventListener('notificationclick', debugEvent);

// Don't think is used
self.addEventListener('notificationclose', debugEvent);

/**
 * Return list of URLS for requests in cache
 * @param event
 */
function getCache(event: MessageEvent): Promise<string[]> {
  debugMsg('getCache: ' + cacheName);
  let cacheUrls: string[] = [];
  return new Promise((resolve: Function, reject: Function) => {
    self.caches.has(cacheName).then(() => {
      self.caches.open(cacheName).then((cache: Cache) => {
        // debugMsg('  cache: ', cache);
        cache.keys().then((cacheKeys: Request[]) => {
          cacheKeys.map((request: Request) => {
            cacheUrls.push(request.url);
          });
          resolve(cacheUrls);
        }, (error: Error) => {
          // AFAIK this error happens when there are no keys
          console.error('self.caches.keys - no keys (not an error AFAIK): ', error);
          resolve(cacheUrls);
        });
      }, (error: Error) => {
        console.error('self.caches.open error: ', error);
        reject(error);
      });
    }, (error: Error) => {
      console.error('self.caches.has error: ', error);
      reject(error);
    });
  });
}

/**
 * Delete a specific entry from the cache. This will force the SW to go to the network to get a fresh copy.
 *
 * @param url
 * @returns: promise<boolean> - true if deleted an entry
 */
function deleteCacheEntry(url: string): Promise<boolean> {
  console.log('deleteCacheEntry - url: ', url);
  return new Promise((resolve: Function, reject: Function) => {
    self.caches.has(cacheName).then(() => {
      self.caches.open(cacheName).then((cache: Cache) => {
        cache.keys().then((cacheKeys: Request[]) => {
          cacheKeys.map((request: Request) => {
            let requestUrl: string = request.url.toString().toLowerCase();
            // console.debug('  deleteCacheEntry - consider cache entry: ' + requestUrl);
            if (requestUrl.length === url.length && requestUrl.includes(url.toLowerCase())) {
              console.debug('deleteCacheEntry - do so for url: ', url);
              cache.delete(request);
            }
            resolve(true);
          });
        }, (error: Error) => {
          // AFAIK this error happens when there are no keys
          console.error('deleteCacheEntry - no keys (not an error AFAIK): ', error);
          resolve(false); // TODO what should this be?
        });
      }, (error: Error) => {
        console.error('deleteCacheEntry - self.caches.open error: ', error);
        reject(error);
      });
    }, (error: Error) => {
      console.error('deleteCacheEntry - self.caches.has error: ', error);
      reject(error);
    });
  });
}

/**
 * Update the cache at url with a clone of the given response
 * @param url - key in cache
 * @param response - new data
 */
function updateCacheEntry(request: Request, response: Response): Promise<boolean> {
  console.debug('updateCacheEntry - url: '+ request.url + ', reponse: ', response);
  return new Promise((resolve: Function, reject: Function) => {
    self.caches.open(cacheName).then((cache: Cache) => {
      cache.put(request, response.clone()).then(
        () => {
          console.debug('updateCacheEntry success: ', request.url);
          resolve(true);
        },
        (error: Error) => {
          console.error('updateCacheEntry error for url: ' + request.url + ' - ', error);
          reject(false);
        });
    });
  });
}

self.addEventListener('message', (event: MessageEvent) => {
  debugEvent(event);
  let messageObject: MessageObject = event.data;
  // let operator:string, message:string;
  let {operation, message} = messageObject;
  debugMsg('Message - operation: ' + operation + ', message: ' + message);
  if (operation === 'clear_cache') {
    deleteCache(event, cacheName);
    // send reply as message to client
    event.ports[0].postMessage('message clear_cache complete');
  } else if (operation === 'get_cache') {
    debugMsg('Message: Get cache ');
    getCache(event).then((cacheContents: string[]) => {
      console.log('  cache keys for msg length: ', cacheContents.length);
      // send reply as message to client
      event.ports[0].postMessage(cacheContents);
    }, (error: Error) => {
      throw new Error('message - operation: get_cache ERROR');
    });
  } else if (operation === 'delete_cache_entry') {
    deleteCacheEntry(messageObject.message);
  } else if (operation === 'update_cache_entry') {
    // the message is a stringified request object
    updateCacheEntry(JSON.parse(messageObject.message), messageObject.object);
  } else {
    console.log('UNKNOWN MESSAGE TYPE');
  }
});

self.addEventListener('push', debugEvent);

self.addEventListener('pushsubscriptionchange', debugEvent);

self.addEventListener('sync', debugEvent);

self.addEventListener('controllerchange', debugEvent);

self.addEventListener('updatefound', debugEvent);

self.addEventListener('statechanged', debugEvent);

self.addEventListener('error', debugEvent);

// Don't think is used
// self.addEventListener('navigate', (event:SWEvent) => {
//   debugEvent(event);
// });
