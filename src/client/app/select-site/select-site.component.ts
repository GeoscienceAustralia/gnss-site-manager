import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import { DialogService, MiscUtilsService, CorsSiteService, ServiceWorkerService } from '../shared/index';
import { NotificationsService } from 'angular2-notifications';

/**
 * This class represents the SelectSiteComponent for searching and selecting CORS sites.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-select-site',
  templateUrl: 'select-site.component.html',
})
export class SelectSiteComponent implements OnInit {
  private serviceWorkerSubscription: Subscription;
  private searchTextSubject = new Subject<string>();
  private searchText: string = '';
  private sites: Array<any> = [];
  private selectedSite: any = null;
  private searchMsg: string = '';
  private errorMessage: string;
  private isSearching: boolean = false;
  private cacheItems: Array<string> = [];

  public columns: Array<any> = [
    {name: 'fourCharacterId', sort: ''},
    {name: 'name', sort: ''}
  ];


  public notificationsOtions: any = {
    timeOut: 5000,
    lastOnBottom: true,
    clickToClose: true,
    maxLength: 0,
    maxStack: 7,
    showProgressBar: true,
    pauseOnHover: true,
    preventDuplicates: false,
    preventLastDuplicates: 'visible',
    rtl: false,
    animate: 'scale',
    position: ['right', 'bottom']
  };

  /**
   * Creates an instance of the SelectSiteComponent with the injected CorsSiteService.
   *
   * @param {Router} router - The injected Router for switching between select-site and site-info pages.
   * @param {CorsSiteService} corsSiteService - The injected CorsSiteService.
   * @param {DialogService} dialogService - The injected DialogService.
   * @param {ServiceWorkerService} serviceWorkerService - service interface to the Service Worker
   * @param {MiscUtilsService} miscUtilsService - common constants and methods
   */
  constructor(public router: Router,
              public corsSiteService: CorsSiteService,
              private dialogService: DialogService,
              private miscUtilsService: MiscUtilsService,
              private serviceWorkerService: ServiceWorkerService,
              private notificationsService: NotificationsService
  ) { }

  /**
   * Initialize relevant variables when the directive is instantiated
   */
  ngOnInit() {
    this.searchTextSubject
        .debounceTime(400)
        .subscribe((newText: string) => this.onSearchTextChange(newText));
    this.setupSubscriptions();
    this.clearAll();
    this.updateCacheList();
  }

  setupSubscriptions() {
    this.serviceWorkerSubscription = this.serviceWorkerService.clearCacheObservable.subscribe((isCacheChanged: boolean) => {
      if (isCacheChanged) {
        this.updateCacheList();
      }
    });
  }

  /**
   * Run search function if users type any characters in "SearchText" input field, triggered by "change" event.
   *
   * Note: use ngModelChange event as it includes "keyup" event, paste and selection from dropdown hints.
   */
  public onSearchTextChange(value: string) {
    this.searchText = value;
    if (this.searchText === null || this.searchText.trim() === '') {
      this.clearAll();
    } else {
      this.searchSites();
    }
  }

  /**
   * Return a list of sites from DB based on the site name and/or four character Id.  Using WFS and XML.
   */
  public searchSites() {
    // New rule: search text could be either Site Id or Site Name
    let fourCharacterId: string = this.searchText;
    let siteName: string = this.searchText;

    this.errorMessage = null;
    this.isSearching = true;
    this.sites = [];
    this.notificationsService.alert('alert', 'content');

    this.corsSiteService.getCorsSitesByUsingWFS(fourCharacterId, siteName)
      .subscribe(
        (responseJson: any) => this.sites = responseJson,
        (error: Error) => this.errorMessage = <any>error,
        () => {
          this.isSearching = false;
          if (this.sites.length === 0) {
            this.searchMsg = 'No sites found. Please refine your search criteria and try it again.';
          } else {
            let msg: string = this.sites.length + (this.sites.length === 1 ? ' site' : ' sites') + ' found.';
            this.dialogService.showSuccessMessage(msg);
          }
        }
      );
  }

  /**
   * Select a site from the search results of sites.
   */
  public selectSite(site: any) {
    this.selectedSite = site;
    let link = ['/siteInfo', site.fourCharacterId];
    this.router.navigate(link);
  }

  /**
   * Clear all input fields and search results of sites
   */
  public clearAll() {
    this.errorMessage = null;
    this.searchMsg = 'Please enter search criteria for searching desired sites.';
    this.searchText = '';
    this.sites.length = 0;
    this.selectedSite = null;
    this.isSearching = false;
  }

  public getSortingOrder(index: number): string {
    if (index < 0 || index >= this.columns.length) {
      return 'ascending';
    } else if (!this.columns[index].sort || this.columns[index].sort === 'asc') {
      return 'ascending';
    } else {
      return 'descending';
    }
  }

  public sortField(columnIndex: number):any {
    let sort = this.columns[columnIndex].sort;
    for (let i = 0; i < this.columns.length; i ++) {
      if ( i === columnIndex) {
        if (!sort) {
          sort = 'asc';
        }
        this.columns[i].sort = (sort === 'asc') ? 'desc' : 'asc';
      } else {
        this.columns[i].sort = '';
      }
    }

    let columnName = this.columns[columnIndex].name;
    this.sites = this.sites.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  /**
   * Component method to request the Service Worker clears it's cache.
   */
  clearCache = (): void  => {
    this.serviceWorkerService.clearCache().then((data: string) => {
      console.debug('select-site.component clearCache() success: ', data);
    }, (error: Error) => {
      throw new Error('Error in clearCache: ' + error.message);
    });
  }

  /**
   * Component method to retrieve the list of URLs cached in the Service Worker and to update the this.cacheItem array
   */
  updateCacheList = (): void => {
    this.serviceWorkerService.getCacheList().then((data: string[]) => {
      this.cacheItems.length = 0;
      this.cacheItems = data;
    }).catch((error: any) => {
      console.error('Caught error in updateCacheList:', error);
    });
  }
}
