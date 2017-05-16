/**
 * Use this as a 'SiteLogDataModel' (that comes from GeodesyML)
 * or a 'SiteLogDataModel' (that the view is rendered from)
 */
export class SiteLogDataModel {
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
    localEpisodicEffects: any[];
    humiditySensors: any[] = [];
    pressureSensors: any[];
    temperatureSensors: any[];
    waterVaporSensors: any[];
    siteOwner: any;
    siteContacts: any[];
    siteMetadataCustodian: any;
    siteDataCenters: any[];
    siteDataSource: any;
    moreInformation: any;
    dataStreams: any;

    /**jsonix
     * Extract the data in the supplied JSON object or create an empty array / object for each item that doesn't exist.
     */
    constructor(dataModelJson: any) {
        let siteLogModel: SiteLogDataModel = dataModelJson['geo:siteLog'];
        if (siteLogModel) {
            // arrays
            this.gnssReceivers = this.getSuppliedValueOrEmptyValue(siteLogModel.gnssReceivers, true);
            this.gnssAntennas = this.getSuppliedValueOrEmptyValue(siteLogModel.gnssAntennas, true);
            this.surveyedLocalTies = this.getSuppliedValueOrEmptyValue(siteLogModel.surveyedLocalTies, true);
            this.frequencyStandards = this.getSuppliedValueOrEmptyValue(siteLogModel.frequencyStandards, true);
            this.localEpisodicEffects = this.getSuppliedValueOrEmptyValue(siteLogModel.localEpisodicEffects, true);
            this.humiditySensors = this.getSuppliedValueOrEmptyValue(siteLogModel.humiditySensors, true);
            this.pressureSensors = this.getSuppliedValueOrEmptyValue(siteLogModel.pressureSensors, true);
            this.temperatureSensors = this.getSuppliedValueOrEmptyValue(siteLogModel.temperatureSensors, true);
            this.waterVaporSensors = this.getSuppliedValueOrEmptyValue(siteLogModel.waterVaporSensors, true);
            this.siteContacts = this.getSuppliedValueOrEmptyValue(siteLogModel.siteContacts, true);
            this.siteDataCenters = this.getSuppliedValueOrEmptyValue(siteLogModel.siteDataCenters, true);

            // objects
            this.TYPE_NAME = this.getSuppliedValueOrEmptyValue(siteLogModel.TYPE_NAME, false);
            this.description = this.getSuppliedValueOrEmptyValue(siteLogModel.description, false);
            this.descriptionReference = this.getSuppliedValueOrEmptyValue(siteLogModel.descriptionReference, false);
            this.identifier = this.getSuppliedValueOrEmptyValue(siteLogModel.identifier, false);
            this.boundedBy = this.getSuppliedValueOrEmptyValue(siteLogModel.boundedBy, false);
            this.atSite = this.getSuppliedValueOrEmptyValue(siteLogModel.atSite, false);
            this.formInformation = this.getSuppliedValueOrEmptyValue(siteLogModel.formInformation, false);
            this.siteIdentification = this.getSuppliedValueOrEmptyValue(siteLogModel.siteIdentification, false);
            this.siteLocation = this.getSuppliedValueOrEmptyValue(siteLogModel.siteLocation, false);
            this.siteOwner = this.getSuppliedValueOrEmptyValue(siteLogModel.siteOwner, false);
            this.siteMetadataCustodian = this.getSuppliedValueOrEmptyValue(siteLogModel.siteMetadataCustodian, false);
            this.siteDataSource = this.getSuppliedValueOrEmptyValue(siteLogModel.siteDataSource, false);
            this.moreInformation = this.getSuppliedValueOrEmptyValue(siteLogModel.moreInformation, false);
            this.dataStreams = this.getSuppliedValueOrEmptyValue(siteLogModel.dataStreams, false);
        }
    }

    /**
     * Return the value supplied if it exists or a new array/object if it is null or undefined
     */
    private getSuppliedValueOrEmptyValue(value : any, isArray : boolean) : any {
        if (value !== null && value !== undefined) {
           return value;
        } else {
           return isArray ? [] : new Object();
        }
    }
}
