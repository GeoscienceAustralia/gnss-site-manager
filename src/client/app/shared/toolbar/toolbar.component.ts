import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServiceWorkerService, DialogService } from '../index';
import { UserAuthService } from '../global/user-auth.service';
import { User } from 'oidc-client';
import { SiteLogService } from '../site-log/site-log.service';

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

    private serviceWorkerSubscription: Subscription;
  private cacheItems: Array<string> = [];

  private loadedUserSub: any;
    private isFormModifiedSubscription: Subscription;
    private isFormModifiedState: boolean;

  constructor(private serviceWorkerService: ServiceWorkerService,
              private route: ActivatedRoute,
              private router: Router,
              private userAuthService: UserAuthService,
            private siteLogService: SiteLogService,
            private dialogService: DialogService) {
  }

  ngOnInit() {
    this.setupSubscriptions();
    this.updateCacheList();
  }

  save() {
    this.onSave.emit( this.siteId !== null );
  }

  revert() {
    this.onRevert.emit( this.siteId !== null );
  }

  close() {
    this.onClose.emit( this.siteId !== null );
  }

  // TODO - need to get this status from SiteInfoComponent.siteInfoForm.dirty
  hasFormChanged() {
      return this.isFormModifiedState;
      // return false;
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

  showUserProfile() {
    let userProfile: string = '<div class="title">User Profile</div>'
            + '<div class="profile-table"><table>'
            + '<tr><td class="name">User Name</td><td class="value">' + this.user.profile.sub + '</td></tr>'
            + '<tr><td class="name">Full Name</td><td class="value">' + this.user.profile.name + '</td></tr>'
            + '<tr><td class="name">Last Name</td><td class="value">' + this.user.profile.family_name + '</td></tr>'
            + '<tr><td class="name">Authorized Sites</td><td class="value">' + this.getUserAuthorityString() + '</td></tr>'
            +'</table></div>';
    this.dialogService.showAlertDialog(userProfile);
  }

  changePassword() {
    this.userAuthService.changePassword();
  }

  private setupSubscriptions() {
    this.setupServiceWorkerSubscription();
    this.setupRouterSubscription();
    this.setupAuthSubscription();
    this.setupSiteLogSubscription();
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

  private setupSiteLogSubscription() {
      this.isFormModifiedSubscription = this.siteLogService.getIsFormModifiedSubscription().subscribe((isModified: boolean) => {
          this.isFormModifiedState = isModified;
      });
  }

  private setupAuthSubscription() {
    this.loadedUserSub = this.userAuthService.userLoadededEvent.subscribe((u: User) => {
        this.user = u;
    });
  }

  private getUserAuthorityString(): string {
    let authorities: any = [];
    for (let auth of this.user.profile.authorities) {
      auth = auth.toLowerCase();
      if (auth === 'superuser') {
        return 'All sites';
      } else if (auth.startsWith('edit-')) {
        authorities.push(auth.slice(5).toUpperCase());
      }
    }
    return authorities.join();
  }
}
