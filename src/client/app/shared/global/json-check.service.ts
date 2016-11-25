import { Injectable } from '@angular/core';
import { MiscUtilsService } from './misc-utils.service';

/**
 * This service class maintains the definitions of all GeodesyML elements for web UI, and provides methods to ensure
 * the existence of all required parameters/paths in the input SiteLog JSON objects.
 */
@Injectable()
export class JsonCheckService {
  private siteLog: any = {
    siteIdentification: {},
    siteLocation: {},
    siteOwner: {},
    siteContact: [],
    siteMetadataCustodian: {},
    gnssAntennas: [],
    gnssReceivers: [],
    frequencyStandards: [],
    humiditySensors: [],
    pressureSensors: [],
    temperatureSensors: [],
    localEpisodicEventsSet: []
  };

  private siteLocation: any = {
    approximatePositionITRF: {
      elevationMEllips: '',
      xCoordinateInMeters: '',
      yCoordinateInMeters: '',
      zCoordinateInMeters: ''
    },
    city: '',
    state: '',
    countryCodeISO: '',
    notes: '',
    tectonicPlate: { value: '' }
  };

  private contactDetails: any = {
    individualName: {
      characterString: {'gco:CharacterString': ''}
    },
    organisationName: {
      characterString: {'gco:CharacterString': ''}
    },
    positionName: {
      characterString: {'gco:CharacterString': ''}
    },
    contactInfo: {
      ciContact: {
        address: {
          ciAddress: {
            deliveryPoint: [{
              characterString: {'gco:CharacterString': ''}
            }],
            electronicMailAddress: [{
              characterString: {'gco:CharacterString': ''}
            }],
            city: {
              characterString: {'gco:CharacterString': ''}
            },
            administrativeArea: {
              characterString: {'gco:CharacterString': ''}
            },
            postalCode: {
              characterString: {'gco:CharacterString': ''}
            },
            country: {
              characterString: {'gco:CharacterString': ''}
            },
          }
        },
        contactInstructions: {
          characterString: {'gco:CharacterString': ''}
        },
        hoursOfService: {
          characterString: {'gco:CharacterString': ''}
        },
        onlineResource: {
          characterString: {'gco:CharacterString': ''}
        },
        phone: {
          ciTelephone: {
            voice: [{
              characterString: {'gco:CharacterString': ''}
            }],
            facsimile: [{
              characterString: {'gco:CharacterString': ''}
            }]
          }
        }
      }
    }
  };

  private receiver: any = {
    receiverType: { value: '' },
    manufacturerSerialNumber: '',
    serialNumber: '',
    firmwareVersion: '',
    satelliteSystem: [{
      codeListValue: '',
      value: ''
    }],
    elevationCutoffSetting: '',
    temperatureStabilization: '',
    dateInstalled: { value: [''] },
    dateRemoved: { value: [''] },
    notes: ''
  };

  private antenna: any = {
    antennaType: {
      codeListValue: '',
      value: ''
    },
    serialNumber: '',
    antennaReferencePoint: { value: '' },
    markerArpUpEcc: '',
    markerArpNorthEcc: '',
    markerArpEastEcc: '',
    alignmentFromTrueNorth: '',
    antennaRadomeType: { value: '' },
    radomeSerialNumber: '',
    antennaCableType: '',
    antennaCableLength: '',
    dateInstalled: { value: [''] },
    dateRemoved: { value: [''] },
    notes: ''
  };

  private frequencyStandard: any = {
    standardType: { value: '' },
    inputFrequency: '',
    validTime: {
      abstractTimePrimitive: {
        'gml:TimePeriod': {
          beginPosition: { value: [''] },
          endPosition: { value: [''] }
        }
      }
    },
    notes: ''
  };

  private humiditySensor: any = {
    dataSamplingInterval: 0,
    accuracyPercentRelativeHumidity: 0,
    aspiration: '',
    notes: '',
    manufacturer: '',
    serialNumber: '',
    heightDiffToAntenna: 0,
    calibrationDate: { value: [''] },
    validTime: {
      abstractTimePrimitive: {
        'gml:TimePeriod': {
          beginPosition: { value: [''] },
          endPosition: { value: [''] }
        }
      }
    }
  };
  
