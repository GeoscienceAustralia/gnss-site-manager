import {Component, OnInit} from '@angular/core';
import {REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {Subscription} from 'rxjs/Subscription';
import {NameListService} from '../shared/index';
import {ServiceWorkerService} from '../shared/index';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  directives: [DROPDOWN_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})

export class HomeComponent implements OnInit {
  serviceWorkerSubscription: Subscription;
  newName: string = '';
  errorMessage: string;
  names: any[] = [];
  cacheItems: Array<string> = [];
  private numberCacheItems: number = 0;

  /**
   * Creates an instance of the HomeComponent with the injected
   * NameListService.
   *
   * @param {NameListService} nameListService - The injected NameListService.
   * @param {ServiceWorkerService} serviceWorkerService - the injected service for ServiceWorker
   */
  constructor(public nameListService: NameListService, private serviceWorkerService: ServiceWorkerService) {
  }

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    this.setupSubscriptions();
    this.getNames();
  }

  setupSubscriptions() {
    this.serviceWorkerSubscription = this.serviceWorkerService.clearCacheObservable.subscribe((isCacheChanged: boolean) => {
      if (isCacheChanged) {
        this.updateCacheList();
      }
    });
  }

  /**
   * Handle the nameListService observable
   */
  getNames() {
    this.nameListService.get()
      .subscribe(
        names => this.names = names,
        error => this.errorMessage = <any>error
      );
  }

  /**
   * Pushes a new name onto the names array
   * @return {boolean} false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    // TODO: implement nameListService.post
    this.names.push(this.newName);
    this.newName = '';
    return false;
  }

  /**
   * Component method to request the Service Worker clears it's cache.
   */
  clearCache=() => {
    this.serviceWorkerService.clearCache().then((data: string) => {
      console.debug('toolbar.component clearCache() success: ', data);
    }, (error: Error) => {
      throw new Error('Error in clearCache: '+ error.message);
    });
  };

  updateCacheList=() => {
    this.serviceWorkerService.getCacheList().then((data: string[]) => {
      this.cacheItems.length = 0;
      this.cacheItems = data;
      this.numberCacheItems = this.cacheItems.length;
    }, (error: Error) => {
      console.warn('Error in updateCacheList: '+ error.message);
    }).catch((error: any) => {
      console.error('Caught error in updateCacheList:', error);
    });
  };
}
