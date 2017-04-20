import { FieldMaps, FieldMap } from '../field-maps';
import { TypedPointer } from '../typed-pointer';
import { MiscUtils } from '../../global/misc-utils';

export const dontSetDetfaults: boolean = false;

export abstract class AbstractViewModel {
    // Base Fields
    // Change tracking
    public dateDeleted: string;
    public dateInserted: string;
    public deletedReason: string;

    /**
     * Mapping to/from Data and View model fields.  See createFieldMappings().
     */
    private fieldMaps: FieldMaps;

    public getFieldMaps(): FieldMaps {
        return this.fieldMaps;
    }

    constructor(setDefaults: boolean = true) {
        if (setDefaults) {
            this.setDefaultValues();
            this.addSuperFieldMappings();
        }
        this.createFieldMappings();
    }

     /**
     * Client calls this for each data/view field mappings to build fieldMaps.
     *
     * @param dataPath - path in the data model
     * @param dataPathType - type of data in that path
     * @param viewPath - path in the view model
     * @param viewPathType - type of data in that path
     * @returns {FieldMaps}
     */
    addFieldMapping(dataPath: string, dataPathType: string, viewPath: string, viewPathType: string): void {
        if (!this.fieldMaps) {
            this.fieldMaps = new FieldMaps();
        }
        if (dataPath.length === 0 || dataPathType.length === 0 || viewPath.length === 0 || viewPathType.length === 0) {
            throw new Error('expecting 4 data items - dataPath, dataPathType, viewPath, viewPathType');
        }
        this.assertCorrect(dataPath, dataPathType, viewPath, viewPathType);

        let dataTypePointer: TypedPointer = new TypedPointer(dataPath, dataPathType);
        let viewTypePointer: TypedPointer = new TypedPointer(viewPath, viewPathType);
        this.fieldMaps.add(new FieldMap(dataTypePointer, viewTypePointer));
    }

    /**
     * Setup common field mappings
     */
    addSuperFieldMappings(): void {
        // Change tracking
        this.addFieldMapping('/dateDeleted/value/0', 'string', '/dateDeleted', 'string');
        this.addFieldMapping('/dateInserted/value/0', 'string', '/dateInserted', 'string');
        this.addFieldMapping('/deletedReason', 'string', '/deletedReason', 'string');
    }

    /**
     * Set change tracking value to now().
     */
    setDateInserted(): void {
        let date: string = MiscUtils.getPresentDateTime();
        this.dateInserted = date;
    }

    /**
     * Set change tracking value to now().
     */
    setDateDeleted(): void {
        let date: string = MiscUtils.getPresentDateTime();
        this.dateDeleted = date;
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
     */
    abstract setFinalValuesBeforeCreatingNewItem(): void;

    private setDefaultValues() {
        this.dateDeleted = '';
        this.dateInserted = '';
        this.deletedReason = '';
    }

    private assertCorrect(dataPath: string, dataPathType: string, viewPath: string, viewPathType: string) {
      // TODO: where is assert? They should be in a unit test anyway.
        // assert(dataPath.match(/\/.*/));
        // assert(dataPathType.match(/number|string/));
        // assert(viewPath.match(/\/.*/));
        // assert(viewPathType.match(/number|string/));
    }
}
