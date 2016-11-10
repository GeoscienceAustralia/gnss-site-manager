import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MessageObject } from './messages.interface';
import { Response } from '@angular/http';

/**
 * This class provides the service for the application's service worker that is global to the browser.
 */
@Injectable()
export class ServiceWorkerService {
  // Setup Observables to communicate between components
  private clearCacheFlag = new BehaviorSubject<boolean>(false);
  public clearCacheObservable = this.clearCacheFlag.asObservable();

  private static isServiceWorkerReady(): boolean {
    // !! forces truthy (error otherwise in this situation)
    return (!!('serviceWorker' in navigator) && !!navigator.serviceWorker
    && !!('controller' in navigator.serviceWorker)
    && !!navigator.serviceWorker.controller);
  }

  /**
   *
   * @returns {Promise<any>} that may contain a message about the operation
   */
  clearCache(): Promise<string> {
    let promise: Promise<string> = this.postMessage({operation: 'clear_cache'});

    promise.then(() => {
      this.clearCacheFlag.next(true);
    });
    return promise;
  }

  /**
   *
   * @returns {Promise<any>} that contains an array of items in the cache
   */
  getCacheList(): Promise<string[]> {
    return this.postMessage({operation: 'get_cache'});
  }

  deleteCacheEntry(url: string): Promise<boolean> {
    let message: MessageObject = { message: url, operation: 'delete_cache_entry'};
    return this.postMessage(message);
  }

  /**
   * Update a Service Worker cache entry with the given url with the given response.
   *
   * @param response as new data
   * @param request of entry in cache to update
   * @returns {Promise<boolean>} - if successful
   */
  updateCacheEntry(request: Request, response: Response): Promise<boolean> {
    return new Promise((resolve: Function, reject: Function) => {
      let requestString: string = JSON.stringify(request);
      let message: MessageObject = {message: request.url, operation: 'delete_cache_entry'};
      this.postMessage(message).then(
        (success: any) => {
          message = {message: requestString, operation: 'update_cache_entry', object: response};
          return this.postMessage(message);
        },
        (error: Error) => {
          console.error('ERROR deleting cache entry for url: ', request.url);
          return new Promise((resolve: Function, reject: Function) => {
              reject(false);
            }
          );
        }
      );
    });
  }

    /**
   * Generic method to post messages to the service worker and return a promise to the caller
   * @param message MessageObject with fields 'operation' and optional message.
   * @returns {Promise<T>} that is appropriate to the client of this method
   */
  postMessage(message: MessageObject): Promise<any> {
    console.debug('ServiceWorkerService - postMessage: ', message);
    // let messageObject = {operation: operation, message: message} as MessageObject;
    return new Promise((resolve: Function, reject: Function) => {
      if (ServiceWorkerService.isServiceWorkerReady()) {
        var messageChannel = new MessageChannel();
        messageChannel.port1.onmessage = function (event: MessageEvent) {
          if (event.data.error) {
            reject(event.data.error);
          } else {
            resolve(event.data);
          }
        };

        // This sends the message data as well as transferring messageChannel.port2 to the service worker.
        // The service worker can then use the transferred port to reply via postMessage(), which
        // will in turn trigger the onmessage handler on messageChannel.port1.
        navigator.serviceWorker.controller.postMessage(message, [messageChannel.port2]);
      } else {
        console.log('postMessage: service worker not ready');
      }
    });
  }
}
