import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { MiscUtils } from '../shared/global/misc-utils';

export class WaterVaporSensorViewModel extends AbstractViewModel {
    public calibrationDate: string;

    public notes: string;
    public manufacturer: string;
    public serialNumber: string;
    public heightDiffToAntenna: number;

    /**
     * @param blank - if blank then don't add any default values - leave completely blank (empty) with '' | 0
     */
    constructor(blank: boolean = false) {
        super();
        this.calibrationDate = blank ? '' : MiscUtils.getUTCDateTime();
        this.notes = '';
        this.manufacturer = '';
        this.serialNumber = '';
        this.heightDiffToAntenna = 0;
    }

    createFieldMappings(): void {
        this.addFieldMapping('/waterVaporSensor/validTime/abstractTimePrimitive/gml:TimePeriod/beginPosition/value/0',
            'string',
            '/startDate', 'date');

        this.addFieldMapping('/waterVaporSensor/validTime/abstractTimePrimitive/gml:TimePeriod/endPosition/value/0',
            'string',
            '/endDate', 'date');

        this.addFieldMapping('/waterVaporSensor/calibrationDate/value/0', 'string',
            '/calibrationDate', 'date');

        this.addFieldMapping('/waterVaporSensor/notes', 'string',
            '/notes', 'string');

        this.addFieldMapping('/waterVaporSensor/manufacturer', 'string',
            '/manufacturer', 'string');

        this.addFieldMapping('/waterVaporSensor/serialNumber', 'string',
            '/serialNumber', 'string');

        this.addFieldMapping('/waterVaporSensor/heightDiffToAntenna', 'string',
            '/heightDiffToAntenna', 'number');
    };
}
