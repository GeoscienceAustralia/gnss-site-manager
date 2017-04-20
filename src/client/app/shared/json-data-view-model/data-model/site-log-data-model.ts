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
    siteContact: any[];
    siteMetadataCustodian: any;
    siteDataSource: any[];
    // siteDataCentre: any[];
    moreInformation: any;
    dataStreams: any;

    /**jsonix
     * Extract the data in the supplied JSON object or create an empty array / object for each item that doesn't exist.
     */
    constructor(dataModelJson: any) {

        if (dataModelJson['geo:siteLog']) {

            // arrays
            this.gnssReceivers = this.getSuppliedValueOrEmptyValue(dataModelJson['geo:siteLog'].gnssReceivers, true);
            this.gnssAntennas = this.getSuppliedValueOrEmptyValue(dataModelJson['geo:siteLog'].gnssAntennas, true);
            this.surveyedLocalTies = this.getSuppliedValueOrEmptyValue(dataModelJson['geo:siteLog'].surveyedLocalTies, true);
            this.frequencyStandards = this.getSuppliedValueOrEmptyValue(dataModelJson['geo:siteLog'].frequencyStandards, true);
            this.localEpisodicEffects = this.getSuppliedValueOrEmptyValue(dataModelJson['geo:siteLog'].localEpisodicEffects, true);
            this.humiditySensors = this.getSuppliedValueOrEmptyValue(dataModelJson['geo:siteLog'].humiditySensors, true);
            this.pressureSensors = this.getSuppliedValueOrEmptyValue(dataModelJson['geo:siteLog'].pressureSensors, true);
            this.temperatureSensors = this.getSuppliedValueOrEmptyValue(dataModelJson['geo:siteLog'].temperatureSensors, true);
            this.waterVaporSensors = this.getSuppliedValueOrEmptyValue(dataModelJson['geo:siteLog'].waterVaporSensors, true);
            this.siteContact = this.getSuppliedValueOrEmptyValue(dataModelJson['geo:siteLog'].siteContact, true);

            // objects
            this.TYPE_NAME = this.getSuppliedValueOrEmptyValue(dataModelJson['geo:siteLog'].TYPE_NAME, false);
            this.description = this.getSuppliedValueOrEmptyValue(dataModelJson['geo:siteLog'].description, false);
            this.descriptionReference = this.getSuppliedValueOrEmptyValue(dataModelJson['geo:siteLog'].descriptionReference, false);
            this.identifier = this.getSuppliedValueOrEmptyValue(dataModelJson['geo:siteLog'].identifier, false);
            this.boundedBy = this.getSuppliedValueOrEmptyValue(dataModelJson['geo:siteLog'].boundedBy, false);
            this.atSite = this.getSuppliedValueOrEmptyValue(dataModelJson['geo:siteLog'].atSite, false);
            this.formInformation = this.getSuppliedValueOrEmptyValue(dataModelJson['geo:siteLog'].formInformation, false);
            this.siteIdentification = this.getSuppliedValueOrEmptyValue(dataModelJson['geo:siteLog'].siteIdentification, false);
            this.siteLocation = this.getSuppliedValueOrEmptyValue(dataModelJson['geo:siteLog'].siteLocation, false);
            this.siteOwner = this.getSuppliedValueOrEmptyValue(dataModelJson['geo:siteLog'].siteOwner, false);
            this.siteMetadataCustodian = this.getSuppliedValueOrEmptyValue(dataModelJson['geo:siteLog'].siteMetadataCustodian, false);
            this.siteDataSource = this.getSuppliedValueOrEmptyValue(dataModelJson['geo:siteLog'].siteDataSource, false);
            this.moreInformation = this.getSuppliedValueOrEmptyValue(dataModelJson['geo:siteLog'].moreInformation, false);
            this.dataStreams = this.getSuppliedValueOrEmptyValue(dataModelJson['geo:siteLog'].dataStreams, false);
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
