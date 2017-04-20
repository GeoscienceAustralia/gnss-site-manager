import { Injectable } from '@angular/core';
import { MiscUtils } from './misc-utils';

/**
 * This service class maintains the definitions of all GeodesyML elements for web UI, and provides methods to ensure
 * the existence of all required parameters/paths in the input ViewSiteLog JSON objects.
 */
@Injectable()
export class JsonCheckService {
  private siteLog: any = {
    siteIdentification: {},
    siteLocation: {},
    siteOwner: {},
    siteContact: [],
    siteMetadataCustodian: {},
    siteDataCenter: [],
    siteDataSource: {},
    gnssAntennas: [],
    gnssReceivers: [],
    surveyedLocalTies: [],
    frequencyStandards: [],
    // TODO: view model refactor - leaving these commented out for now as a reminder of which components
    // have been converted to view model and to remind devs to remove when doing their own refactoring
    // eventually we can revisit this and delete these comments
    // humiditySensors: [],
    // pressureSensors: [],
    // temperatureSensors: [],
    // waterVaporSensors: [],
    // localEpisodicEffects: []
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

    private siteIdentification: any = {
        fourCharacterID: '',
        siteName: '',
        monumentNumber: 0,
        receiverNumber: 0,
        monumentInscription: '',
        iersDOMESNumber: '',
        cdpNumber: '',
        monumentDescription: '',
        heightOfTheMonument: 0.0,
        monumentFoundation: '',
        foundationDepth: 0.0,
        markerDescription: '',
        dateInstalled: '',
        geologicCharacteristic: '',
        bedrockType: '',
        bedrockCondition: '',
        fractureSpacing: '',
        faultZonesNearby: '',
        distanceActivity: '',
        notes: ''
    };

  private responsibleParty: any = {
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
    notes: '',
    igsModelCode: { value: '' },
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
    dateRemoved: { value: [''] }
  };

  private antenna: any = {
    notes: '',
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
    dateRemoved: { value: [''] }
  };

  private surveyedLocalTie: any = {
    notes: '',
    tiedMarkerName: '',
    tiedMarkerUsage: '',
    tiedMarkerCDPNumber: '',
    tiedMarkerDOMESNumber: '',
    differentialComponentsGNSSMarkerToTiedMonumentITRS: [{
      dx: '',
      dy: '',
      dz: ''
    }],
    localSiteTiesAccuracy: '',
    surveyMethod: '',
    dateMeasured: { value: [''] }
  };

  private frequencyStandard: any = {
    notes: '',
    standardType: { value: '' },
    inputFrequency: '',
    validTime: {
      abstractTimePrimitive: {
        'gml:TimePeriod': {
          beginPosition: { value: [''] },
          endPosition: { value: [''] }
        }
      }
    }
  };

  private humiditySensor: any = {
    notes: '',
    dataSamplingInterval: 0,
    accuracyPercentRelativeHumidity: 0,
    aspiration: '',
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
    notes: '',
    dataSamplingInterval: 0,
    accuracyHPa: 0,
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
    notes: '',
    dataSamplingInterval: 0,
    accuracyDegreesCelcius: 0,
    aspiration: '',
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

  private waterVaporSensor: any = {
    notes: '',
    dataSamplingInterval: 0,
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

  private localEpisodicEffect: any = {
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

    public getValidSiteIdentification(json: any): any {
        this.merge(json, this.siteIdentification);
        return json;
    }

  /**
   * For Site Owner, Site Contact, Site Metadata Custodian,Site Data Center and Site Data Source
   */
  public getValidResponsibleParty(json: any): any {
    this.merge(json, this.responsibleParty);
    return json;
  }

  public getNewResponsibleParty(): any {
    return this.responsibleParty;
  }

  public getValidReceiver(json: any): any {
    // this.merge(json, this.receiver);
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

  public getValidWaterVaporSensor(json: any): any {
    this.merge(json, this.waterVaporSensor);
    return json;
  }

  public getNewWaterVaporSensor(): any {
    return this.waterVaporSensor;
  }

  public getValidSurveyedLocalTie(json: any): any {
    this.merge(json, this.surveyedLocalTie);
    return json;
  }

  public getNewSurveyedLocalTie(): any {
    return this.surveyedLocalTie;
  }

  public getValidLocalEpisodicEffect(json: any): any {
    this.merge(json, this.localEpisodicEffect);
    return json;
  }

  public getNewLocalEpisodicEffect(): any {
    return this.localEpisodicEffect;
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
    let objType1: any = MiscUtils.getObjectType(json1);
    let objType2: any = MiscUtils.getObjectType(json2);
    if (objType2 === 'Object') {
      for (let attrName in json2) {
        if (json1[attrName] !== undefined && json1.hasOwnProperty(attrName)) {
          this.merge(json1[attrName], json2[attrName]);
        } else {
          json1[attrName] = MiscUtils.cloneJsonObj(json2[attrName]);
        }
      }
    } else if (objType2 === 'Array' && json2.length > 0) {
      if (objType1 !== 'Array') {
        json1 = [];
      }

      if (json1.length === 0) {
        json1.push(MiscUtils.cloneJsonObj(json2[0]));
      } else {
        for (let i in json2) {
          if (json1.length <= i) {
            json1.push(MiscUtils.cloneJsonObj(json2[i]));
          } else {
            this.merge(json1[i], json2[i]);
          }
        }
      }
    }
  }
}
