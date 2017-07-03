/**
 * This is the 'View Model' for Site Location.
 *
 */
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';

export class CartesianPosition {
    constructor(
        public x: number = null,
        public y: number = null,
        public z: number = null,
    ) {
    }
}

export class GeodeticPosition {
    constructor(
        public lat: number = null,
        public lon: number = null,
        public height: number = null,
    ) {
    }
}

export class SiteLocationViewModel extends AbstractViewModel {
    public city: string = null;
    public state: string = null;
    public countryCodeISO: string = null;
    public cartesianPosition: CartesianPosition = new CartesianPosition();
    public geodeticPosition: GeodeticPosition = new GeodeticPosition();
    public tectonicPlate: string = null;
    public notes: string = null;
    public dateDeleted: string = null;
    public dateInserted: string = null;
    public deletedReason: string = null;
}
