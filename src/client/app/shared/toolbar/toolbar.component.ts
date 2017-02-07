import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {NameListService, ServiceWorkerService} from '../index';
import {NavigationEnd, Router, ActivatedRoute, Params} from '@angular/router';
import {UserAuthService} from '../global/user-auth.service';

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
    @Output() onSave: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() onRevert: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();
    private serviceWorkerSubscription: Subscription;
    private cacheItems: Array<string> = [];
    private siteId: string;
    // private id_token: string;

    constructor(private serviceWorkerService: ServiceWorkerService,
                public nameListService: NameListService,
                private route: ActivatedRoute,
                private router: Router,
                private userAuthService: UserAuthService) {
    }

    ngOnInit() {
        this.setupSubscriptions();
        this.updateCacheList();
    }

    save() {
        this.onSave.emit(this.siteId !== null);
    }

    revert() {
        this.onRevert.emit(this.siteId !== null);
    }

    close() {
        this.onClose.emit(this.siteId !== null);
    }

    hasFormChanged() {
        return true;
    }

    private setupSubscriptions() {
        this.setupServiceWorkerSubscription();
        this.setupRouterSubscription();
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
    };

    updateCacheList = (): void => {
        this.serviceWorkerService.getCacheList().then((data: string[]) => {
            this.cacheItems.length = 0;
            this.cacheItems = data;
        }).catch((error: any) => {
            console.error('Caught error in updateCacheList:', error);
        });
    };

    getLoginActionString() {
        return this.userAuthService.getUserName() === '' ? 'login' : 'logout';
    }

    loginLogout() {
        console.log('toobar loginLogout');
        if (this.userAuthService.getUserName() === '') {
            this.userAuthService.login();
        } else {
            this.userAuthService.logout();
        }
    }

    getUserName() {
        return this.userAuthService.getUserName();
    }
}
