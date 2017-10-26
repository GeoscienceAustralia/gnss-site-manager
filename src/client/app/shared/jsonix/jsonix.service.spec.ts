import { ReflectiveInjector } from '@angular/core';

import { JsonixService } from './jsonix.service';
import { JsonServiceSpecData } from './jsonix.service.spec.data';

export function main() {
  describe('Jsonix Service', () => {
    let jsonixService: JsonixService;

    beforeEach(() => {

      let injector = ReflectiveInjector.resolveAndCreate([
        JsonixService,
      ]);
      jsonixService = injector.get(JsonixService);
    });

    it('should be defined', () => {
      expect(JsonixService).not.toBeUndefined();
    });

    it('should parse valid GeodesyML', () => {
      let geodesyml: string = `<geo:GeodesyML xsi:schemaLocation="urn:xml-gov-au:icsm:egeodesy:0.5"
 xmlns:geo="urn:xml-gov-au:icsm:egeodesy:0.5"
 xmlns:gml="http://www.opengis.net/gml/3.2"
 xmlns:ns9="http://www.w3.org/1999/xlink"
 xmlns:gmd="http://www.isotc211.org/2005/gmd"
 xmlns:gmx="http://www.isotc211.org/2005/gmx"
 xmlns:om="http://www.opengis.net/om/2.0" xmlns:gco="http://www.isotc211.org/2005/gco"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" gml:id="GeodesyMLType_20">
<geo:siteLog></geo:siteLog>
</geo:GeodesyML>`;
      let json: string = jsonixService.geodesyMLToJson(geodesyml);
      expect(json).not.toBeNull();
    });

    it('should parse valid Json', () => {
      let json: string = `{"geo:siteLog":{"TYPE_NAME":"GEODESYML_0_5.SiteLogType"}}`;
      let geodesyMl: string = jsonixService.jsonToGeodesyML(JSON.parse(json));
      expect(geodesyMl).not.toBeNull();
    });

    it('should error on invalid GeodesyML', () => {
      let geodesyml: string = `<geo:GeodesyML xsi:schemaLocation="urn:xml-gov-au:icsm:egeodesy:0.5"
 xmlns:geo="urn:xml-gov-au:icsm:egeodesy:0.5"
 xmlns:gml="http://www.opengis.net/gml/3.2"
 xmlns:ns9="http://www.w3.org/1999/xlink"
 xmlns:gmd="http://www.isotc211.org/2005/gmd"
 xmlns:gmx="http://www.isotc211.org/2005/gmx"
 xmlns:om="http://www.opengis.net/om/2.0" xmlns:gco="http://www.isotc211.org/2005/gco"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" gml:id="GeodesyMLType_20">`;
      expect(function(){
        jsonixService.geodesyMLToJson(geodesyml);
      }).toThrowError(/Element .*? could not be unmarshalled as is not known in this context and the property /);
    });

    it('should error on invalid Json', () => {
      let json: string = `{"geo:siteLog":{"TYPE_NAME":"GEODESYML_0_5.SiteLogType"`;
      expect(function() {
        jsonixService.jsonToGeodesyML(JSON.parse(json));
      }).toThrowError(/Unexpected end of JSON input|JSON.parse: end of data/);
    });

    it('should parse valid wfs XML to help me develop the WFS Service (smiley) and than marshall back to XML', () => {
      let mlString: string = `<?xml version="1.0" encoding="UTF-8"?>
                              <wfs:GetFeature service="WFS" version="2.0.0"
                              xmlns:wfs="http://www.opengis.net/wfs/2.0"
                              xmlns:fes="http://www.opengis.net/fes/2.0"
                              xmlns:gsmlp="http://xmlns.geosciml.org/geosciml-portrayal/2.0"
                              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                              xsi:schemaLocation="http://www.opengis.net/wfs/2.0 http://schemas.opengis.net/wfs/2.0/wfs.xsd">
                                  <wfs:Query typeNames="geo:Site">
                                      <fes:PropertyIsLike wildCard="*" singleChar="#" escapeChar="!">
                                          <fes:ValueReference>gml:identifier</fes:ValueReference>
                                          <fes:Literal>A*</fes:Literal>
                                      </fes:PropertyIsLike>
                                  </wfs:Query>
                              </wfs:GetFeature>`;
      let json: string = jsonixService.geodesyMLToJson(mlString);
      // console.log('JSON from WFS XML: ', JSON.stringify(json));
      console.log('JSON from WFS XML (length): ', JSON.stringify(json).length);
      expect(json).not.toBeNull();
      expect(json).not.toBeUndefined();

      // The resultant JSON is:
      let wfsJson = `{"wfs:GetFeature": {
                    "TYPE_NAME": "WFS_2_0.GetFeatureType",
                    "service": "WFS",
                    "version": "2.0.0",
                    "abstractQueryExpression": [{
                        "wfs:Query": {
                            "TYPE_NAME": "WFS_2_0.QueryType",
                            "typeNames": ["geo:Site"],
                            "abstractSortingClause": {
                                "fes:PropertyIsLike": {
                                    "TYPE_NAME": "Filter_2_0.PropertyIsLikeType",
                                    "wildCard": "*",
                                    "singleChar": "#",
                                    "escapeChar": "!",
                                    "expression": [{
                                        "fes:ValueReference": "gml:identifier"
                                    }, {
                                        "fes:Literal": {
                                            "TYPE_NAME": "Filter_2_0.LiteralType",
                                            "content": ["A*"]
                                        }
                                    }]
                                }
                            }
                        }
                    }]
                  }
                }`;
      console.log('resultant JSON (length): ', wfsJson.length);
      let wfsBackAgain: string = jsonixService.jsonToGeodesyML(JSON.parse(wfsJson));
      console.log('wfs xml marshalled from unmarshalled json (length): ', wfsBackAgain.length);
      expect(wfsBackAgain).not.toBeNull();
    });

    let validJsonWithLocalEpisodicEffects = `
    {
        "geo:siteLog": {
            "localEpisodicEffects":[{
                "dateDeleted":{
                    "value":[]
                },
                "dateInserted":{
                    "value":["2017-01-23T04:55:23.758Z"]
                },
                "deletedReason":null,
                "localEpisodicEffect":{
                    "validTime":{
                        "abstractTimePrimitive":{
                            "gml:TimePeriod":{
                                "beginPosition":{"value":[
                                    "2017-01-23T04:55:23.756Z"]
                                },
                                "endPosition":{
                                    "value":[""]
                                }
                            }
                        }
                    },
                    "event":"something important happened"
                }
            }]
        }
    }`;

    it('should parse valid Json with a local episodic events element', () => {
      let geodesyMl: string = jsonixService.jsonToGeodesyML(JSON.parse(validJsonWithLocalEpisodicEffects));
      expect(geodesyMl).not.toBeNull();
      console.log(geodesyMl);
      expect(geodesyMl).toContain('something important happened');
    });

    let validJsonWithReceiverWithNotes = `
    {
        "geo:siteLog": {
	        "gnssReceivers": [
	          {
	            "TYPE_NAME": "GEODESYML_0_5.GnssReceiverPropertyType",
	            "gnssReceiver": {
	              "TYPE_NAME": "GEODESYML_0_5.GnssReceiverType",
	              "description": {
	                "TYPE_NAME": "GML_3_2_1.StringOrRefType",
	                "value": ""
	              },
	              "descriptionReference": {
	                "TYPE_NAME": "GML_3_2_1.ReferenceType"
	              },
	              "identifier": {
	                "TYPE_NAME": "GML_3_2_1.CodeWithAuthorityType",
	                "value": ""
	              },
	              "type": {
	                "TYPE_NAME": "GML_3_2_1.CodeType",
	                "value": ""
	              },
	              "notes": "!!!SOME INTERESTING REMARKS!!!",
	              "extension": {
	                "TYPE_NAME": "AnyType",
	                "attributes": {
	                  "{http://www.w3.org/2000/xmlns/}xsi": "http://www.w3.org/2001/XMLSchema-instance",
	                  "{http://www.w3.org/2001/XMLSchema-instance}nil": "true"
	                }
	              },
	              "manufacturerName": "",
	              "manufacturerModel": "",
	              "manufacturerPartNumber": "",
	              "manufacturerDescription": "",
	              "manufacturerSerialNumber": "3209",
	              "igsModelCode": {
	                "TYPE_NAME": "GEODESYML_0_5.IgsReceiverModelCodeType",
	                "value": ""
	              },
	              "receiverType": {
	                "TYPE_NAME": "GEODESYML_0_5.IgsReceiverModelCodeType",
	                "codeList":
	                "http://xml.gov.au/icsm/geodesyml/codelists/antenna-receiver-codelists.xml#GeodesyML_GNSSReceiverTypeCode",
	                "codeListValue": "ASHTECH Z-XII3",
	                "codeSpace": "https://igscb.jpl.nasa.gov/igscb/station/general/rcvr_ant.tab",
	                "value": "blah blah"
	              },
	              "satelliteSystem": [
	                {
	                  "TYPE_NAME": "GML_3_2_1.CodeType",
	                  "codeSpace": "eGeodesy/satelliteSystem",
	                  "value": "GPS",
	                  "codeListValue": ""
	                }
	              ],
	              "serialNumber": "",
	              "firmwareVersion": "1Y07-1DY4",
	              "elevationCutoffSetting": 0,
	              "dateInstalled": {
	                "TYPE_NAME": "GML_3_2_1.TimePositionType",
	                "value": [
	                  "2009-08-26T19:51:00.000Z"
	                ]
	              },
	              "dateRemoved": {
	                "TYPE_NAME": "GML_3_2_1.TimePositionType",
	                "value": [
	                  ""
	                ]
	              },
	              "temperatureStabilization": 0
	            },
	            "dateInserted": {
	              "TYPE_NAME": "GML_3_2_1.TimePositionType",
	              "value": [ ]
	            },
	            "dateDeleted": {
	              "TYPE_NAME": "GML_3_2_1.TimePositionType",
	              "value": [ ]
	            },
	            "deletedReason": ""
            }]
        }
    }`;

    it('should parse valid Json with receiver with notes', () => {
      let geodesyML: string = jsonixService.jsonToGeodesyML(JSON.parse(validJsonWithReceiverWithNotes));
      expect(geodesyML).not.toBeNull();
      console.log(geodesyML);
      expect(geodesyML).toContain('gnssReceiver');
      expect(geodesyML).toContain('!!!SOME INTERESTING REMARKS!!!');
    });

      describe('Undefining Location.cartesianPosition but not Location.geodeticPosition', () => {
          it('should parse valid Json', () => {
              let json: Object = modifyCartesianPosition(JsonServiceSpecData.data());

              let geodesyML: string = jsonixService.jsonToGeodesyML(json);
              expect(geodesyML).not.toBeNull();
              expect(geodesyML).toContain('<geo:approximatePositionITRF>');
              expect(geodesyML).toContain('<geo:cartesianPosition/>');
              expect(geodesyML).toContain('<geo:geodeticPosition><gml:Point><gml:pos>4 5 6</gml:pos></gml:Point></geo:geodeticPosition>');
          });

      });
  });

    /**
     * Modify the test data to create an empty cartesianPosition
     * @param json test data
     * @return json test data modified for the test
     */
    function modifyCartesianPosition(json: any): any {
        // This is what we want to do in our View to Data translate when the values of the cartesianPosition or geodeticPosition are null
        json['geo:siteLog'].siteLocation.approximatePositionITRF.cartesianPosition = {};
        return json;
    }

}
