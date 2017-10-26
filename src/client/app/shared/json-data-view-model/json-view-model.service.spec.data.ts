export class JsonViewModelServiceSpecData {
    public static data(): any {
        return {
            'geo:siteLog': {
                TYPE_NAME: 'GEODESYML_0_5.SiteLogType',
                description: {
                    TYPE_NAME: 'GML_3_2_1.StringOrRefType',
                    value: ''
                },
                descriptionReference: {
                    TYPE_NAME: 'GML_3_2_1.ReferenceType'
                },
                identifier: {
                    TYPE_NAME: 'GML_3_2_1.CodeWithAuthorityType',
                    value: ''
                },
                boundedBy: {
                    TYPE_NAME: 'GML_3_2_1.BoundingShapeType'
                },
                atSite: {
                    TYPE_NAME: 'GEODESYML_0_5.SitePropertyType'
                },
                formInformation: {
                    TYPE_NAME: 'GEODESYML_0_5.FormInformationType',
                    preparedBy: 'James C Berra',
                    datePrepared: {
                        TYPE_NAME: 'GML_3_2_1.TimePositionType',
                        value: [
                            '2008-05-30T00:00:00.000Z'
                        ]
                    },
                    reportType: 'New'
                },
                siteIdentification: {
                    TYPE_NAME: 'GEODESYML_0_5.SiteIdentificationType',
                    siteName: 'Australia NGA collocated',
                    fourCharacterID: 'ADE1',
                    monumentInscription: '',
                    iersDOMESNumber: '50109S001',
                    cdpNumber: '',
                    monumentDescription: {
                        TYPE_NAME: 'GML_3_2_1.CodeType',
                        codeSpace: 'eGeodesy/monumentDescription',
                        value: 'None'
                    },
                    monumentFoundation: '',
                    markerDescription: 'None',
                    dateInstalled: {
                        TYPE_NAME: 'GML_3_2_1.TimePositionType',
                        value: [
                            '1986-01-01T00:00:00.000Z'
                        ]
                    },
                    geologicCharacteristic: {
                        TYPE_NAME: 'GML_3_2_1.CodeType',
                        codeSpace: 'eGeodesy/geologicCharacteristic',
                        value: ''
                    },
                    bedrockType: '',
                    bedrockCondition: '',
                    fractureSpacing: '',
                    faultZonesNearby: {
                        TYPE_NAME: 'GML_3_2_1.CodeType',
                        codeSpace: 'eGeodesy/faultZonesNearby',
                        value: ''
                    },
                    distanceActivity: '',
                    notes: ''
                },
                siteLocation: {
                    TYPE_NAME: 'GEODESYML_0_5.SiteLocationType',
                    city: 'Salisbury',
                    state: 'South Australia',
                    countryCodeISO: 'Australia',
                    tectonicPlate: {
                        TYPE_NAME: 'GML_3_2_1.CodeType',
                        codeSpace: 'eGeodesy/tectonicPlate',
                        value: 'Australian'
                    },
                    approximatePositionITRF: {
                        TYPE_NAME: 'GEODESYML_0_5.SiteLocationType.ApproximatePositionITRF',
                        xCoordinateInMeters: '-3939182.131',
                        yCoordinateInMeters: '3467075.376',
                        zCoordinateInMeters: '-3613220.824',
                        elevationMEllips: '38.2'
                    },
                    notes: ''
                },
                gnssReceivers: [
                    {
                        TYPE_NAME: 'GEODESYML_0_5.GnssReceiverPropertyType',
                        gnssReceiver: {
                            TYPE_NAME: 'GEODESYML_0_5.GnssReceiverType',
                            description: {
                                TYPE_NAME: 'GML_3_2_1.StringOrRefType',
                                value: ''
                            },
                            descriptionReference: {
                                TYPE_NAME: 'GML_3_2_1.ReferenceType'
                            },
                            identifier: {
                                TYPE_NAME: 'GML_3_2_1.CodeWithAuthorityType',
                                value: ''
                            },
                            type: {
                                TYPE_NAME: 'GML_3_2_1.CodeType',
                                value: 'some_type'
                            },
                            remarks: '',
                            extension: {
                                TYPE_NAME: 'AnyType',
                                attributes: {
                                    '{http://www.w3.org/2000/xmlns/}xsi': 'http://www.w3.org/2001/XMLSchema-instance',
                                    '{http://www.w3.org/2001/XMLSchema-instance}nil': 'true'
                                }
                            },
                            manufacturerName: '',
                            manufacturerModel: '',
                            manufacturerPartNumber: '',
                            manufacturerDescription: '',
                            manufacturerSerialNumber: '3213',
                            igsModelCode: {
                                TYPE_NAME: 'GEODESYML_0_5.IgsReceiverModelCodeType',
                                codeList:
                                    'http://xml.gov.au/icsm/geodesyml/codelists/antenna-receiver-codelists.xml' +
                                    '#GeodesyML_GNSSReceiverTypeCode',
                                codeListValue: 'ASHTECH Z-XII3',
                                codeSpace: 'https://igscb.jpl.nasa.gov/igscb/station/general/rcvr_ant.tab',
                                value: 'ASHTECH Z-XII3'
                            },
                            satelliteSystem: [
                                {
                                    TYPE_NAME: 'GML_3_2_1.CodeType',
                                    codeSpace: 'eGeodesy/satelliteSystem',
                                    value: 'GPS'
                                }
                            ],
                            serialNumber: '',
                            firmwareVersion: '1Y07-1DY4',
                            elevationCutoffSetting: 0,
                            dateInstalled: {
                                TYPE_NAME: 'GML_3_2_1.TimePositionType',
                                value: [
                                    '2000-08-01T00:00:00.000Z'
                                ]
                            },
                            dateRemoved: {
                                TYPE_NAME: 'GML_3_2_1.TimePositionType',
                                value: []
                            },
                            temperatureStabilization: 0,
                            notes: 'Receiver 1'
                        },
                        dateInserted: {
                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                            value: []
                        },
                        dateDeleted: {
                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                            value: []
                        },
                        deletedReason: ''
                    }
                ],
                gnssAntennas: [
                    {
                        TYPE_NAME: 'GEODESYML_0_5.GnssAntennaPropertyType',
                        gnssAntenna: {
                            TYPE_NAME: 'GEODESYML_0_5.GnssAntennaType',
                            description: {
                                TYPE_NAME: 'GML_3_2_1.StringOrRefType',
                                value: ''
                            },
                            descriptionReference: {
                                TYPE_NAME: 'GML_3_2_1.ReferenceType'
                            },
                            identifier: {
                                TYPE_NAME: 'GML_3_2_1.CodeWithAuthorityType',
                                value: ''
                            },
                            type: {
                                TYPE_NAME: 'GML_3_2_1.CodeType',
                                value: ''
                            },
                            remarks: '',
                            extension: {
                                TYPE_NAME: 'AnyType',
                                attributes: {
                                    '{http://www.w3.org/2000/xmlns/}xsi': 'http://www.w3.org/2001/XMLSchema-instance',
                                    '{http://www.w3.org/2001/XMLSchema-instance}nil': 'true'
                                }
                            },
                            manufacturerName: '',
                            manufacturerModel: '',
                            manufacturerPartNumber: '',
                            manufacturerDescription: '',
                            manufacturerSerialNumber: '',
                            igsModelCode: {
                                TYPE_NAME: 'GEODESYML_0_5.IgsAntennaModelCodeType',
                                value: ''
                            },
                            antennaType: {
                                TYPE_NAME: 'GEODESYML_0_5.IgsAntennaModelCodeType',
                                codeList:
                                    'http://xml.gov.au/icsm/geodesyml/codelists/antenna-receiver-codelists.xml' +
                                    '#GeodesyML_GNSSAntennaTypeCode',
                                codeListValue: 'ASH700936B_M    SNOW',
                                codeSpace: 'https://igscb.jpl.nasa.gov/igscb/station/general/rcvr_ant.tab',
                                value: 'ASH700936B_M    SNOW'
                            },
                            serialNumber: '1121',
                            antennaReferencePoint: {
                                TYPE_NAME: 'GML_3_2_1.CodeType',
                                codeSpace: 'eGeodesy/antennaRadomeType',
                                value: 'BPA'
                            },
                            markerArpUpEcc: 0,
                            markerArpNorthEcc: 0,
                            markerArpEastEcc: 0,
                            alignmentFromTrueNorth: 0,
                            antennaRadomeType: {
                                TYPE_NAME: 'GEODESYML_0_5.IgsRadomeModelCodeType',
                                codeSpace: 'eGeodesy/antennaRadomeType',
                                value: 'SNOW'
                            },
                            radomeSerialNumber: '',
                            antennaCableType: '',
                            antennaCableLength: 0,
                            dateInstalled: {
                                TYPE_NAME: 'GML_3_2_1.TimePositionType',
                                value: [
                                    '1995-01-01T00:00:00.000Z'
                                ]
                            },
                            dateRemoved: {
                                TYPE_NAME: 'GML_3_2_1.TimePositionType',
                                value: []
                            },
                            notes: ''
                        },
                        dateInserted: {
                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                            value: []
                        },
                        dateDeleted: {
                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                            value: []
                        },
                        deletedReason: ''
                    }
                ],
                surveyedLocalTies: [
                    {
                        TYPE_NAME: 'GEODESYML_0_5.SurveyedLocalTiesPropertyType',
                        surveyedLocalTies: {
                            TYPE_NAME: 'GEODESYML_0_5.SurveyedLocalTiesType',
                            description: {
                                TYPE_NAME: 'GML_3_2_1.StringOrRefType',
                                value: ''
                            },
                            descriptionReference: {
                                TYPE_NAME: 'GML_3_2_1.ReferenceType'
                            },
                            identifier: {
                                TYPE_NAME: 'GML_3_2_1.CodeWithAuthorityType',
                                value: ''
                            },
                            boundedBy: {
                                TYPE_NAME: 'GML_3_2_1.BoundingShapeType'
                            },
                            tiedMarkerName: 'UNK',
                            tiedMarkerUsage: '',
                            tiedMarkerCDPNumber: '',
                            tiedMarkerDOMESNumber: '',
                            differentialComponentsGNSSMarkerToTiedMonumentITRS: {
                                TYPE_NAME: 'GEODESYML_0_5.SurveyedLocalTiesType.DifferentialComponentsGNSSMarkerToTiedMonumentITRS',
                                dx: 3,
                                dy: 0,
                                dz: 0
                            },
                            localSiteTiesAccuracy: 0,
                            surveyMethod: '',
                            dateMeasured: {
                                TYPE_NAME: 'GML_3_2_1.TimePositionType',
                                value: []
                            },
                            notes: ''
                        },
                        tieMeasurement: {
                            TYPE_NAME: 'GEODESYML_0_5.TieMeasurementType'
                        },
                        dateInserted: {
                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                            value: []
                        },
                        dateDeleted: {
                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                            value: []
                        },
                        deletedReason: ''
                    }
                ],
                frequencyStandards: [
                    {
                        TYPE_NAME: 'GEODESYML_0_5.FrequencyStandardPropertyType',
                        frequencyStandard: {
                            TYPE_NAME: 'GEODESYML_0_5.FrequencyStandardType',
                            description: {
                                TYPE_NAME: 'GML_3_2_1.StringOrRefType',
                                value: ''
                            },
                            descriptionReference: {
                                TYPE_NAME: 'GML_3_2_1.ReferenceType'
                            },
                            identifier: {
                                TYPE_NAME: 'GML_3_2_1.CodeWithAuthorityType',
                                value: ''
                            },
                            standardType: {
                                TYPE_NAME: 'GML_3_2_1.CodeType',
                                codeSpace: 'eGeodesy/frequencyStandardType',
                                value: 'Cesium / Rcvr 1'
                            },
                            inputFrequency: 0,
                            validTime: {
                                TYPE_NAME: 'GML_3_2_1.TimePrimitivePropertyType',
                                abstractTimePrimitive: {
                                    'gml:TimePeriod': {
                                        TYPE_NAME: 'GML_3_2_1.TimePeriodType',
                                        description: {
                                            TYPE_NAME: 'GML_3_2_1.StringOrRefType',
                                            value: ''
                                        },
                                        descriptionReference: {
                                            TYPE_NAME: 'GML_3_2_1.ReferenceType'
                                        },
                                        identifier: {
                                            TYPE_NAME: 'GML_3_2_1.CodeWithAuthorityType',
                                            value: ''
                                        },
                                        beginPosition: {
                                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                                            value: [
                                                '2001-08-23T00:00:00.000Z'
                                            ]
                                        },
                                        begin: {
                                            TYPE_NAME: 'GML_3_2_1.TimeInstantPropertyType'
                                        },
                                        endPosition: {
                                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                                            value: []
                                        },
                                        end: {
                                            TYPE_NAME: 'GML_3_2_1.TimeInstantPropertyType'
                                        },
                                        timeInterval: {
                                            TYPE_NAME: 'GML_3_2_1.TimeIntervalLengthType',
                                            value: 0
                                        }
                                    }
                                }
                            },
                            notes: 'HP 5071A (S/N - 3249A00660)'
                        },
                        dateInserted: {
                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                            value: []
                        },
                        dateDeleted: {
                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                            value: []
                        },
                        deletedReason: ''
                    }
                ],
                humiditySensors: [
                    {
                        TYPE_NAME: 'GEODESYML_0_5.HumiditySensorPropertyType',
                        humiditySensor: {
                            TYPE_NAME: 'GEODESYML_0_5.HumiditySensorType',
                            description: {
                                TYPE_NAME: 'GML_3_2_1.StringOrRefType',
                                value: ''
                            },
                            descriptionReference: {
                                TYPE_NAME: 'GML_3_2_1.ReferenceType'
                            },
                            identifier: {
                                TYPE_NAME: 'GML_3_2_1.CodeWithAuthorityType',
                                value: ''
                            },
                            type: {
                                TYPE_NAME: 'GML_3_2_1.CodeType',
                                value: ''
                            },
                            remarks: '',
                            extension: {
                                TYPE_NAME: 'AnyType',
                                attributes: {
                                    '{http://www.w3.org/2000/xmlns/}xsi': 'http://www.w3.org/2001/XMLSchema-instance',
                                    '{http://www.w3.org/2001/XMLSchema-instance}nil': 'true'
                                }
                            },
                            manufacturer: '4',
                            serialNumber: '',
                            heightDiffToAntenna: 0,
                            calibrationDate: {
                                TYPE_NAME: 'GML_3_2_1.TimePositionType',
                                value: [
                                    '2016-11-30T13:56:58.396Z'
                                ]
                            },
                            validTime: {
                                TYPE_NAME: 'GML_3_2_1.TimePrimitivePropertyType',
                                abstractTimePrimitive: {
                                    'gml:TimePeriod': {
                                        TYPE_NAME: 'GML_3_2_1.TimePeriodType',
                                        description: {
                                            TYPE_NAME: 'GML_3_2_1.StringOrRefType',
                                            value: ''
                                        },
                                        descriptionReference: {
                                            TYPE_NAME: 'GML_3_2_1.ReferenceType'
                                        },
                                        identifier: {
                                            TYPE_NAME: 'GML_3_2_1.CodeWithAuthorityType',
                                            value: ''
                                        },
                                        beginPosition: {
                                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                                            value: [
                                                '2016-11-25T02:56:58.396Z'
                                            ]
                                        },
                                        begin: {
                                            TYPE_NAME: 'GML_3_2_1.TimeInstantPropertyType'
                                        },
                                        endPosition: {
                                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                                            value: []
                                        },
                                        end: {
                                            TYPE_NAME: 'GML_3_2_1.TimeInstantPropertyType'
                                        },
                                        timeInterval: {
                                            TYPE_NAME: 'GML_3_2_1.TimeIntervalLengthType',
                                            value: 0
                                        }
                                    }
                                }
                            },
                            dataSamplingInterval: 120,
                            accuracyPercentRelativeHumidity: 22.22,
                            aspiration: '',
                            notes: ''
                        },
                        dateInserted: {
                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                            value: []
                        },
                        dateDeleted: {
                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                            value: []
                        },
                        deletedReason: ''
                    },
                    {
                        TYPE_NAME: 'GEODESYML_0_5.HumiditySensorPropertyType',
                        humiditySensor: {
                            TYPE_NAME: 'GEODESYML_0_5.HumiditySensorType',
                            description: {
                                TYPE_NAME: 'GML_3_2_1.StringOrRefType',
                                value: ''
                            },
                            descriptionReference: {
                                TYPE_NAME: 'GML_3_2_1.ReferenceType'
                            },
                            identifier: {
                                TYPE_NAME: 'GML_3_2_1.CodeWithAuthorityType',
                                value: ''
                            },
                            type: {
                                TYPE_NAME: 'GML_3_2_1.CodeType',
                                codeSpace: 'eGeodesy/type',
                                value: ''
                            },
                            remarks: '',
                            extension: {
                                TYPE_NAME: 'AnyType',
                                attributes: {
                                    '{http://www.w3.org/2000/xmlns/}xsi': 'http://www.w3.org/2001/XMLSchema-instance',
                                    '{http://www.w3.org/2001/XMLSchema-instance}nil': 'true'
                                }
                            },
                            manufacturer: '2',
                            serialNumber: '',
                            heightDiffToAntenna: 0,
                            calibrationDate: {
                                TYPE_NAME: 'GML_3_2_1.TimePositionType',
                                value: [
                                    '2016-11-25T00:55:30.291Z'
                                ]
                            },
                            validTime: {
                                TYPE_NAME: 'GML_3_2_1.TimePrimitivePropertyType',
                                abstractTimePrimitive: {
                                    'gml:TimePeriod': {
                                        TYPE_NAME: 'GML_3_2_1.TimePeriodType',
                                        description: {
                                            TYPE_NAME: 'GML_3_2_1.StringOrRefType',
                                            value: ''
                                        },
                                        descriptionReference: {
                                            TYPE_NAME: 'GML_3_2_1.ReferenceType'
                                        },
                                        identifier: {
                                            TYPE_NAME: 'GML_3_2_1.CodeWithAuthorityType',
                                            value: ''
                                        },
                                        beginPosition: {
                                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                                            value: [
                                                '2016-11-10T11:55:30.291Z'
                                            ]
                                        },
                                        begin: {
                                            TYPE_NAME: 'GML_3_2_1.TimeInstantPropertyType'
                                        },
                                        endPosition: {
                                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                                            value: []
                                        },
                                        end: {
                                            TYPE_NAME: 'GML_3_2_1.TimeInstantPropertyType'
                                        },
                                        timeInterval: {
                                            TYPE_NAME: 'GML_3_2_1.TimeIntervalLengthType',
                                            value: 0
                                        }
                                    }
                                }
                            },
                            dataSamplingInterval: 0,
                            accuracyPercentRelativeHumidity: 0,
                            aspiration: '',
                            notes: ''
                        },
                        dateInserted: {
                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                            value: []
                        },
                        dateDeleted: {
                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                            value: []
                        },
                        deletedReason: ''
                    },
                    {
                        TYPE_NAME: 'GEODESYML_0_5.HumiditySensorPropertyType',
                        humiditySensor: {
                            TYPE_NAME: 'GEODESYML_0_5.HumiditySensorType',
                            description: {
                                TYPE_NAME: 'GML_3_2_1.StringOrRefType',
                                value: ''
                            },
                            descriptionReference: {
                                TYPE_NAME: 'GML_3_2_1.ReferenceType'
                            },
                            identifier: {
                                TYPE_NAME: 'GML_3_2_1.CodeWithAuthorityType',
                                value: ''
                            },
                            type: {
                                TYPE_NAME: 'GML_3_2_1.CodeType',
                                codeSpace: 'eGeodesy/type',
                                value: 'HMP233'
                            },
                            remarks: '',
                            extension: {
                                TYPE_NAME: 'AnyType',
                                attributes: {
                                    '{http://www.w3.org/2000/xmlns/}xsi': 'http://www.w3.org/2001/XMLSchema-instance',
                                    '{http://www.w3.org/2001/XMLSchema-instance}nil': 'true'
                                }
                            },
                            manufacturer: '1',
                            serialNumber: 'P2240006',
                            heightDiffToAntenna: 0,
                            calibrationDate: {
                                TYPE_NAME: 'GML_3_2_1.TimePositionType',
                                value: []
                            },
                            validTime: {
                                TYPE_NAME: 'GML_3_2_1.TimePrimitivePropertyType',
                                abstractTimePrimitive: {
                                    'gml:TimePeriod': {
                                        TYPE_NAME: 'GML_3_2_1.TimePeriodType',
                                        description: {
                                            TYPE_NAME: 'GML_3_2_1.StringOrRefType',
                                            value: ''
                                        },
                                        descriptionReference: {
                                            TYPE_NAME: 'GML_3_2_1.ReferenceType'
                                        },
                                        identifier: {
                                            TYPE_NAME: 'GML_3_2_1.CodeWithAuthorityType',
                                            value: ''
                                        },
                                        beginPosition: {
                                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                                            value: [
                                                '2016-11-01T11:55:04.000Z'
                                            ]
                                        },
                                        begin: {
                                            TYPE_NAME: 'GML_3_2_1.TimeInstantPropertyType'
                                        },
                                        endPosition: {
                                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                                            value: []
                                        },
                                        end: {
                                            TYPE_NAME: 'GML_3_2_1.TimeInstantPropertyType'
                                        },
                                        timeInterval: {
                                            TYPE_NAME: 'GML_3_2_1.TimeIntervalLengthType',
                                            value: 0
                                        }
                                    }
                                }
                            },
                            dataSamplingInterval: 900,
                            accuracyPercentRelativeHumidity: 0,
                            aspiration: '',
                            notes: ''
                        },
                        dateInserted: {
                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                            value: []
                        },
                        dateDeleted: {
                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                            value: []
                        },
                        deletedReason: ''
                    },
                    {
                        TYPE_NAME: 'GEODESYML_0_5.HumiditySensorPropertyType',
                        humiditySensor: {
                            TYPE_NAME: 'GEODESYML_0_5.HumiditySensorType',
                            description: {
                                TYPE_NAME: 'GML_3_2_1.StringOrRefType',
                                value: ''
                            },
                            descriptionReference: {
                                TYPE_NAME: 'GML_3_2_1.ReferenceType'
                            },
                            identifier: {
                                TYPE_NAME: 'GML_3_2_1.CodeWithAuthorityType',
                                value: ''
                            },
                            type: {
                                TYPE_NAME: 'GML_3_2_1.CodeType',
                                codeSpace: 'eGeodesy/type',
                                value: ''
                            },
                            remarks: '',
                            extension: {
                                TYPE_NAME: 'AnyType',
                                attributes: {
                                    '{http://www.w3.org/2000/xmlns/}xsi': 'http://www.w3.org/2001/XMLSchema-instance',
                                    '{http://www.w3.org/2001/XMLSchema-instance}nil': 'true'
                                }
                            },
                            manufacturer: '1.5',
                            serialNumber: '',
                            heightDiffToAntenna: 0,
                            calibrationDate: {
                                TYPE_NAME: 'GML_3_2_1.TimePositionType',
                                value: [
                                    '2016-11-25T00:56:17.284Z'
                                ]
                            },
                            validTime: {
                                TYPE_NAME: 'GML_3_2_1.TimePrimitivePropertyType',
                                abstractTimePrimitive: {
                                    'gml:TimePeriod': {
                                        TYPE_NAME: 'GML_3_2_1.TimePeriodType',
                                        description: {
                                            TYPE_NAME: 'GML_3_2_1.StringOrRefType',
                                            value: ''
                                        },
                                        descriptionReference: {
                                            TYPE_NAME: 'GML_3_2_1.ReferenceType'
                                        },
                                        identifier: {
                                            TYPE_NAME: 'GML_3_2_1.CodeWithAuthorityType',
                                            value: ''
                                        },
                                        beginPosition: {
                                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                                            value: [
                                                '2016-11-05T22:56:17.284Z'
                                            ]
                                        },
                                        begin: {
                                            TYPE_NAME: 'GML_3_2_1.TimeInstantPropertyType'
                                        },
                                        endPosition: {
                                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                                            value: []
                                        },
                                        end: {
                                            TYPE_NAME: 'GML_3_2_1.TimeInstantPropertyType'
                                        },
                                        timeInterval: {
                                            TYPE_NAME: 'GML_3_2_1.TimeIntervalLengthType',
                                            value: 0
                                        }
                                    }
                                }
                            },
                            dataSamplingInterval: 0,
                            accuracyPercentRelativeHumidity: 0,
                            aspiration: '',
                            notes: ''
                        },
                        dateInserted: {
                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                            value: []
                        },
                        dateDeleted: {
                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                            value: []
                        },
                        deletedReason: ''
                    },
                    {
                        TYPE_NAME: 'GEODESYML_0_5.HumiditySensorPropertyType',
                        humiditySensor: {
                            TYPE_NAME: 'GEODESYML_0_5.HumiditySensorType',
                            description: {
                                TYPE_NAME: 'GML_3_2_1.StringOrRefType',
                                value: ''
                            },
                            descriptionReference: {
                                TYPE_NAME: 'GML_3_2_1.ReferenceType'
                            },
                            identifier: {
                                TYPE_NAME: 'GML_3_2_1.CodeWithAuthorityType',
                                value: ''
                            },
                            type: {
                                TYPE_NAME: 'GML_3_2_1.CodeType',
                                codeSpace: 'eGeodesy/type',
                                value: ''
                            },
                            remarks: '',
                            extension: {
                                TYPE_NAME: 'AnyType',
                                attributes: {
                                    '{http://www.w3.org/2000/xmlns/}xsi': 'http://www.w3.org/2001/XMLSchema-instance',
                                    '{http://www.w3.org/2001/XMLSchema-instance}nil': 'true'
                                }
                            },
                            manufacturer: '2.5',
                            serialNumber: '',
                            heightDiffToAntenna: 0,
                            calibrationDate: {
                                TYPE_NAME: 'GML_3_2_1.TimePositionType',
                                value: [
                                    '2016-11-25T02:36:03.241Z'
                                ]
                            },
                            validTime: {
                                TYPE_NAME: 'GML_3_2_1.TimePrimitivePropertyType',
                                abstractTimePrimitive: {
                                    'gml:TimePeriod': {
                                        TYPE_NAME: 'GML_3_2_1.TimePeriodType',
                                        description: {
                                            TYPE_NAME: 'GML_3_2_1.StringOrRefType',
                                            value: ''
                                        },
                                        descriptionReference: {
                                            TYPE_NAME: 'GML_3_2_1.ReferenceType'
                                        },
                                        identifier: {
                                            TYPE_NAME: 'GML_3_2_1.CodeWithAuthorityType',
                                            value: ''
                                        },
                                        beginPosition: {
                                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                                            value: [
                                                '2016-11-20T13:36:03.241Z'
                                            ]
                                        },
                                        begin: {
                                            TYPE_NAME: 'GML_3_2_1.TimeInstantPropertyType'
                                        },
                                        endPosition: {
                                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                                            value: []
                                        },
                                        end: {
                                            TYPE_NAME: 'GML_3_2_1.TimeInstantPropertyType'
                                        },
                                        timeInterval: {
                                            TYPE_NAME: 'GML_3_2_1.TimeIntervalLengthType',
                                            value: 0
                                        }
                                    }
                                }
                            },
                            dataSamplingInterval: 0,
                            accuracyPercentRelativeHumidity: 0,
                            aspiration: '',
                            notes: ''
                        },
                        dateInserted: {
                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                            value: []
                        },
                        dateDeleted: {
                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                            value: []
                        },
                        deletedReason: ''
                    }
                ],
                pressureSensors: [
                    {
                        TYPE_NAME: 'GEODESYML_0_5.PressureSensorPropertyType',
                        pressureSensor: {
                            TYPE_NAME: 'GEODESYML_0_5.PressureSensorType',
                            description: {
                                TYPE_NAME: 'GML_3_2_1.StringOrRefType',
                                value: ''
                            },
                            descriptionReference: {
                                TYPE_NAME: 'GML_3_2_1.ReferenceType'
                            },
                            identifier: {
                                TYPE_NAME: 'GML_3_2_1.CodeWithAuthorityType',
                                value: ''
                            },
                            type: {
                                TYPE_NAME: 'GML_3_2_1.CodeType',
                                codeSpace: 'eGeodesy/type',
                                value: 'PTB202A'
                            },
                            remarks: '',
                            extension: {
                                TYPE_NAME: 'AnyType',
                                attributes: {
                                    '{http://www.w3.org/2000/xmlns/}xsi': 'http://www.w3.org/2001/XMLSchema-instance',
                                    '{http://www.w3.org/2001/XMLSchema-instance}nil': 'true'
                                }
                            },
                            manufacturer: 'Vaisala',
                            serialNumber: 'P2240006',
                            heightDiffToAntenna: 0,
                            calibrationDate: {
                                TYPE_NAME: 'GML_3_2_1.TimePositionType',
                                value: []
                            },
                            validTime: {
                                TYPE_NAME: 'GML_3_2_1.TimePrimitivePropertyType'
                            },
                            dataSamplingInterval: 900,
                            accuracyHPa: 0,
                            notes: ''
                        },
                        dateInserted: {
                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                            value: []
                        },
                        dateDeleted: {
                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                            value: []
                        },
                        deletedReason: ''
                    }
                ],
                temperatureSensors: [
                    {
                        TYPE_NAME: 'GEODESYML_0_5.TemperatureSensorPropertyType',
                        temperatureSensor: {
                            TYPE_NAME: 'GEODESYML_0_5.TemperatureSensorType',
                            description: {
                                TYPE_NAME: 'GML_3_2_1.StringOrRefType',
                                value: ''
                            },
                            descriptionReference: {
                                TYPE_NAME: 'GML_3_2_1.ReferenceType'
                            },
                            identifier: {
                                TYPE_NAME: 'GML_3_2_1.CodeWithAuthorityType',
                                value: ''
                            },
                            type: {
                                TYPE_NAME: 'GML_3_2_1.CodeType',
                                codeSpace: 'eGeodesy/type',
                                value: 'HMP233'
                            },
                            remarks: '',
                            extension: {
                                TYPE_NAME: 'AnyType',
                                attributes: {
                                    '{http://www.w3.org/2000/xmlns/}xsi': 'http://www.w3.org/2001/XMLSchema-instance',
                                    '{http://www.w3.org/2001/XMLSchema-instance}nil': 'true'
                                }
                            },
                            manufacturer: 'Vaisala',
                            serialNumber: 'P2240006',
                            heightDiffToAntenna: 0,
                            calibrationDate: {
                                TYPE_NAME: 'GML_3_2_1.TimePositionType',
                                value: []
                            },
                            validTime: {
                                TYPE_NAME: 'GML_3_2_1.TimePrimitivePropertyType'
                            },
                            dataSamplingInterval: 900,
                            aspiration: '',
                            notes: ''
                        },
                        dateInserted: {
                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                            value: []
                        },
                        dateDeleted: {
                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                            value: []
                        },
                        deletedReason: ''
                    }
                ],
                waterVaporSensors: [
                    {
                        TYPE_NAME: 'GEODESYML_0_5.WaterVaporSensorPropertyType',
                        waterVaporSensor: {
                            TYPE_NAME: 'GEODESYML_0_5.WaterVaporSensorType',
                            description: {
                                TYPE_NAME: 'GML_3_2_1.StringOrRefType',
                                value: ''
                            },
                            descriptionReference: {
                                TYPE_NAME: 'GML_3_2_1.ReferenceType'
                            },
                            identifier: {
                                TYPE_NAME: 'GML_3_2_1.CodeWithAuthorityType',
                                value: ''
                            },
                            type: {
                                TYPE_NAME: 'GML_3_2_1.CodeType',
                                codeSpace: 'eGeodesy/type',
                                value: 'UNK'
                            },
                            remarks: '',
                            extension: {
                                TYPE_NAME: 'AnyType',
                                attributes: {
                                    '{http://www.w3.org/2000/xmlns/}xsi': 'http://www.w3.org/2001/XMLSchema-instance',
                                    '{http://www.w3.org/2001/XMLSchema-instance}nil': 'true'
                                }
                            },
                            manufacturer: '',
                            serialNumber: '',
                            heightDiffToAntenna: 0,
                            calibrationDate: {
                                TYPE_NAME: 'GML_3_2_1.TimePositionType',
                                value: []
                            },
                            validTime: {
                                TYPE_NAME: 'GML_3_2_1.TimePrimitivePropertyType'
                            },
                            distanceToAntenna: 0,
                            notes: ''
                        },
                        dateInserted: {
                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                            value: []
                        },
                        dateDeleted: {
                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                            value: []
                        },
                        deletedReason: ''
                    }
                ],
                siteOwner: {
                    TYPE_NAME: 'GEODESYML_0_5.AgencyPropertyType'
                },
                siteContact: [
                    {
                        TYPE_NAME: 'GEODESYML_0_5.AgencyPropertyType',
                        description: {
                            TYPE_NAME: 'GML_3_2_1.StringOrRefType',
                            value: ''
                        },
                        descriptionReference: {
                            TYPE_NAME: 'GML_3_2_1.ReferenceType'
                        },
                        identifier: {
                            TYPE_NAME: 'GML_3_2_1.CodeWithAuthorityType',
                            value: ''
                        },
                        mdSecurityConstraints: {
                            TYPE_NAME: 'ISO19139_GMD_20070417.MDSecurityConstraintsType'
                        },
                        ciResponsibleParty: {
                            TYPE_NAME: 'ISO19139_GMD_20070417.CIResponsiblePartyType',
                            individualName: {
                                TYPE_NAME: 'ISO19139_GCO_20070417.CharacterStringPropertyType',
                                characterString: {
                                    'gco:CharacterString': 'Randall E. Taylor'
                                }
                            },
                            organisationName: {
                                TYPE_NAME: 'ISO19139_GCO_20070417.CharacterStringPropertyType',
                                characterString: {
                                    'gco:CharacterString': 'National Geospatial-Intelligence Agency'
                                }
                            },
                            positionName: {
                                TYPE_NAME: 'ISO19139_GCO_20070417.CharacterStringPropertyType',
                                characterString: {
                                    'gco:CharacterString': ''
                                }
                            },
                            contactInfo: {
                                TYPE_NAME: 'ISO19139_GMD_20070417.CIContactPropertyType',
                                ciContact: {
                                    TYPE_NAME: 'ISO19139_GMD_20070417.CIContactType',
                                    phone: {
                                        TYPE_NAME: 'ISO19139_GMD_20070417.CITelephonePropertyType',
                                        ciTelephone: {
                                            TYPE_NAME: 'ISO19139_GMD_20070417.CITelephoneType',
                                            voice: [
                                                {
                                                    TYPE_NAME: 'ISO19139_GCO_20070417.CharacterStringPropertyType',
                                                    characterString: {
                                                        'gco:CharacterString': '(314) 676-1223'
                                                    }
                                                },
                                                {
                                                    TYPE_NAME: 'ISO19139_GCO_20070417.CharacterStringPropertyType',
                                                    characterString: {
                                                        'gco:CharacterString': '(314) 676-9140'
                                                    }
                                                }
                                            ],
                                            facsimile: [
                                                {
                                                    TYPE_NAME: 'ISO19139_GCO_20070417.CharacterStringPropertyType',
                                                    characterString: {
                                                        'gco:CharacterString': '(314) 676-3174'
                                                    }
                                                }
                                            ]
                                        }
                                    },
                                    address: {
                                        TYPE_NAME: 'ISO19139_GMD_20070417.CIAddressPropertyType',
                                        ciAddress: {
                                            TYPE_NAME: 'ISO19139_GMD_20070417.CIAddressType',
                                            deliveryPoint: [
                                                {
                                                    TYPE_NAME: 'ISO19139_GCO_20070417.CharacterStringPropertyType',
                                                    characterString: {
                                                        'gco:CharacterString': '7500 GEOINT Drive'
                                                    }
                                                },
                                                {
                                                    TYPE_NAME: 'ISO19139_GCO_20070417.CharacterStringPropertyType',
                                                    characterString: {
                                                        'gco:CharacterString': 'Springfield, VA 22150, USA'
                                                    }
                                                }
                                            ],
                                            city: {
                                                TYPE_NAME: 'ISO19139_GCO_20070417.CharacterStringPropertyType',
                                                characterString: {
                                                    'gco:CharacterString': ''
                                                }
                                            },
                                            administrativeArea: {
                                                TYPE_NAME: 'ISO19139_GCO_20070417.CharacterStringPropertyType',
                                                characterString: {
                                                    'gco:CharacterString': ''
                                                }
                                            },
                                            postalCode: {
                                                TYPE_NAME: 'ISO19139_GCO_20070417.CharacterStringPropertyType',
                                                characterString: {
                                                    'gco:CharacterString': ''
                                                }
                                            },
                                            country: {
                                                TYPE_NAME: 'ISO19139_GCO_20070417.CharacterStringPropertyType',
                                                characterString: {
                                                    'gco:CharacterString': ''
                                                }
                                            },
                                            electronicMailAddress: [
                                                {
                                                    TYPE_NAME: 'ISO19139_GCO_20070417.CharacterStringPropertyType',
                                                    characterString: {
                                                        'gco:CharacterString': ''
                                                    }
                                                }
                                            ]
                                        }
                                    },
                                    onlineResource: {
                                        TYPE_NAME: 'ISO19139_GMD_20070417.CIOnlineResourcePropertyType'
                                    },
                                    hoursOfService: {
                                        TYPE_NAME: 'ISO19139_GCO_20070417.CharacterStringPropertyType',
                                        characterString: {
                                            'gco:CharacterString': ''
                                        }
                                    },
                                    contactInstructions: {
                                        TYPE_NAME: 'ISO19139_GCO_20070417.CharacterStringPropertyType',
                                        characterString: {
                                            'gco:CharacterString': ''
                                        }
                                    }
                                }
                            },
                            role: {
                                TYPE_NAME: 'ISO19139_GMD_20070417.CIRoleCodePropertyType'
                            }
                        }
                    }
                ],
                siteMetadataCustodian: {
                    TYPE_NAME: 'GEODESYML_0_5.AgencyPropertyType',
                    description: {
                        TYPE_NAME: 'GML_3_2_1.StringOrRefType',
                        value: ''
                    },
                    descriptionReference: {
                        TYPE_NAME: 'GML_3_2_1.ReferenceType'
                    },
                    identifier: {
                        TYPE_NAME: 'GML_3_2_1.CodeWithAuthorityType',
                        value: ''
                    },
                    mdSecurityConstraints: {
                        TYPE_NAME: 'ISO19139_GMD_20070417.MDSecurityConstraintsType'
                    },
                    ciResponsibleParty: {
                        TYPE_NAME: 'ISO19139_GMD_20070417.CIResponsiblePartyType',
                        individualName: {
                            TYPE_NAME: 'ISO19139_GCO_20070417.CharacterStringPropertyType',
                            characterString: {
                                'gco:CharacterString': 'Randall E. Taylor'
                            }
                        },
                        organisationName: {
                            TYPE_NAME: 'ISO19139_GCO_20070417.CharacterStringPropertyType',
                            characterString: {
                                'gco:CharacterString': 'National Geospatial-Intelligence Agency'
                            }
                        },
                        positionName: {
                            TYPE_NAME: 'ISO19139_GCO_20070417.CharacterStringPropertyType',
                            characterString: {
                                'gco:CharacterString': ''
                            }
                        },
                        contactInfo: {
                            TYPE_NAME: 'ISO19139_GMD_20070417.CIContactPropertyType',
                            ciContact: {
                                TYPE_NAME: 'ISO19139_GMD_20070417.CIContactType',
                                phone: {
                                    TYPE_NAME: 'ISO19139_GMD_20070417.CITelephonePropertyType',
                                    ciTelephone: {
                                        TYPE_NAME: 'ISO19139_GMD_20070417.CITelephoneType',
                                        voice: [
                                            {
                                                TYPE_NAME: 'ISO19139_GCO_20070417.CharacterStringPropertyType',
                                                characterString: {
                                                    'gco:CharacterString': '(314) 676-1223'
                                                }
                                            },
                                            {
                                                TYPE_NAME: 'ISO19139_GCO_20070417.CharacterStringPropertyType',
                                                characterString: {
                                                    'gco:CharacterString': '(314) 676-9140'
                                                }
                                            }
                                        ],
                                        facsimile: [
                                            {
                                                TYPE_NAME: 'ISO19139_GCO_20070417.CharacterStringPropertyType',
                                                characterString: {
                                                    'gco:CharacterString': '(314) 676-3174'
                                                }
                                            }
                                        ]
                                    }
                                },
                                address: {
                                    TYPE_NAME: 'ISO19139_GMD_20070417.CIAddressPropertyType',
                                    ciAddress: {
                                        TYPE_NAME: 'ISO19139_GMD_20070417.CIAddressType',
                                        deliveryPoint: [
                                                {
                                                    TYPE_NAME: 'ISO19139_GCO_20070417.CharacterStringPropertyType',
                                                    characterString: {
                                                        'gco:CharacterString': 'National Geospatial-Intelligence Agency'
                                                    }
                                                },
                                                {
                                                    TYPE_NAME: 'ISO19139_GCO_20070417.CharacterStringPropertyType',
                                                    characterString: {
                                                        'gco:CharacterString': '7500 GEOINT Drive'
                                                    }
                                                },
                                                {
                                                    TYPE_NAME: 'ISO19139_GCO_20070417.CharacterStringPropertyType',
                                                    characterString: {
                                                        'gco:CharacterString': 'Springfield, VA 22150, USA'
                                                    }
                                                }

                                        ],
                                        city: {
                                            TYPE_NAME: 'ISO19139_GCO_20070417.CharacterStringPropertyType',
                                            characterString: {
                                                'gco:CharacterString': ''
                                            }
                                        },
                                        administrativeArea: {
                                            TYPE_NAME: 'ISO19139_GCO_20070417.CharacterStringPropertyType',
                                            characterString: {
                                                'gco:CharacterString': ''
                                            }
                                        },
                                        postalCode: {
                                            TYPE_NAME: 'ISO19139_GCO_20070417.CharacterStringPropertyType',
                                            characterString: {
                                                'gco:CharacterString': ''
                                            }
                                        },
                                        country: {
                                            TYPE_NAME: 'ISO19139_GCO_20070417.CharacterStringPropertyType',
                                            characterString: {
                                                'gco:CharacterString': ''
                                            }
                                        },
                                        electronicMailAddress: [
                                            {
                                                TYPE_NAME: 'ISO19139_GCO_20070417.CharacterStringPropertyType',
                                                characterString: {
                                                    'gco:CharacterString': ''
                                                }
                                            }
                                        ]
                                    }
                                },
                                hoursOfService: {
                                    TYPE_NAME: 'ISO19139_GCO_20070417.CharacterStringPropertyType',
                                    characterString: {
                                        'gco:CharacterString': ''
                                    }
                                },
                                contactInstructions: {
                                    TYPE_NAME: 'ISO19139_GCO_20070417.CharacterStringPropertyType',
                                    characterString: {
                                        'gco:CharacterString': ''
                                    }
                                }
                            }
                        },
                        role: {
                            TYPE_NAME: 'ISO19139_GMD_20070417.CIRoleCodePropertyType'
                        }
                    }
                },
                siteDataSource: {
                    TYPE_NAME: 'GEODESYML_0_5.AgencyPropertyType'
                },
                moreInformation: {
                    TYPE_NAME: 'GEODESYML_0_5.MoreInformationType'
                },
                dataStreams: {
                    TYPE_NAME: 'GEODESYML_0_5.DataStreamPropertyType'
                }
            }
        };
    }
}
