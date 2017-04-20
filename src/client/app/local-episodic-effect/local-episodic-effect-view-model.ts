import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { MiscUtils } from '../shared/global/misc-utils';

export class LocalEpisodicEffectViewModel extends AbstractViewModel {
    /**
     * Not the best form making private fields public, however saves clutter of creating accessors / getters for all
     */
    public startDate: string;
    public endDate: string;

    public event: string;

    /**
     * @param blank - if blank then don't add any default values - leave completely blank (empty) with '' | 0
     */
    constructor(blank: boolean = false) {
        super();
        let presentDT: string = MiscUtils.getPresentDateTime();

        this.startDate = blank ? '' : presentDT;
        this.endDate = '';
        this.event = '';
    }

    createFieldMappings(): void {
        this.addFieldMapping('/localEpisodicEffect/validTime/abstractTimePrimitive/gml:TimePeriod/beginPosition/value/0',
            'string',
            '/startDate', 'string');

        this.addFieldMapping('/localEpisodicEffect/validTime/abstractTimePrimitive/gml:TimePeriod/endPosition/value/0',
            'string',
            '/endDate', 'string');

        this.addFieldMapping('/localEpisodicEffect/event', 'string',
            '/event', 'string');
    };

    /**
     * Called on the 'last' object before creating a new one to populate it with some values such as endDate.
     */
    setFinalValuesBeforeCreatingNewItem(): void {
        let presentDT: string = MiscUtils.getPresentDateTime();

        this.endDate = presentDT;
    }
}
