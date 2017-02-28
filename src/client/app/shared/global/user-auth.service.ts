import { Injectable, EventEmitter } from '@angular/core';
import { UserManager, MetadataService, User } from 'oidc-client';

import { ConstantsService } from './constants.service';

/**
 * Service for authentication and authorisation of subjects.
 */
@Injectable()
export class UserAuthService {
    private userManager: UserManager;
    private currentUser: User;
    public userLoadededEvent: EventEmitter<User> = new EventEmitter<User>();

    constructor(private constantsService: ConstantsService) {
        this.userManager = new UserManager({
            authority: this.constantsService.getOpenAMServerURL() + '/oauth2',
            client_id: 'gnssSiteManager',
            redirect_uri: this.constantsService.getClientURL() + '/auth.html',
            post_logout_redirect_uri: this.constantsService.getClientURL(),
            response_type: 'id_token',
            scope: 'openid profile',
            silent_redirect_uri: this.constantsService.getClientURL() + '/renew',
            automaticSilentRenew: true,
            filterProtocolClaims: true,
            loadUserInfo: true
        });

        this.userManager.getUser()
            .then((user) => {
                if (user) {
                    this.currentUser = user;
                    this.userLoadededEvent.emit(user);
                }
                else {
                    this.currentUser = null;
                }
            })
            .catch((err) => {
                console.log(err);
                this.currentUser = null;
            });

        this.addEventHandlers();
    }

    private addEventHandlers() {
        this.userManager.events.addUserUnloaded((e) => {
            console.log('User logged out: ', e);
            this.currentUser = null;
        });
        this.userManager.events.addUserLoaded((e) => {
            console.log('User logged in: ', e);
        });
    }

    login() {
        this.userManager.signinRedirect().then(() => {
            console.log("UserAuthService - signinRedirect done");
        }).catch((err) => {
            console.log("UserAuthService - signinRedirect error");
            console.log(err);
        });
    }

    logout() {
        this.userManager.signoutRedirect().then((res) => {
            console.log("UserAuthService - signed out", res);
        }).catch((err) => {
            console.log("UserAuthService - signoutRedirect error");
            console.log(err);
        });
    };
}
