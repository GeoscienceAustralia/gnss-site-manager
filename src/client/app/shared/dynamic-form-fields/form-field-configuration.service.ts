import { Injectable } from '@angular/core';

@Injectable()
export class FormFieldConfigurationService {

  // TODO read the properties from the field-mapping.json file asynchonously?
  private jsonFieldMappings: any = {

    'pressureSensorManufacturer': {
        'label': 'Manufacturer2',
        'maxlength': '100',
        'required': 'required'
    },
      'pressureSensorSerialNumber': {
        'label': 'Serial Number2',
        'maxlength': '100',
        'minlength': '4',
        'required': 'required'
    },
      'pressureSensorDataSamplingInterval': {
        'label': 'Data Sampling Interval2',
        'maxlength': '100',
        'minlength': '4',
        'required': 'false'
      }
  };

  public getObjectForKey(key: string): Object {
    return this.jsonFieldMappings[key];
  }
}



