import {AbstractViewModel} from '../shared/json-data-view-model/view-model/abstract-view-model';
import {MiscUtils} from '../shared/global/misc-utils';

export class GnssReceiverViewModel extends AbstractViewModel {

  public dateInstalled: string;
  public dateRemoved: string;
  public receiverType: string;
  public manufacturerSerialNumber: string;
  public firmwareVersion: string;
  public satelliteSystem: string;
  public elevationCutoffSetting: number;
  public temperatureStabilization: number;
  public notes: string;

  constructor() {
    super();
    this.dateInstalled = MiscUtils.getPresentDateTime();
    this.dateRemoved = '';
    this.receiverType = '';
    this.manufacturerSerialNumber = '';
    this.firmwareVersion = '';
    this.satelliteSystem = '';
    this.elevationCutoffSetting = 0;
    this.temperatureStabilization = 0;
    this.notes = '';
  }

  createFieldMappings(): void {
    this.addFieldMapping('/gnssReceiver/dateInstalled/value/0', 'string', '/dateInstalled', 'string');
    this.addFieldMapping('/gnssReceiver/dateRemoved/value/0', 'string', '/dateRemoved', 'string');
    this.addFieldMapping('/gnssReceiver/receiverType/codeListValue', 'string', '/receiverType', 'string');
    this.addFieldMapping('/gnssReceiver/manufacturerSerialNumber', 'string', '/manufacturerSerialNumber', 'string');
    this.addFieldMapping('/gnssReceiver/firmwareVersion', 'string', '/firmwareVersion', 'string');
    this.addFieldMapping('/gnssReceiver/satelliteSystem/0/value', 'string', '/satelliteSystem', 'string');
    this.addFieldMapping('/gnssReceiver/elevationCutoffSetting', 'string', '/elevationCutoffSetting', 'number');
    this.addFieldMapping('/gnssReceiver/temperatureStabilization', 'string', '/temperatureStabilization', 'number');
    this.addFieldMapping('/gnssReceiver/notes', 'string', '/notes', 'string');
  };

  /**
   * Called on the 'last' object before creating a new one to populate it with some values such as dateRemoved.
   */
  setFinalValuesBeforeCreatingNewItem(): void {
    this.dateRemoved = MiscUtils.getPresentDateTime();
  }
}
