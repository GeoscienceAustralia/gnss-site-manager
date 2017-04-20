import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { MiscUtils } from '../shared/global/misc-utils';

export class HumiditySensorViewModel extends AbstractViewModel {
    /**
     * Not the best form making private fields public, however saves clutter of creating accessors / getters for all
     */
    public startDate: string;
    public endDate: string;

    public calibrationDate: string;

    public dataSamplingInterval: number;
    public accuracyPercentRelativeHumidity: number;
    public aspiration: string;
    public notes: string;
    public manufacturer: string;
    public serialNumber: string;
    public heightDiffToAntenna: number;

    /**
     * @param blank - if blank then don't add any default values - leave completely blank (empty) with '' | 0
     */
    constructor(blank: boolean = false) {
        super();
        let presentDT: string = blank ? '' : MiscUtils.getPresentDateTime();

        this.startDate = presentDT;
        this.calibrationDate = presentDT;
        this.endDate = '';
        this.dataSamplingInterval = 0;
        this.accuracyPercentRelativeHumidity = 0;
        this.aspiration = '';
        this.notes = '';
        this.manufacturer = '';
        this.serialNumber = '';
        this.heightDiffToAntenna = 0;
    }

    createFieldMappings(): void {
        this.addFieldMapping('/humiditySensor/validTime/abstractTimePrimitive/gml:TimePeriod/beginPosition/value/0',
            'string',
            '/startDate', 'string');

        this.addFieldMapping('/humiditySensor/validTime/abstractTimePrimitive/gml:TimePeriod/endPosition/value/0',
            'string',
            '/endDate', 'string');

        this.addFieldMapping('/humiditySensor/calibrationDate/value/0', 'string',
            '/calibrationDate', 'string');

        this.addFieldMapping('/humiditySensor/dataSamplingInterval', 'string',
            '/dataSamplingInterval', 'number');

        this.addFieldMapping('/humiditySensor/accuracyPercentRelativeHumidity', 'string',
            '/accuracyPercentRelativeHumidity', 'number');

        this.addFieldMapping('/humiditySensor/aspiration', 'string',
            '/aspiration', 'string');

        this.addFieldMapping('/humiditySensor/notes', 'string',
            '/notes', 'string');

        this.addFieldMapping('/humiditySensor/manufacturer', 'string',
            '/manufacturer', 'string');

        this.addFieldMapping('/humiditySensor/serialNumber', 'string',
            '/serialNumber', 'string');

        this.addFieldMapping('/humiditySensor/heightDiffToAntenna', 'string',
            '/heightDiffToAntenna', 'number');
    };

    /**
     * Called on the 'last' object before creating a new one to populate it with some values such as endDate.
     */
    setFinalValuesBeforeCreatingNewItem(): void {
        let presentDT: string = MiscUtils.getPresentDateTime();

        this.endDate = presentDT;
    }
}
