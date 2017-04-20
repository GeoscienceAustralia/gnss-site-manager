import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { MiscUtils } from '../shared/global/misc-utils';

export class PressureSensorViewModel extends AbstractViewModel {
  /**
   * Not the best form making fields public, however saves clutter of creating accessors / getters for all
   */
  public startDate: string;
  public endDate: string;

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
    let presentDT: string = blank ? '' : MiscUtils.getPresentDateTime();

    this.startDate = presentDT;
    this.calibrationDate = presentDT;
    this.endDate = '';
    this.dataSamplingInterval =  0;
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
        '/startDate', 'string');

      this.addFieldMapping('/pressureSensor/validTime/abstractTimePrimitive/gml:TimePeriod/endPosition/value/0',
        'string',
        '/endDate', 'string');

      this.addFieldMapping('/pressureSensor/calibrationDate/value/0', 'string',
        '/calibrationDate', 'string');

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

  /**
   * Called on the 'last' object before creating a new one to populate it with some values such as endDate.
   */
  setFinalValuesBeforeCreatingNewItem(): void {
    let presentDT: string = MiscUtils.getPresentDateTime();

    this.endDate=presentDT;
  }
}
