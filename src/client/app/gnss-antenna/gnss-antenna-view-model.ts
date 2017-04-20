import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';
import { MiscUtils } from '../shared/global/misc-utils';

export class GnssAntennaViewModel extends AbstractViewModel {

  public dateInstalled: string;
  public dateRemoved: string;
  public antennaType: string;
  public serialNumber: string;
  public antennaReferencePoint: string;
  public markerArpEastEcc: number;
  public markerArpUpEcc: number;
  public markerArpNorthEcc: number;
  public alignmentFromTrueNorth: number;
  public antennaRadomeType: string;
  public radomeSerialNumber: string;
  public antennaCableType: string;
  public antennaCableLength: number;
  public notes: string;

  /**
   * @param blank - if blank then don't add any default values - leave completely blank (empty) with '' | 0
   */
  constructor(blank: boolean = false) {
    super();
    this.dateInstalled = blank ? '' : MiscUtils.getPresentDateTime();
    this.dateRemoved = '';
    this.antennaType = '';
    this.serialNumber = '';
    this.antennaReferencePoint = '';
    this.markerArpEastEcc = 0;
    this.markerArpUpEcc = 0;
    this.markerArpNorthEcc = 0;
    this.alignmentFromTrueNorth = 0;
    this.antennaRadomeType = '';
    this.radomeSerialNumber = '';
    this.antennaCableType = '';
    this.antennaCableLength = 0;
    this.notes = '';
  }

  // TODO - remove type field and use generics instead
  createFieldMappings(): void {
      this.addFieldMapping('/gnssAntenna/dateInstalled/value/0', 'string', '/dateInstalled', 'string');
      this.addFieldMapping('/gnssAntenna/dateRemoved/value/0', 'string', '/dateRemoved', 'string');
      this.addFieldMapping('/gnssAntenna/igsModelCode/value', 'string', '/antennaType', 'string');
      this.addFieldMapping('/gnssAntenna/manufacturerSerialNumber', 'string', '/serialNumber', 'string');
      this.addFieldMapping('/gnssAntenna/antennaReferencePoint/value', 'string', '/antennaReferencePoint', 'string');
      this.addFieldMapping('/gnssAntenna/markerArpEastEcc', 'string', '/markerArpEastEcc', 'number');
      this.addFieldMapping('/gnssAntenna/markerArpUpEcc', 'string', '/markerArpUpEcc', 'number');
      this.addFieldMapping('/gnssAntenna/markerArpNorthEcc', 'string', '/markerArpNorthEcc', 'number');
      this.addFieldMapping('/gnssAntenna/alignmentFromTrueNorth', 'string', '/alignmentFromTrueNorth', 'number');
      this.addFieldMapping('/gnssAntenna/antennaRadomeType/value', 'string', '/antennaRadomeType', 'string');
      this.addFieldMapping('/gnssAntenna/radomeSerialNumber', 'string', '/radomeSerialNumber', 'string');
      this.addFieldMapping('/gnssAntenna/antennaCableType', 'string', '/antennaCableType', 'string');
      this.addFieldMapping('/gnssAntenna/antennaCableLength', 'string', '/antennaCableLength', 'number');
      this.addFieldMapping('/gnssAntenna/notes', 'string', '/notes', 'string');
  };

  /**
   * Called on the 'last' object before creating a new one to populate it with some values such as dateRemoved.
   */
  setFinalValuesBeforeCreatingNewItem(): void {
    this.dateRemoved = MiscUtils.getPresentDateTime();
  }
}
