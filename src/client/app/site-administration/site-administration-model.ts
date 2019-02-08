/**
* This is the Data & View Models for Site Administration.
*/

export class SiteAdministrationModel {
    public siteStatus: string = null;

    constructor(status: string = null) {
        this.siteStatus = status;
    }
}
