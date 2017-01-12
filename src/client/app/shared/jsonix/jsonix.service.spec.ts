import { ReflectiveInjector } from '@angular/core';

import { JsonixService } from './jsonix.service';

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
      let geodesyml: string = `<geo:GeodesyML xsi:schemaLocation="urn:xml-gov-au:icsm:egeodesy:0.3"
 xmlns:geo="urn:xml-gov-au:icsm:egeodesy:0.3"
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
      let json: string = `{"geo:siteLog":{"TYPE_NAME":"GEODESYML_0_3.SiteLogType"}}`;
      let geodesyMl: string = jsonixService.jsonToGeodesyML(JSON.parse(json));
      expect(geodesyMl).not.toBeNull();
    });

    it('should error on invalid GeodesyML', () => {
      let geodesyml: string = `<geo:GeodesyML xsi:schemaLocation="urn:xml-gov-au:icsm:egeodesy:0.3"
 xmlns:geo="urn:xml-gov-au:icsm:egeodesy:0.3"
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
      let json: string = `{"geo:siteLog":{"TYPE_NAME":"GEODESYML_0_3.SiteLogType"`;
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
      let wfsBackAgain: string = jsonixService.jsonToGeodesyML(wfsJson);
      console.log('wfs xml marshalled from unmarshalled json (length): ', wfsBackAgain.length);
      expect(wfsBackAgain).not.toBeNull();
    });

    let validJsonWithNullInAnArray = `
    {
      "geo:siteLog": {
        "gnssAntennas": [
          {
            "gnssAntenna": {
              "dateInstalled": {
                "value": [
                  "1995-01-01T00:00:00.000Z"
                ]
              },
              "dateRemoved": {
                "value": [
                     null
                ]
              },
              "antennaType": {
                "codeListValue": ""
              },
              "serialNumber": "1121",
              "antennaReferencePoint": {
                "value": "BPA"
              },
              "markerArpEastEcc": 8,
              "markerArpUpEcc": 0,
              "markerArpNorthEcc": 8,
              "alignmentFromTrueNorth": 0,
              "antennaRadomeType": {
                "value": "SNOW"
              },
              "radomeSerialNumber": "",
              "antennaCableType": "(vendor & type number)",
              "antennaCableLength": 0,
              "notes": ""
            }
          }
        ]
      }
    }`;

    fit('should parse valid Json with an array containing a null value', () => {
      let geodesyMl: string = jsonixService.jsonToGeodesyML(JSON.parse(validJsonWithNullInAnArray));
      expect(geodesyMl).not.toBeNull();
      console.log(geodesyMl);
    });

  });



}