  private pressureSensor: any = {
    dataSamplingInterval: 0,
    accuracyPercentRelativeHumidity: 0, //TODO should be accuracyHPa
    notes: '',
    manufacturer: '',
    serialNumber: '',
    heightDiffToAntenna: 0,
    calibrationDate: { value: [''] },
    validTime: {
      abstractTimePrimitive: {
        'gml:TimePeriod': {
          beginPosition: { value: [''] },
          endPosition: { value: [''] }
        }
      }
    }
  };
  
  private temperatureSensor: any = {
    dataSamplingInterval: 0,
    accuracyDegreesCelcius: 0,
    aspiration: '',
    notes: '',
    manufacturer: '',
    serialNumber: '',
    heightDiffToAntenna: 0,
    calibrationDate: { value: [''] },
    validTime: {
      abstractTimePrimitive: {
        'gml:TimePeriod': {
          beginPosition: { value: [''] },
          endPosition: { value: [''] }
        }
      }
    }
  };

  private episodicEffect: any = {
    event: '',
    validTime: {
      abstractTimePrimitive: {
        'gml:TimePeriod': {
          beginPosition: { value: [''] },
          endPosition: { value: [''] }
        }
      }
    }
  };

  constructor(private utilsService: MiscUtilsService) {}

  public getValidSiteLog(json: any): any {
    this.merge(json, this.siteLog);
    return json;
  }

  public getValidSiteLocation(json: any): any {
    this.merge(json, this.siteLocation);
    return json;
  }

  public getNewSiteLocation(): any {
    return this.siteLocation;
  }

  public getValidSiteContact(json: any): any {
    this.merge(json, this.contactDetails);
    return json;
  }

  public getNewSiteContact(): any {
    return this.contactDetails;
  }

  public getValidMetadataCustodian(json: any): any {
    this.merge(json, this.contactDetails);
    return json;
  }

  public getNewMetadataCustodian(): any {
    return this.contactDetails;
  }

  public getValidReceiver(json: any): any {
    this.merge(json, this.receiver);
    return json;
  }

  public getNewReceiver(): any {
    return this.receiver;
  }

  public getValidAntenna(json: any): any {
    this.merge(json, this.antenna);
    return json;
  }

  public getNewAntenna(): any {
    return this.antenna;
  }

  public getValidFrequencyStandard(json: any): any {
    this.merge(json, this.frequencyStandard);
    return json;
  }

  public getNewFrequencyStandard(): any {
    return this.frequencyStandard;
  }

  public getValidHumiditySensor(json: any): any {
    this.merge(json, this.humiditySensor);
    return json;
  }

  public getNewHumiditySensor(): any {
    return this.humiditySensor;
  }

  public getValidPressureSensor(json: any): any {
    this.merge(json, this.pressureSensor);
    return json;
  }

  public getNewPressureSensor(): any {
    return this.pressureSensor;
  }

  public getValidTemperatureSensor(json: any): any {
    this.merge(json, this.temperatureSensor);
    return json;
  }

  public getNewTemperatureSensor(): any {
    return this.temperatureSensor;
  }

  public getValidEpisodicEffect(json: any): any {
    this.merge(json, this.episodicEffect);
    return json;
  }

  public getNewEpisodicEffect(): any {
    return this.episodicEffect;
  }

  /**
   * Merge two JSON objects by copying any missing paths from json2 to json1
   *
   * @param json1: a JSON object with valid values, but some of its mandatory paths/fields may be missing
   * @param json2: a JSON object contains all mandatory paths/fields for UI, but with null/empty values
   */
  public merge(json1: any, json2: any): void {
    if (!json1) {
      return;
    }
    let objType1: any = this.utilsService.getObjectType(json1);
    let objType2: any = this.utilsService.getObjectType(json2);
    if (objType2 === 'Object') {
      for (let attrName in json2) {
        if (json1.hasOwnProperty(attrName)) {
          this.merge(json1[attrName], json2[attrName]);
        } else {
          json1[attrName] = this.utilsService.cloneJsonObj(json2[attrName]);
        }
      }
    } else if (objType2 === 'Array' && json2.length > 0) {
      if (objType1 !== 'Array') {
        json1 = [];
      }

      if (json1.length === 0) {
        json1.push(this.utilsService.cloneJsonObj(json2[0]));
      } else {
        for (let i in json2) {
          if (json1.length <= i) {
            json1.push(this.utilsService.cloneJsonObj(json2[i]));
          } else {
            this.merge(json1[i], json2[i]);
          }
        }
      }
    }
  }
}
