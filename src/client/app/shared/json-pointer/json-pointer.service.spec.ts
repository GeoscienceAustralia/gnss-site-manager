import {JsonPointerService} from './json-pointer.service';


export function main() {
  describe('Testing of JsonPointerService', () => {
    let jsonObj: any;

    beforeEach(() => {
      jsonObj = {
        standardType: {value: ''},
        inputFrequency: '',
        validTime: {
          abstractTimePrimitive: {
            'gml:TimePeriod': {
              beginPosition: {value: ['1234']},
              endPosition: {value: ['9876']}
            }
          }
        },
        notes: 'Testing',
        individualName: {
          characterString: {'gco:CharacterString': 'Mark Smith'}
        },
        organisationName: {
          characterString: {'gco:CharacterString': ''}
        },
        contactInfo: {
          ciContact: {
            address: {
              ciAddress: {
                deliveryPoint: [{
                  characterString: {'gco:CharacterString': '8 Kemba Street, Mitchell, ACT'}
                }]
              }
            }
          }
        }
      };
    });

    it('JsonPointerService should be defined', () => {
      expect(JsonPointerService).not.toBeUndefined();
    });

    it('Test json pointer path - exists(), get() ... ...', () => {
      expect(jsonObj).toBeDefined();
      expect(JsonPointerService.exists(jsonObj, '/standardType/value')).toEqual(true);
      expect(JsonPointerService.exists(jsonObj, '/individualName/characterString')).toEqual(true);
      expect(JsonPointerService.get(jsonObj, '/inputFrequency')).toEqual('');
      expect(JsonPointerService.get(jsonObj, '/notes')).toEqual('Testing');
    });

    it('Test path with string-attribute ... ...', () => {
      expect(JsonPointerService.exists(jsonObj, '/organisationName/characterString/gco:CharacterString')).toEqual(true);
      expect(JsonPointerService.get(jsonObj, '/individualName/characterString/gco:CharacterString')).toEqual('Mark Smith');
    });

    it('Test path with array ... ...', () => {
      var item: any = JsonPointerService.get(jsonObj,
        '/this/path/doesnt/exist');
      expect(item).toBeNull();
      expect(JsonPointerService.exists(jsonObj,
        '/contactInfo/ciContact/address/ciAddress/deliveryPoint/0'))
        .toEqual(true);
      expect(JsonPointerService.get(jsonObj,
        '/contactInfo/ciContact/address/ciAddress/deliveryPoint/0/characterString/gco:CharacterString'))
        .toEqual('8 Kemba Street, Mitchell, ACT');
    });

    it('Test setting with existing path', () => {
      let path: string = '/organisationName/characterString/gco:CharacterString';
      let newValue: string = 'victor hugo';
      expect(JsonPointerService.exists(jsonObj, path)).toEqual(true);
      JsonPointerService.set(jsonObj, path, newValue);
      expect(JsonPointerService.get(jsonObj, path)).toEqual(newValue);
    });

    it('Test setting with NON-existing path - it should then exist', () => {
      let path: string = '/this/path/doesnt/exist';
      let newValue: string = 'victor hugo';
      expect(JsonPointerService.exists(jsonObj, path)).toEqual(false);
      JsonPointerService.set(jsonObj, path, newValue);
      expect(JsonPointerService.get(jsonObj, path)).toEqual(newValue);
    });

    it('Test get value when doesnt exist', () => {
      let path: string = '/this/path/doesnt/exist';
      expect(JsonPointerService.get(jsonObj, path)).toBeNull();
    });

    it('Test get string when doesnt exist', () => {
      let path: string = '/this/path/doesnt/exist';
      expect(JsonPointerService.getString(jsonObj, path)).toEqual('');
    });

    fit('test gml:TimePeriod in path', () => {
      let path: string = '/validTime/abstractTimePrimitive/gml:TimePeriod/beginPosition/value/0';
      let value: string = JsonPointerService.get(jsonObj, path);
      expect(value).not.toBeNull();
      expect(value).toEqual('1234');
    });
  });
}
