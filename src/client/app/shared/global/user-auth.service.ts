import {Injectable} from '@angular/core';
import {ConstantsService} from './constants.service';

/**
 * Service for authentication and authorisation of subjects.
 */

export class IdToken {
    private _firstName: string; // Geodesy Extension
    private _surname: string;   // Geodesy Extension
    private _groups: string[];  // Geodesy Extension
    private _issuer: string;    // openId: iss
    private _subject: string;   // OpenId: sub
    private _audience: string;  // OpenId: aud - Audience(s) who this ID Token is intended for. It MUST contain the OAuth 2.0
    //          client_id of the Relying Party as an audience value
    private _expiry: string;    // OpenId: exp - : Expiration time on or after which the ID Token MUST NOT be accepted for processing
    private _issueTime: string; // OpenId: iat - Time at which the JWT was issued
    private _nonce: string;     // OpemAm extension

    /**
     * @param idToken from auth system redirected url - JS Object populated from OpenId system.
     */
    constructor(idToken?: any) {
        if (idToken) {
            this.firstName = idToken.given_name || '';
            this.surname = idToken.family_name || '';
            this.groups = idToken.groups || [''];
            this.issuer = idToken.iss || '';
            this.subject = idToken.sub || '';
            this.audience = idToken.aud || '';
            this.expiry = idToken.exp || '';
            this.issueTime = idToken.iat || '';
            this.nonce = idToken.nonce || '';
        }
    }

    public addGroup(group: string) {
        this.groups.push(group);
    }

    get firstName(): string {
        return this._firstName;
    }

    get surname(): string {
        return this._surname;
    }

    get groups(): string[] {
        return this._groups;
    }

    get issuer(): string {
        return this._issuer;
    }

    get subject(): string {
        return this._subject;
    }

    get audience(): string {
        return this._audience;
    }

    get expiry(): string {
        return this._expiry;
    }

    get issueTime(): string {
        return this._issueTime;
    }

    get nonce(): string {
        return this._nonce;
    }

    set firstName(val: string) {
        this._firstName = val;
    }

    set surname(val: string) {
        this._surname = val;
    }

    set groups(val: string[]) {
        this._groups = val;
    }

    set issuer(val: string) {
        this._issuer = val;
    }

    set subject(val: string) {
        this._subject = val;
    }

    set audience(val: string) {
        this._audience = val;
    }

    set expiry(val: string) {
        this._expiry = val;
    }

    set issueTime(val: string) {
        this._issueTime = val;
    }

    set nonce(val: string) {
        this._nonce = val;
    }
}

@Injectable()
export class UserAuthService {
    private idToken: IdToken;

    // , private location: Location - add when using redirectUrl (in '@angular/common')
    constructor(private constantsService: ConstantsService) {
    }

    /**
     * @return users username or '' if none (ie. not logged in)
     */
    public getUserName(): string {
        let name: string = '';
        if (this.idToken) {
            if (this.idToken.subject) {
                name += this.idToken.subject;
            }
        }
        return name;
    }

    getIDToken() {
        return this.idToken;
    }

    /**
     * Present the login form via the Authentication system.  Set it to redirect to /login.  That will then return to here via resumeLogin()
     */
    public login() {
        console.log('auth service login');
        // save so can return to here

        let path: string = '/oauth2/authorize';
        // This appRedirectUri as query param doesn't work (OpenAM's Agent's 'redirect url' must be exact)
        // Instead try saving and retrieving from HTML 5's window.localStorage
        // let appRedirectUri: string = 'appRedirect_uri='+this.location.path();;
        let redirectUri: string = 'redirect_uri=http://localhost:5555/login';
        let responseType: string = 'response_type=id_token';
        let clientId: string = 'client_id=GNSSSiteManager';
        let scope: string = 'scope=openid profile';
        let nonce: string = 'nonce=1234';
        let uri: string = this.constantsService.getOpenAMServerURL() + path
            + '?' + redirectUri
            + '&' + responseType
            + '&' + clientId
            + '&' + scope
            + '&' + nonce;

        // redirect to the auth server
        console.log('call auth server: ', uri);
        window.location.href = uri;
    }


    /**
     *
     * @param locationHref comes from the auth system and includes the id_token representing login information.
     */
    public extractAuthDetails(locationHref: any) {
        console.log('Auth - resumeLogin - locationHref: ', locationHref);
        this.extractIDToken(locationHref);
        console.log('Auth - idToken: ', this.idToken);
    }

    /**
     * After returning from authenticating, the URL contains the id_token.  Extract as it contains user information and set this.idToken.
     *
     * @param locationHref - url returned from the auth system upon redirect.
     */
    extractIDToken(locationHref: string): void {
        let param: string = 'id_token';
        // if (!url) url = location.href;
        // name = name.replace(/[\[]/,'\\\[').replace(/[\]]/,'\\\]');
        var regexS: string = '[\\?&]' + param + '=([^&#]*)';
        var regex: RegExp = new RegExp(regexS);
        var results: string[] = regex.exec(locationHref);
        if (results.length > 1) {
            this.idToken = new IdToken(this.extractToken(results[1]));
        } else {
            this.idToken = new IdToken();
        }
    }

    /**
     * Extract the token as a readable pseudo-object (as string).
     *
     * @param tokenString base64 encoded (and later encrypted) token
     */
    private extractToken(tokenString: string): any {
        var split: string[] = tokenString.split(/\./);
        var exBase64: string = atob(split[1]);
        return JSON.parse(exBase64);
    }

    public logout() {
        this.idToken = new IdToken();
        // TODO - also need to log out in the Auth systm
    }
}
