import { JsonPointerService } from '../json-pointer/json-pointer.service';
import { AbstractViewModel } from './view-model/abstract-view-model';
import { MiscUtils } from '../global/misc-utils';

export const doWriteViewToData: boolean = true;

/**
 * Tuple to assist in mapping data model to view model by defining one side of the relationship
 * pointer - Json Pointer path
 * type - type of the data defined at that path
 */
export class TypedPointer {
    constructor(public readonly pointer: string,
                public readonly type: string) {}
}

/**
 * Mapping to assist in mapping data model to view model by linking both sides.
 * A collection of these defines a complete (for the application) or partial (for just one or a few sections of data)
 * mapping to translate one of view or data model to the other.
 */
export class FieldMap {
    constructor(public readonly sourceField: TypedPointer,
                public readonly targetField: TypedPointer) {}

    public inverse(): FieldMap {
        return new FieldMap(this.targetField, this.sourceField);
    }
}

export class DataViewTranslatorService {

    /**
     * Translate from data and view models.
     * @param dataModel is input.  Its paths should match the fieldMappings.dataModel
     * @param viewModel is populated.  It should exist as on object upon entry.  Its paths should match the
     * fieldMappings.viewModel
     * @param fieldMappings to/from data and view
     */
    static translateD2V<T extends AbstractViewModel>(dataModel: any, viewModel: T, fieldMappings: FieldMap[]): void {
        DataViewTranslatorService.translate(dataModel, viewModel, fieldMappings, false);
    }

    /**
     * Translate from view and data models.
     * @param viewModel is input.  Its paths should match the fieldMappings.viewModel
     * @param dataModel is populated.  It should exist as on object upon entry.  Its paths should match the
     * fieldMappings.dataModel
     * @param fieldMappings to/from data and view
     */
    static translateV2D<T extends AbstractViewModel>(viewModel: T, dataModel: any, fieldMappings: FieldMap[]): any {
        DataViewTranslatorService.translate(viewModel, dataModel, fieldMappings, true);
    }

    /**
     * Generic translate independant of view and data models.  As long as the mappings are in the source, the data will be
     * written into the mapped location in the target.
     *
     * @param source - source to read from - if writeViewToData is false then this is the data model else the view model
     * @param target - target to write to - if writeViewToData is false then this is the view model else the data model
     * @param writeViewToData - if false then write source data model to target view model (pass source, target appropriately);
     *                        if true then write source view model to target data model (pass source, target appropriately);
     */
    static translate(source: any, target: any, fieldMappings: FieldMap[], writeViewToData: boolean = false) {
        for (let fieldMap of fieldMappings) {
            // View and Data references currently retained from original translate context
            let sourceTypedPointer: TypedPointer;
            let targetTypedPointer: TypedPointer;
            if (! writeViewToData) {
                sourceTypedPointer = fieldMap.sourceField;
                targetTypedPointer = fieldMap.targetField;
            } else {
                sourceTypedPointer = fieldMap.targetField;
                targetTypedPointer = fieldMap.sourceField;
            }
            let sourceValue: any = JsonPointerService.get(source, sourceTypedPointer.pointer);
            JsonPointerService.set(target, targetTypedPointer.pointer, sourceValue);
        }
    }
}
