/**
 * This is the 'View Model' for Site Identification, though it is just the mapping for the dataModel to/from the form Model.
 *
 */
import { AbstractViewModel, dontSetDetfaults } from '../shared/json-data-view-model/view-model/abstract-view-model';

export class SiteIdentificationMappings extends AbstractViewModel {
    constructor() {
        super(dontSetDetfaults);
    }

    createFieldMappings(): void {

        this.addFieldMapping('/bedrockCondition',
            'string',
            '/bedrockCondition', 'string');

        this.addFieldMapping('/bedrockType',
            'string',
            '/bedrockType', 'string');

        this.addFieldMapping('/cdpNumber', 'string',
            '/cdpNumber', 'string');

        this.addFieldMapping('/dateInstalled/value/0', 'string',
            '/dateInstalled', 'string');

        this.addFieldMapping('/distanceActivity', 'string',
            '/distanceActivity', 'string');

        this.addFieldMapping('/faultZonesNearby/value', 'string',
            '/faultZonesNearby', 'string');

        this.addFieldMapping('/foundationDepth', 'string',
            '/foundationDepth', 'string');

        this.addFieldMapping('/fourCharacterID', 'string',
            '/fourCharacterID', 'string');

        this.addFieldMapping('/fractureSpacing', 'string',
            '/fractureSpacing', 'string');

        this.addFieldMapping('/geologicCharacteristic/value', 'string',
            '/geologicCharacteristic', 'string');

        this.addFieldMapping('/heightOfTheMonument', 'string',
            '/heightOfTheMonument', 'string');

        this.addFieldMapping('/iersDOMESNumber', 'string',
            '/iersDOMESNumber', 'string');

        this.addFieldMapping('/markerDescription', 'string',
            '/markerDescription', 'string');

        this.addFieldMapping('/monumentDescription/value', 'string',
            '/monumentDescription', 'string');

        this.addFieldMapping('/monumentFoundation', 'string',
            '/monumentFoundation', 'string');

        this.addFieldMapping('/monumentInscription', 'string',
            '/monumentInscription', 'string');

        this.addFieldMapping('/monumentNumber', 'string',
            '/monumentNumber', 'string');

        this.addFieldMapping('/notes', 'string',
            '/notes', 'string');

        this.addFieldMapping('/receiverNumber', 'string',
            '/receiverNumber', 'string');

        this.addFieldMapping('/siteName', 'string',
            '/siteName', 'string');
    };

    /**
     * Called on the 'last' object before creating a new one to populate it with some values such as endDate.
     */
    setFinalValuesBeforeCreatingNewItem(): void {
        // NOP - method needed due to inheritence
    }
}
