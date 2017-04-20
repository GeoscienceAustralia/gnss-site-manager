import { JsonPointerService } from '../json-pointer/json-pointer.service';
import { FieldMaps } from './field-maps';
import { TypedPointer } from './typed-pointer';
import { AbstractViewModel } from './view-model/abstract-view-model';

export const doWriteViewToData: boolean = true;
export class DataViewTranslatorService {


  /**
   * Translate from data and view models.
   * @param dataModel is input.  Its paths should match the fieldMappings.dataModel
   * @param viewModel is populated.  It should exist as on object upon entry.  Its paths should match the
   * fieldMappings.viewModel
   * @param fieldMappings to/from data and view
   */
  static translateD2V<T extends AbstractViewModel>(dataModel: any, viewModel: T, fieldMappings: FieldMaps): void {
    for (let fieldMap of fieldMappings.fieldMaps) {
      let dataTypedPointer: TypedPointer = fieldMap.dataTypedPointer;
      let viewTypedPointer: TypedPointer = fieldMap.viewTypedPointer;
      let dataValue: string = JsonPointerService.get(dataModel, dataTypedPointer.pointer);
      if (viewTypedPointer.type === 'number') {
        JsonPointerService.set(viewModel, viewTypedPointer.pointer, dataValue !== null ? parseFloat(dataValue) : null);
      } else {
        JsonPointerService.set(viewModel, viewTypedPointer.pointer, dataValue);
      }
    }
  }

  /**
   * Translate from view and data models.
   * @param viewModel is input.  Its paths should match the fieldMappings.viewModel
   * @param dataModel is populated.  It should exist as on object upon entry.  Its paths should match the
   * fieldMappings.dataModel
   * @param fieldMappings to/from data and view
   */
  static translateV2D<T extends AbstractViewModel>(viewModel: T, dataModel: any, fieldMappings: FieldMaps): any {
    for (let fieldMap of fieldMappings.fieldMaps) {
      let dataTypedPointer: TypedPointer = fieldMap.dataTypedPointer;
      let viewTypedPointer: TypedPointer = fieldMap.viewTypedPointer;
      let viewValue: string = JsonPointerService.get(viewModel, viewTypedPointer.pointer);
      if (dataTypedPointer.type === 'number') {
        JsonPointerService.set(dataModel, dataTypedPointer.pointer, viewValue !== null ? parseFloat(viewValue) : null);
      } else {
        JsonPointerService.set(dataModel, dataTypedPointer.pointer, viewValue);
      }
    }
  }

  /**
   * Generic translate independant of view and data models.  As long as the mappings are in the source, the data will be
   * written into the mapped location in the target.
   *
   * @param source - source to read from - if writeViewToData is false then this is the data model else the view model
   * @param target - target to write to - if writeViewToData is false then this is the view model else the data model
   * @param writeViewToData - if false then write source data model to target view model (pass source, target appropriately);
   *                        if true then wrote source view model to target data model (pass source, target appropriately);
   */
  static translate(source: any, target: any, fieldMappings: FieldMaps, writeViewToData: boolean = false) {
      for (let fieldMap of fieldMappings.fieldMaps) {
          // View and Data references currently retained from original translate context
          let sourceTypedPointer: TypedPointer;
          let targetTypedPointer: TypedPointer;
          if (! writeViewToData) {
              sourceTypedPointer = fieldMap.dataTypedPointer;
              targetTypedPointer = fieldMap.viewTypedPointer;
          } else {
              sourceTypedPointer = fieldMap.viewTypedPointer;
              targetTypedPointer = fieldMap.dataTypedPointer;
          }
          let sourceValue: string = JsonPointerService.get(source, sourceTypedPointer.pointer);
          if (targetTypedPointer.type === 'number') {
              JsonPointerService.set(target, targetTypedPointer.pointer, sourceValue !== null ? parseFloat(sourceValue) : null);
          } else {
              JsonPointerService.set(target, targetTypedPointer.pointer, sourceValue);
          }
      }
  }
}
