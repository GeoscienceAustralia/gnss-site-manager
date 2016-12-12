import {SiteLogDataModel} from './data-model/SiteLogDataModel';

/**
 * OBSELETE NOW - WILL REMOVE SOON
 */
export class SiteIdentification {

  /**
   * Translate DataModel Json from the GeodesyML, to ViewModel Json as used by the UI.
   *
   * @param siteLogDataModel
   */
  public static translateDataToView(siteLogDataModel: SiteLogDataModel): any {
    let siteIdentification: any = siteLogDataModel['geo:siteLog'].siteIdentification;
    console.debug('translateDataToView - siteIdentification: ', siteIdentification);

    let translatedDataToView: any = {};
    translatedDataToView.fourCharacterID = siteIdentification.fourCharacterID;
    return translatedDataToView;
  }
}
