import { Injectable } from '@angular/core';
import { Config } from '../config/env.config';

export interface Link {
    name: string;
    url: string;
}

@Injectable()
export class ConstantsService {
    // Constant variables used in ResponsibleParty and SiteInfo components
    public static readonly SITE_CONTACT = 'Site Contact';
    public static readonly SITE_METADATA_CUSTODIAN = 'Site Metadata Custodian';
    public static readonly SITE_DATA_CENTER = 'Site Data Center';
    public static readonly SITE_DATA_SOURCE = 'Site Data Source';

    public static webUrlLinks: Link[] = Config.WEB_URL_LINKS;

    private webServiceURL: string = Config.WEB_SERVICE_URL;
    private wfsGeoserverURL: string = Config.WFS_GEOSERVER_URL;
    private openAMServerURL: string = Config.OPENAM_SERVER_URL;
    private receiverAntennaCodeURL: string = Config.RECEIVER_ANTENNA_CODE_URL;
    private clientURL: string = Config.CLIENT_URL;

    public getWebServiceURL(): string {
        return this.webServiceURL;
    }

    public getWFSGeoserverURL(): string {
        return this.wfsGeoserverURL;
    }

    public getOpenAMServerURL(): string {
        return this.openAMServerURL;
    }

    public getClientURL(): string {
        return this.clientURL;
    }

    public getReceiverAntennaCodeURL(): string {
        return this.receiverAntennaCodeURL;
    }
}
