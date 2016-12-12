import {SiteLogDataModel} from './data-model/SiteLogDataModel';

/**
 * OBSELETE NOW - WILL REMOVE SOON
 */
export class SiteLocation {

  /**
   * Translate DataModel Json from the GeodesyML, to ViewModel Json as used by the UI.
   *
   * @param siteLogDataModel
   */
  public static translateDataToView(siteLogDataModel: SiteLogDataModel): any {
    let siteLocation: any = siteLogDataModel['geo:siteLog'].siteLocation;
    console.debug('translateDataToView - SiteLocation: ', siteLocation);

    let translatedDataToView: any = {};
    translatedDataToView.city = siteLocation.city;
    return translatedDataToView;
  }
}
