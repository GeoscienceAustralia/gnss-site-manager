import { JsonixService } from '../jsonix/jsonix.service';
import { ReflectiveInjector } from '@angular/core';
import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ConstantsService } from '../global/constants.service';
import { ReceiverAntennaCodeService } from './receiver-antenna-code.service';

export function main() {
    describe('ReceiverAntennaCode Service', () => {
        let receiverAntennaCodeService: ReceiverAntennaCodeService;

        // tslint:disable-next-line:max-line-length
        const mockResponse: any = `<CT_CodelistCatalogue xmlns='http://www.isotc211.org/2005/gmx' xmlns:gco='http://www.isotc211.org/2005/gco' xmlns:gml='http://www.opengis.net/gml/3.2' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance'>
        <name>
          <gco:CharacterString>GeodesyML GNSS antenna and receiver type codes</gco:CharacterString>
        </name>
        <scope>
          <gco:CharacterString>eGeodesy</gco:CharacterString>
        </scope>
        <fieldOfApplication>
          <gco:CharacterString>Geodesy</gco:CharacterString>
        </fieldOfApplication>
        <versionNumber>
          <gco:CharacterString>0</gco:CharacterString>
        </versionNumber>
        <versionDate>
          <gco:Date>2017-04-03</gco:Date>
        </versionDate>
        <codelistItem>
          <CodeListDictionary gml:id='GeodesyML_GNSSReceiverTypeCode'>
            <gml:description>GeodesyML GNSS Receiver Types</gml:description>
            <gml:identifier codeSpace='urn:xml-gov-au:icsm:egeodesy'>GeodesyML_GNSSReceiverTypeCode</gml:identifier>
            <codeEntry>
              <CodeDefinition gml:id='ReceiverTypeCode_LEICA_GR30'>
                <gml:description>555 channel GPS/GLO/GAL/BDS/QZSS/SBAS multi-frequency</gml:description>
                <gml:identifier codeSpace='urn:xml-gov-au:icsm:egeodesy'>LEICA GR30</gml:identifier>
              </CodeDefinition>
            </codeEntry>
            <codeEntry>
              <CodeDefinition gml:id='ReceiverTypeCode_LEICA_GR50'>
                <gml:description>555 channel GPS/GLO/GAL/BDS/QZSS/SBAS multi-frequency</gml:description>
                <gml:identifier codeSpace='urn:xml-gov-au:icsm:egeodesy'>LEICA GR50</gml:identifier>
              </CodeDefinition>
            </codeEntry>
          </CodeListDictionary>
        </codelistItem>
        <codelistItem>
          <CodeListDictionary gml:id='GeodesyML_GNSSAntennaTypeCode'>
            <gml:description>GeodesyML GNSS Antenna Type Codes</gml:description>
            <gml:identifier codeSpace='urn:xml-gov-au:icsm:egeodesy'>GeodesyML_GNSSAntennaTypeCode</gml:identifier>
            <codeEntry>
              <CodeDefinition gml:id='AntennaTypeCode_BEIDOU-3I'>
                <gml:description>BeiDou-3 IGSO</gml:description>
                <gml:identifier codeSpace='urn:xml-gov-au:icsm:egeodesy'>BEIDOU-3I</gml:identifier>
              </CodeDefinition>
            </codeEntry>
            <codeEntry>
              <CodeDefinition gml:id='AntennaTypeCode_BLOCK_I'>
                <gml:description>GPS Block I     : SVN 01-11</gml:description>
                <gml:identifier codeSpace='urn:xml-gov-au:icsm:egeodesy'>BLOCK I</gml:identifier>
              </CodeDefinition>
            </codeEntry>
            <codeEntry>
              <CodeDefinition gml:id='AntennaTypeCode_BLOCK_II'>
                <gml:description>GPS Block II    : SVN 13-21</gml:description>
                <gml:identifier codeSpace='urn:xml-gov-au:icsm:egeodesy'>BLOCK II</gml:identifier>
              </CodeDefinition>
            </codeEntry>
          </CodeListDictionary>
        </codelistItem>
      </CT_CodelistCatalogue>`;

        beforeEach(() => {

            let injector = ReflectiveInjector.resolveAndCreate([
                ReceiverAntennaCodeService,
                ConstantsService,
                JsonixService,
                BaseRequestOptions,
                MockBackend,
                {
                    provide: Http,
                    useFactory: function (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) {
                        return new Http(backend, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
            ]);

            receiverAntennaCodeService = injector.get(ReceiverAntennaCodeService);

            let mockBackend = injector.get(MockBackend);
            mockBackend.connections.subscribe((connection: any) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: mockResponse,
                    status: 200
                })));
            });
        });

        it('should be defined', () => {
            expect(ReceiverAntennaCodeService).not.toBeUndefined();
        });

        it('should return xml string to be parsed by Jsonix', () => {
            receiverAntennaCodeService.codeXML().subscribe((data: any) => {
                expect(data).toEqual('');
            });
        });

        it('should return json string with two receiver codes', () => {
            let receiverCodes: string[] = receiverAntennaCodeService.receiverCodes();
            expect(receiverCodes.length).toEqual(2);
        });

        it('should return json string with three antenna codes', () => {
            let antennaCodes: string[] = receiverAntennaCodeService.antennaCodes();
            expect(antennaCodes.length).toEqual(3);
        });
    });
}
