/**
 * Use this as a 'SiteLogViewModel' (that comes from GeodesyML) or a 'SiteLogViewModel' (that the view is rendered from)
 */
export interface SiteLogDataModel {
  'geo:siteLog': {
    TYPE_NAME: string;
    description: any;
    descriptionReference: any;
    identifier: any;
    boundedBy: any;
    atSite: any;
    formInformation: any;
    siteIdentification: any;
    siteLocation: any;
    gnssReceivers: any[];
    gnssAntennas: any[];
    surveyedLocalTies: any[];
    frequencyStandards: any[];
    humiditySensors: any[];
    pressureSensors: any[];
    temperatureSensors: any[];
    waterVaporSensors: any[];
    siteOwner: any;
    siteContact: any[];
    siteMetadataCustodian: any;
    siteDataSource: any;
    moreInformation: any;
    dataStreamsSet: any;
  };
}
