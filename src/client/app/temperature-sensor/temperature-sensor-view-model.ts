import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { MiscUtils } from '../shared/global/misc-utils';

export class TemperatureSensorViewModel extends AbstractViewModel {
    public calibrationDate: string;
    public dataSamplingInterval: number;
    public accuracyDegreesCelcius: number;
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
        this.dataSamplingInterval = 0;
        this.accuracyDegreesCelcius = 0;
        this.notes = '';
        this.manufacturer = '';
        this.serialNumber = '';
        this.heightDiffToAntenna = 0;
    }

    createFieldMappings(): void {
        this.addFieldMapping('/temperatureSensor/validTime/abstractTimePrimitive/gml:TimePeriod/beginPosition/value/0',
            'string',
            '/startDate', 'date');

        this.addFieldMapping('/temperatureSensor/validTime/abstractTimePrimitive/gml:TimePeriod/endPosition/value/0',
            'string',
            '/endDate', 'date');

        this.addFieldMapping('/temperatureSensor/calibrationDate/value/0', 'string',
            '/calibrationDate', 'date');

        this.addFieldMapping('/temperatureSensor/dataSamplingInterval', 'string',
            '/dataSamplingInterval', 'number');

        this.addFieldMapping('/temperatureSensor/accuracyDegreesCelcius', 'string',
            '/accuracyDegreesCelcius', 'number');

        this.addFieldMapping('/temperatureSensor/notes', 'string',
            '/notes', 'string');

        this.addFieldMapping('/temperatureSensor/manufacturer', 'string',
            '/manufacturer', 'string');

        this.addFieldMapping('/temperatureSensor/serialNumber', 'string',
            '/serialNumber', 'string');

        this.addFieldMapping('/temperatureSensor/heightDiffToAntenna', 'string',
            '/heightDiffToAntenna', 'number');
    };
}
