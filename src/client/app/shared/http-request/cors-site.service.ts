import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { SelectSiteSearchType, WFSService } from '../wfs/wfs.service';
import { HttpRequestService } from './http-request.service';

/**
 * This class provides the service with methods to retrieve CORS sites from DB and select site.
 */
@Injectable()
export class CorsSiteService {
  /**
   * Creates a new CorsSiteService with the injected HttpRequest Service.
   *
   * @param {HttpRequestService} httpRequestService - The injected HttpRequest Service.
   * @param globalService - Common methods
   * @param wfsService - Use Geoserver WFS for queries
   * @constructor
   */
  constructor(private httpRequestService: HttpRequestService, private wfsService: WFSService) {}

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
   * Returns an Observable for the HTTP GET request for all records available from the Site table.
   * @return {object[]} The Observable for the HTTP request.
   */
  getAllCorsSites(): Observable<any[]> {
    return this.httpRequestService.get('corsSites?size=1000');
  }

  getSiteById(id: number): Observable<any> {
    return this.httpRequestService.get('corsSites?id=' + id);
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
}
