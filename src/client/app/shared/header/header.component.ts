import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { ServiceWorkerService, DialogService } from '../index';
import { UserAuthService } from '../global/user-auth.service';
import { ConstantsService, Link } from '../global/constants.service';
import { User } from 'oidc-client';
import { SiteLogService, ApplicationState } from '../site-log/site-log.service';
import { AbstractBaseComponent } from '../abstract-groups-items/abstract-base.component';

/**
 * This class represents the header component.
 */
@Component({
    moduleId: module.id,
    selector: 'sd-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
})
export class HeaderComponent extends AbstractBaseComponent implements OnInit, OnDestroy {
    public siteId: string;
    public user: User | null = null;

    public webUrlLinks: Link[] = ConstantsService.webUrlLinks;

    @Output() onSave: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() onRevert: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();

    private serviceWorkerSubscription: Subscription;
    private cacheItems: Array<string> = [];

    private isFormModified: boolean;
    private isFormInvalid: boolean;

    private unsubscribe: Subject<void> = new Subject<void>();

    constructor(private serviceWorkerService: ServiceWorkerService,
        private route: ActivatedRoute,
        private router: Router,
        private userAuthService: UserAuthService,
        private siteLogService: SiteLogService,
        private dialogService: DialogService) {

        super(siteLogService);
    }

    ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    ngOnInit(): void {
        this.setupSubscriptions();
        this.updateCacheList();
    }

    save(): void {
        this.onSave.emit(this.siteId !== null);
    }

    revert(): void {
        this.onRevert.emit(this.siteId !== null);
    }

    close(): void {
        this.onClose.emit(this.siteId !== null);
    }

    public isFormDirty(): boolean {
        return this.isFormModified;
    }

    public isSiteLogFormInvalid(): boolean {
        return this.isFormInvalid;
    }

    /**
     * Checks whether the save button should be disabled or not.
     * save is always enabled for new site because everything is optional
     * save is disabled if nothing has in the form has changed or the user is not allowed to edit this site
     */
    public isSaveDisabled(): boolean {
        return !this.isFormDirty() || !this.isAuthorised;
    }

    public isRevertDisabled(): boolean {
        return !this.isFormDirty();
    }

    /**
     * Component method to request the Service Worker clears it's cache.
     */
    clearCache(): void {
        this.serviceWorkerService.clearCache().then((data: string) => {
            console.debug('header.component clearCacheObservable() success: ', data);
            self.location.reload();
        }, (error: Error) => {
            throw new Error('Error in clearCacheObservable: ' + error.message);
        });
    }

    updateCacheList(): void {
        this.serviceWorkerService.getCacheList().then((data: string[]) => {
            this.cacheItems.length = 0;
            this.cacheItems = data;
        }).catch((error: any) => {
            console.error('Caught error in updateCacheList:', error);
        });
    }

    login(): void {
        this.userAuthService.login();
    }

    logout(): void {
        this.userAuthService.logout();
    }

    showUserProfile(): void {console.log(this.user.profile);
        let userProfile: string = '<div class="title">User Profile</div>'
            + '<div class="profile-table"><table>'
            + '<tr><td class="name">User Name</td><td class="value">' + this.user.profile.sub + '</td></tr>'
            + '<tr><td class="name">First Name</td><td class="value">' + (this.user.profile.first_name || '') + '</td></tr>'
            + '<tr><td class="name">Last Name</td><td class="value">' + (this.user.profile.family_name || '') + '</td></tr>'
            + '<tr><td class="name">Organisation</td><td class="value">' + (this.user.profile.organisation || '') + '</td></tr>'
            + '<tr><td class="name">Position</td><td class="value">' + (this.user.profile.position || '') + '</td></tr>'
            + '<tr><td class="name">Email Address</td><td class="value">' + (this.user.profile.email || '') + '</td></tr>'
            + '<tr><td class="name">Phone Number</td><td class="value">' + (this.user.profile.phone_number || '') + '</td></tr>'
            + '<tr><td class="name">Authorised Sites</td><td class="value">' + this.getAuthorisedSites() + '</td></tr>'
            +'</table></div>';
        this.dialogService.showAlertDialog(userProfile);
    }

    changePassword(): void {
        this.userAuthService.changePassword();
    }

    private setupSubscriptions(): void {
        this.setupServiceWorkerSubscription();
        this.setupRouterSubscription();
        this.setupAuthSubscription();
        this.setupSiteLogSubscription();
    }

    private setupServiceWorkerSubscription(): void {
        this.serviceWorkerSubscription = this.serviceWorkerService.clearCacheObservable
            .takeUntil(this.unsubscribe)
            .subscribe((isCacheChanged: boolean) => {
                if (isCacheChanged) {
                    this.updateCacheList();
                }
            });
    }

    private setupRouterSubscription(): void {
        // Route subscriptions dont ened to be unsubscribed from. See edit1 in https://stackoverflow.com/a/41177163/1019307.
        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe(event => {
                // find the site log component route and extract the site id
                let routeRoot: ActivatedRoute = this.route.root;
                while ((routeRoot.snapshot.url[0] && routeRoot.snapshot.url[0].path !== 'site') || routeRoot.firstChild) {
                    routeRoot = routeRoot.firstChild;
                    // check if more no more children
                    if (!routeRoot.firstChild) {
                        break;
                    }
                }
                routeRoot.params.subscribe((params: Params) => {
                    this.siteId = params['id'];
                    if (this.siteId && this.siteId !== 'newSite') {
                        this.siteId = this.siteId.toUpperCase();
                    }
                });
            });
    }

    private setupSiteLogSubscription(): void {
        this.siteLogService.getApplicationState()
            .takeUntil(this.unsubscribe)
            .subscribe((applicationState: ApplicationState) => {
                this.isFormModified = applicationState.applicationFormModified;
                this.isFormInvalid = applicationState.applicationFormInvalid;
            });
    }

    private setupAuthSubscription(): void {
        this.userAuthService.user
            .takeUntil(this.unsubscribe)
            .subscribe((u: User) => {
                this.user = u;
            });
    }

    private getAuthorisedSites(): string {
        return this.userAuthService.getAuthorisedSites();
    }
}
