import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { MiscUtils } from '../shared/global/misc-utils';

export class WaterVaporSensorViewModel extends AbstractViewModel {
  /**
   * Not the best form making fields public, however saves clutter of creating accessors / getters for all
   */
  public startDate: string;
  public endDate: string;

  public calibrationDate: string;

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
    this.notes = '';
    this.manufacturer = '';
    this.serialNumber = '';
    this.heightDiffToAntenna = 0;
  }

  // TODO - remove type field and use generics instead
  createFieldMappings(): void {
      this.addFieldMapping('/waterVaporSensor/validTime/abstractTimePrimitive/gml:TimePeriod/beginPosition/value/0',
        'string',
        '/startDate', 'string');

      this.addFieldMapping('/waterVaporSensor/validTime/abstractTimePrimitive/gml:TimePeriod/endPosition/value/0',
        'string',
        '/endDate', 'string');

      this.addFieldMapping('/waterVaporSensor/calibrationDate/value/0', 'string',
        '/calibrationDate', 'string');

      this.addFieldMapping('/waterVaporSensor/notes', 'string',
        '/notes', 'string');

      this.addFieldMapping('/waterVaporSensor/manufacturer', 'string',
        '/manufacturer', 'string');

      this.addFieldMapping('/waterVaporSensor/serialNumber', 'string',
        '/serialNumber', 'string');

      this.addFieldMapping('/waterVaporSensor/heightDiffToAntenna', 'string',
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
