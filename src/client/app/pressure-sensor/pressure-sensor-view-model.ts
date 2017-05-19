import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { MiscUtils } from '../shared/global/misc-utils';

export class PressureSensorViewModel extends AbstractViewModel {
    public calibrationDate: string;

    public dataSamplingInterval: number;
    public accuracyHPa: number;
    public notes: string;
    public manufacturer: string;
    public serialNumber: string;
    public heightDiffToAntenna: number;

    /**
     * @param blank - if blank then don't add any default values - leave completely blank (empty) with '' | 0
     */
    constructor(blank: boolean = false) {
        super();
        this.calibrationDate = MiscUtils.getUTCDateTime();
        this.dataSamplingInterval = 0;
        this.accuracyHPa = 0;
        this.notes = '';
        this.manufacturer = '';
        this.serialNumber = '';
        this.heightDiffToAntenna = 0;
    }

    // TODO - remove type field and use generics instead
    createFieldMappings(): void {
        this.addFieldMapping('/pressureSensor/validTime/abstractTimePrimitive/gml:TimePeriod/beginPosition/value/0',
            'string',
            '/startDate', 'date');

        this.addFieldMapping('/pressureSensor/validTime/abstractTimePrimitive/gml:TimePeriod/endPosition/value/0',
            'string',
            '/endDate', 'date');

        this.addFieldMapping('/pressureSensor/calibrationDate/value/0', 'string',
            '/calibrationDate', 'date');

        this.addFieldMapping('/pressureSensor/dataSamplingInterval', 'string',
            '/dataSamplingInterval', 'number');

        this.addFieldMapping('/pressureSensor/accuracyHPa', 'string',
            '/accuracyHPa', 'number');

        this.addFieldMapping('/pressureSensor/notes', 'string',
            '/notes', 'string');

        this.addFieldMapping('/pressureSensor/manufacturer', 'string',
            '/manufacturer', 'string');

        this.addFieldMapping('/pressureSensor/serialNumber', 'string',
            '/serialNumber', 'string');

        this.addFieldMapping('/pressureSensor/heightDiffToAntenna', 'string',
            '/heightDiffToAntenna', 'number');
    };
}
