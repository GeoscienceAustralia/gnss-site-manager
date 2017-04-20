/**
 * This is the 'View Model' for Site Identification, though it is just the mapping for the dataModel to/from the form Model.
 *
 */
import { AbstractViewModel, dontSetDetfaults } from '../shared/json-data-view-model/view-model/abstract-view-model';

export class SiteLocationMappings extends AbstractViewModel {
    constructor() {
        super(dontSetDetfaults);
    }

    createFieldMappings(): void {

        this.addFieldMapping('/city',
            'string',
            '/city', 'string');

        this.addFieldMapping('/state',
            'string',
            '/state', 'string');

        this.addFieldMapping('/countryCodeISO', 'string',
            '/countryCodeISO', 'string');
        this.addFieldMapping('/tectonicPlate/value', 'string',
            '/tectonicPlate', 'string');
        this.addFieldMapping('/notes', 'string',
            '/notes', 'string');

        this.addFieldMapping('/approximatePositionITRF/xCoordinateInMeters', 'string',
            '/approximatePositionITRF_x', 'string');
        this.addFieldMapping('/approximatePositionITRF/yCoordinateInMeters', 'string',
            '/approximatePositionITRF_y', 'string');
        this.addFieldMapping('/approximatePositionITRF/zCoordinateInMeters', 'string',
            '/approximatePositionITRF_z', 'string');
        this.addFieldMapping('/approximatePositionITRF/elevationMEllips', 'string',
            '/approximatePositionITRF_elevationMEllips', 'string');

    };

    /**
     * Called on the 'last' object before creating a new one to populate it with some values such as endDate.
     */
    setFinalValuesBeforeCreatingNewItem(): void {
        // NOP - method needed due to inheritence
    }
}
