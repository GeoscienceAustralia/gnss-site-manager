import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServiceWorkerService } from '../index';
import { NavigationEnd, Router, ActivatedRoute, Params } from '@angular/router';
import { UserAuthService } from '../global/user-auth.service';
import { User } from 'oidc-client';

/**
 * This class represents the toolbar component which is the header of all UI pages.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  public siteId: string;
  public user: User | null = null;
  @Output() onSave: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onRevert: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onGoToSelectSitePage: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onGoToAboutPage: EventEmitter<boolean> = new EventEmitter<boolean>();
  private serviceWorkerSubscription: Subscription;
  private cacheItems: Array<string> = [];

  private loadedUserSub: any;

  constructor(private serviceWorkerService: ServiceWorkerService,
              private route: ActivatedRoute,
              private router: Router,
              private userAuthService: UserAuthService) {
  }

  ngOnInit() {
    this.setupSubscriptions();
    this.updateCacheList();
  }

  save() {
    this.onSave.emit( this.siteId !== null && this.siteId !== undefined );
  }

  revert() {
    this.onRevert.emit( this.siteId !== null && this.siteId !== undefined );
  }

  close() {
    this.onClose.emit( this.siteId !== null && this.siteId !== undefined );
  }

  goToSelectSitePage() {
    this.onGoToSelectSitePage.emit( this.siteId !== null && this.siteId !== undefined );
  }

  goToAboutPage() {
    this.onGoToAboutPage.emit( this.siteId !== null && this.siteId !== undefined );
  }

  hasFormChanged() {
    return true;
  }

  /**
   * Component method to request the Service Worker clears it's cache.
   */
  clearCache = (): void => {
    this.serviceWorkerService.clearCache().then((data: string) => {
      console.debug('toolbar.component clearCacheObservable() success: ', data);
      // Force a reloading of the cache
      self.location.reload();
    }, (error: Error) => {
      throw new Error('Error in clearCacheObservable: ' + error.message);
    });
  }

  updateCacheList = (): void => {
    this.serviceWorkerService.getCacheList().then((data: string[]) => {
      this.cacheItems.length = 0;
      this.cacheItems = data;
    }).catch((error: any) => {
      console.error('Caught error in updateCacheList:', error);
    });
  }

  login() {
    this.userAuthService.login();
  }

  logout() {
    this.userAuthService.logout();
  }

  private setupSubscriptions() {
    this.setupServiceWorkerSubscription();
    this.setupRouterSubscription();
    this.setupAuthSubscription();
  }

  private setupServiceWorkerSubscription() {
    this.serviceWorkerSubscription = this.serviceWorkerService.clearCacheObservable.subscribe((isCacheChanged: boolean) => {
      if (isCacheChanged) {
        this.updateCacheList();
      }
    });
  }

  private setupRouterSubscription() {
    this.router.events
        .filter(event => event instanceof NavigationEnd)
        .subscribe(event => {
          let currentRoute: ActivatedRoute = this.route.root;
          while (currentRoute.children[0] !== undefined) {
            currentRoute = currentRoute.children[0];
          }
          currentRoute.params.subscribe((param: Params) => {
            let obj: {id: string} = <any> param.valueOf();
            this.siteId = obj.id;
          });
    });
  }

  private setupAuthSubscription() {
    this.loadedUserSub = this.userAuthService.userLoadededEvent.subscribe((u: User) => {
        this.user = u;
    });
  }
}
