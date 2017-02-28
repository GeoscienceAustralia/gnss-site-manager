import {Injectable, EventEmitter} from '@angular/core';
import {UserManager, MetadataService, User} from 'oidc-client';

import {ConstantsService} from './constants.service';

/**
 * Service for authentication and authorisation of subjects.
 */

@Injectable()
export class UserAuthService {
    private settings: any = {};
    private userManager: UserManager;
    private currentUser: User;
    private loggedIn: boolean = false;
    public userLoadededEvent: EventEmitter<User> = new EventEmitter<User>();

    constructor(private constantsService: ConstantsService) {
        this.setup();
        this.loginIfUser();
        this.addEvents();
    }

    private setup(): void {
        this.settings = {
            authority: this.constantsService.getOpenAMServerURL() + '/oauth2',
            client_id: 'gnssSiteManager',
            redirect_uri: this.constantsService.getClientURL() + '/auth.html',
            post_logout_redirect_uri: this.constantsService.getClientURL(),
            response_type: 'id_token',
            scope: 'openid profile',

            silent_redirect_uri: this.constantsService.getClientURL() + '/renew',
            automaticSilentRenew: true,
            //silentRequestTimeout:10000,

            filterProtocolClaims: true,
            loadUserInfo: true
        };

        this.userManager = new UserManager(this.settings);
    }


    private loginIfUser() {
        this.userManager.getUser()
            .then((user) => {
                if (user) {
                    console.log('UserAuthService - loginIfUser() - user exists')
                    // this.loggedIn = true;
                    this.currentUser = user;
                    this.userLoadededEvent.emit(user);
                }
                else {
                    console.log('UserAuthService - loginIfUser() - user NOT exist')
                    this.currentUser = null;
                }
            })
            .catch((err) => {
                this.currentUser = null;
                // this.loggedIn = false;
            });
    }

    private addEvents() {
        this.userManager.events.addUserUnloaded((e) => {
            // this.loggedIn = false;
            console.log('User logged out: ', e);
            this.currentUser = null;
        });
        this.userManager.events.addUserLoaded((e) => {
            // this.loggedIn = true;
            console.log('User logged in: ', e);
        });
    }

    getUser() {
        this.userManager.getUser().then((user) => {
            console.log("UserAuthService got user", user);
            this.userLoadededEvent.emit(user);
        }).catch(function (err) {
            console.log(err);
        });
    }

    isLoggedIn() {
        return this.getUser() !== undefined;
    }

    removeUser() {
        this.userManager.removeUser().then(() => {
            console.log("UserAuthService - user removed");
            this.userLoadededEvent.emit(null);
        }).catch(function (err) {
            console.log(err);
        });
    }

    signin() {
        this.userManager.signinRedirect().then(function () {
            console.log("UserAuthService - signinRedirect done");
        }).catch(function (err) {
            console.log("UserAuthService - signinRedirect error");
            console.log(err);
        });
    }

    signout() {
        this.userManager.signoutRedirect().then(function (resp) {
            console.log("UserAuthService - signed out", resp);
        }).catch(function (err) {
            console.log("UserAuthService - signoutRedirect error");
            console.log(err);
        });
    };

    // --------
    /**
     * @return users username or '' if none (ie. not logged in)
     */
    // public getUserName(): string {
    //     console.log('UserAuthService - getUserName()')
    //     this.userManager.getUser().then((user) => {
    //         console.log("got user", user);
    //     }).catch(function (err) {
    //         console.log(err);
    //     });
    //
    //     return 'freddy kruger';
    // }

    /**
     * Present the login form via the Authentication system.  Set it to redirect to /login.  That will then return to here via resumeLogin()
     */
    // public login() {
    //     console.log('auth service login');
    //     // save so can return to here
    //
    //     let path: string = '/oauth2/authorize';
    //     // This appRedirectUri as query param doesn't work (OpenAM's Agent's 'redirect url' must be exact)
    //     // Instead try saving and retrieving from HTML 5's window.localStorage
    //     // let appRedirectUri: string = 'appRedirect_uri='+this.location.path();;
    //     let redirectUri: string = 'redirect_uri='+this.constantsService.getClientURL()+'/login';
    //     let responseType: string = 'response_type=id_token';
    //     let clientId: string = 'client_id=GNSSSiteManager';
    //     let scope: string = 'scope=openid profile';
    //     let nonce: string = 'nonce=1234';
    //     let uri: string = this.constantsService.getOpenAMServerURL() + path
    //         + '?' + redirectUri
    //         + '&' + responseType
    //         + '&' + clientId
    //         + '&' + scope
    //         + '&' + nonce;
    //
    //     // redirect to the auth server
    //     console.log('call auth server: ', uri);
    //     window.location.href = uri;
    // }


    /**
     *
     * @param locationHref comes from the auth system and includes the id_token representing login information.
     */
    // public extractAuthDetails(locationHref: any) {
    //     console.log('Auth - resumeLogin - locationHref: ', locationHref);
    //     this.extractIDToken(locationHref);
    //     console.log('Auth - idToken: ', this.idToken);
    // }

    /**
     * After returning from authenticating, the URL contains the id_token.  Extract as it contains user information and set this.idToken.
     *
     * @param locationHref - url returned from the auth system upon redirect.
     */
    // extractIDToken(locationHref: string): void {
    //     let param: string = 'id_token';
    //     // if (!url) url = location.href;
    //     // name = name.replace(/[\[]/,'\\\[').replace(/[\]]/,'\\\]');
    //     var regexS: string = '[\\?&]' + param + '=([^&#]*)';
    //     var regex: RegExp = new RegExp(regexS);
    //     var results: string[] = regex.exec(locationHref);
    //     if (results.length > 1) {
    //         this.idToken = new IdToken(this.extractToken(results[1]));
    //     } else {
    //         this.idToken = new IdToken();
    //     }
    // }

    /**
     * Extract the token as a readable pseudo-object (as string).
     *
     * @param tokenString base64 encoded (and later encrypted) token
     */
    // private extractToken(tokenString: string): any {
    //     var split: string[] = tokenString.split(/\./);
    //     var exBase64: string = atob(split[1]);
    //     return JSON.parse(exBase64);
    // }
    //
    // public logout() {
    //     this.idToken = new IdToken();
    //     // TODO - also need to log out in the Auth systm
    // }
}
