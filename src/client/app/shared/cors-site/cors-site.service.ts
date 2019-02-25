import { Injectable, OnDestroy } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { mergeMap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { User } from 'oidc-client';
import { UserAuthService } from '../global/user-auth.service';
import { HttpUtilsService } from '../global/http-utils.service';
import { ConstantsService } from '../global/constants.service';
import { SelectSiteSearchType, WFSService } from '../wfs/wfs.service';
import { SiteAdministrationModel } from '../../site-administration/site-administration-model';

/**
 * This class provides the service with methods to retrieve CORS sites from DB and select site.
 */
@Injectable()
export class CorsSiteService implements OnDestroy {

  public isSuperuser: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private unsubscribe: Subject<void> = new Subject<void>();

  /**
   * Creates a new CorsSiteService with the injected Http.
   * @param {Http} http - The injected Http.
   * @param globalService - Common methods
   * @param wfsService - Use Geoserver WFS for queries
   * @param constantsService - Constants used in the application
   * @constructor
   */
  constructor(private http: Http, private wfsService: WFSService,
              private constantsService: ConstantsService,
              private userAuthService: UserAuthService) {
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  /**
   * Returns an Observable for the HTTP GET request for the REST Web Service resource.  Using WFS Server for queries.
   * @param {string} fourCharacterId - The Four Character Id of the site.
   * @param {string} siteName - The name of the site.
   * @return {object[]} The Observable for the HTTP request.
   */
  getCorsSitesByUsingWFS(fourCharacterId: string, siteName: string): Observable<any> {
    let wfsParams: SelectSiteSearchType = {
      site4CharId: fourCharacterId,
      siteName: siteName
    };
    return this.wfsService.wfsQuery(wfsParams)
        .map(this.fixWFSeData)
        .catch((e: any) => {
          // propagate errors through the Observable
          return Observable.create((obs: any) => {
            obs.error('ERROR in getCorsSitesByUsingWFS: ', e);
          });
        });
  }

  /**
   * Returns an Observable for the HTTP GET request for the REST Web Service resource.
   * @param {string} siteId - The Four Character Id of the site.
   * @return {SiteAdministrationModel} The Observable for the HTTP request.
   */
  getSiteAdministration(siteId: string): Observable<SiteAdministrationModel> {
    let url = this.constantsService.getWebServiceURL() + '/corsSites?fourCharacterId=' + siteId;
    return this.http.get(url)
      .takeUntil(this.unsubscribe)
      .map((response: Response) => {
        if (response.status === 200) {
          let data: any = response.json();
          return new SiteAdministrationModel(data.id, data.siteStatus);
        } else {
          let msg: string = 'Error with GET: ' + response.url;
          throw new Error(msg);
        }
      });
  }

  /**
   * Returns an Observable for the HTTP GET request for all records available from the Site table.
   * @return {object[]} The Observable for the HTTP request.
   */
  getAllCorsSites(): Observable<any[]> {
    let url = this.constantsService.getWebServiceURL() + '/corsSites?size=1000';
    return this.getCorsSitesFromPage([], url);
  }

  getSiteById(id: number): Observable<any> {
    return this.http.get(this.constantsService.getWebServiceURL() + '/corsSites?id=' + id)
      .map(HttpUtilsService.handleJsonData)
      .catch(HttpUtilsService.handleError);
  }

  saveCorsSite(siteAdminModel: SiteAdministrationModel, id_token: string) : Observable<any> {
    console.log('Save existing CorsSite - SiteAdminModel: ', siteAdminModel);

    const user: User = this.userAuthService.user.value;
    const headers = new Headers();
    if (user) {
      headers.append('Authorization', 'Bearer ' + user.id_token);
    }

    let url = this.constantsService.getWebServiceURL() + '/corsSites/' + siteAdminModel.id;
    return this.http.patch(url, siteAdminModel, {headers: headers});
  }

  private fixWFSeData(wfsData: any): any {
    // TODO - make this data an Interface
    console.debug('cors-site service - from wfsService - fixWFSeData - data: ', wfsData);
    let fieldsDefined: any[] = [];
    wfsData.map((wfsFormat:any) => {
      let name: string = wfsFormat['geo:Site'].hasOwnProperty('name') ? wfsFormat['geo:Site'].name[0].value : 'no name';
      fieldsDefined.push({'fourCharacterId':wfsFormat['geo:Site'].identifier.value, 'name': name});
    });
    console.debug('cors-site service - from wfsService - fixWFSeData - return: ', fieldsDefined);
    return fieldsDefined; //data;
  }

  private getCorsSitesFromPage(sites: any[], url: string): Observable<any[]> {
    return this.http.get(url).pipe(
      mergeMap((data: any) => {
        sites.push(...this.parsePage(data));
        let nextUrl = this.parseNextLink(data);
        if (nextUrl) {
          return this.getCorsSitesFromPage(sites, nextUrl);
        } else {
          console.info('Number of public GNSS sites retrieved: ' + sites.length);
          return Observable.of(sites);
        }
      })
    );
  }

  private parseNextLink(data: any): string {
    return (data && data['_links']['next']) ? data['_links']['next']['href'] : null;
  }

  private parsePage(data: any): any[] {
    return data ? data['_embedded']['corsSites'] : [];
  }
}

