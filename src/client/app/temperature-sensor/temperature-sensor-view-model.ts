import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { MiscUtils } from '../shared/global/misc-utils';

export class TemperatureSensorViewModel extends AbstractViewModel {
  /**
   * Not the best form making fields public, however saves clutter of creating accessors / getters for all
   */
  public startDate: string;
  public endDate: string;

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
    let presentDT: string = MiscUtils.getPresentDateTime();

    this.startDate = blank ? '' : presentDT;
    this.calibrationDate = blank ? '' : presentDT;
    this.endDate = '';
    this.dataSamplingInterval =  0;
    this.accuracyDegreesCelcius = 0;
    this.notes = '';
    this.manufacturer = '';
    this.serialNumber = '';
    this.heightDiffToAntenna = 0;
  }

  // TODO - remove type field and use generics instead
  createFieldMappings(): void {
      this.addFieldMapping('/temperatureSensor/validTime/abstractTimePrimitive/gml:TimePeriod/beginPosition/value/0',
        'string',
        '/startDate', 'string');

      this.addFieldMapping('/temperatureSensor/validTime/abstractTimePrimitive/gml:TimePeriod/endPosition/value/0',
        'string',
        '/endDate', 'string');

      this.addFieldMapping('/temperatureSensor/calibrationDate/value/0', 'string',
        '/calibrationDate', 'string');

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

  /**
   * Called on the 'last' object before creating a new one to populate it with some values such as endDate.
   */
  setFinalValuesBeforeCreatingNewItem(): void {
    let presentDT: string = MiscUtils.getPresentDateTime();

    this.endDate=presentDT;
  }
}
