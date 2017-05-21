import { FieldMap, ObjectMap, TypedPointer } from './../data-view-translator';
import { MiscUtils } from '../../global/misc-utils';

export const dontSetDetfaults: boolean = false;

export abstract class AbstractViewModel {
    public dateDeleted: string;
    public dateInserted: string;
    public deletedReason: string;
    // datePicker will make into a Date but the data is to be made string.  DatePicker will take string as input.
    public startDate: string | any;
    public endDate: string | any;

    /**
     * Mapping to/from Data and View model fields.  See createFieldMappings().
     */
    private objectMap = new ObjectMap();

    public getObjectMap(): ObjectMap {
        return this.objectMap;
    }

    constructor(setDefaults: boolean = true) {
        if (setDefaults) {
            this.setDefaultValues();
            this.addSuperFieldMappings();
        }
        this.createFieldMappings();
    }

     /**
     * Client calls this for each data/view field mappings to build objectMap.
     *
     * @param dataPath - path in the data model
     * @param dataPathType - type of data in that path
     * @param viewPath - path in the view model
     * @param viewPathType - type of data in that path
     * @returns {FieldMaps}
     */
    addFieldMapping(dataPath: string, dataPathType: string, viewPath: string, viewPathType: string): void {
        if (dataPath.length === 0 || dataPathType.length === 0 || viewPath.length === 0 || viewPathType.length === 0) {
            throw new Error('expecting 4 data items - dataPath, dataPathType, viewPath, viewPathType');
        }
        this.assertCorrect(dataPath, dataPathType, viewPath, viewPathType);

        let dataTypePointer: TypedPointer = new TypedPointer(dataPath, dataPathType);
        let viewTypePointer: TypedPointer = new TypedPointer(viewPath, viewPathType);
        this.objectMap.add(new FieldMap(dataTypePointer, viewTypePointer));
    }

    /**
     * Setup common field mappings
     */
    addSuperFieldMappings(): void {
        this.addFieldMapping('/dateDeleted/value/0', 'string', '/dateDeleted', 'string');
        this.addFieldMapping('/dateInserted/value/0', 'string', '/dateInserted', 'string');
        this.addFieldMapping('/deletedReason', 'string', '/deletedReason', 'string');
    }

    /**
     * Set change tracking value to now().
     * @return the date so can use in FormModel
     */
    setDateInserted(): string {
        let date: string = MiscUtils.getUTCDateTime();
        this.dateInserted = date;
        return date;
    }

    /**
     * Set change tracking value to now().
     * @return the date so can use in FormModel
     */
    setDateDeleted(): string {
        let date: string = MiscUtils.getUTCDateTime();
        this.dateDeleted = date;
        return date;
    }

    setDeletedReason(reason: string): void {
        this.deletedReason = reason;
    }

    /**
     * Simple way to specify the data / view model mappings.
     * @returns string[][]
     */
    public abstract createFieldMappings(): void;

    /**
     * Called on the 'last' object before creating a new one to populate it with some values such as endDate.
     * Return what is changed as an object so the form can be patched.
     */
    setEndDateToCurrentDate(): Object {
        if (this.hasOwnProperty('endDate')) {
            let presentDT: string = MiscUtils.getUTCDateTime();
            this.endDate = presentDT;
            return {endDate: presentDT};
        } else {
            return {};
        }
    }

    /**
     * Called on the 'current' object after cancelling creation of a new one to undo field population.
     * Return what is changed as an object so the form can be patched.
     */
    unsetEndDate(): Object {
        if (this.hasOwnProperty('endDate')) {
            this.endDate = '';
            return {endDate: this.endDate};
        } else {
            return {};
        }
    }

    /**
     * Returns true if this is the kind of object that can have an end date.
     * Most things can so this method returns true by default, but some things do not have an end date.
     */
    hasEndDateField() : boolean {
        return true;
    }

    private setDefaultValues() {
        this.dateDeleted = '';
        this.dateInserted = '';
        this.deletedReason = '';
        this.startDate = MiscUtils.getUTCDateTime();
        this.endDate = '';
    }

    private assertCorrect(dataPath: string, dataPathType: string, viewPath: string, viewPathType: string) {
      // TODO: where is assert? They should be in a unit test anyway.
        // assert(dataPath.match(/\/.*/));
        // assert(dataPathType.match(/number|string/));
        // assert(viewPath.match(/\/.*/));
        // assert(viewPathType.match(/number|string/));
    }
}
