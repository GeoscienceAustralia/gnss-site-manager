export class DataViewTranslatorSpecData {
    /**
     * This returns valid JSON object that can be used to modify as required.
     *
     * @return valid JSON object for a siteLog view model - from ADE1
     */
    public static viewObject(): any {
        return {
            siteIdentification: {
                bedrockCondition: '(FRESH/JOINTED/WEATHERED)',
                bedrockType: '(IGNEOUS/METAMORPHIC/SEDIMENTARY)',
                cdpNumber: 'n/a',
                dateInstalled: '1986-01-01 00:00:00',
                distanceActivity: null,
                faultZonesNearby: '(YES/NO/Name of the zone)',
                foundationDepth: 0,
                fourCharacterID: 'ADE1',
                fractureSpacing: '(1-10 cm/11-50 cm/51-200 cm/over 200 cm)',
                geologicCharacteristic: '(BEDROCK/CLAY/CONGLOMERATE/GRAVEL/SAND/etc)',
                heightOfTheMonument: 0,
                iersDOMESNumber: '50109S001',
                markerDescription: 'None',
                monumentDescription: 'None',
                monumentFoundation: '(STEEL RODS, CONCRETE BLOCK, ROOF, etc)',
                monumentInscription: null,
                notes: null,
                siteName: 'A3ee'
            },
            siteLocation: {
                city: 'Salisbury',
                state: 'South Australia',
                countryCodeISO: 'Australia',
                tectonicPlate: 'Australian',
                notes: null,
                cartesianPosition: {
                    x: 12,
                    y: 2,
                    z: 3
                },
                geodeticPosition: {
                    lat: 4,
                    lon: 5,
                    height: 6
                }
            },
            moreInformation: {
                TYPE_NAME: 'GEODESYML_0_5.MoreInformationType',
                dataCenter: [
                    'CDDIS',
                    'SIO'
                ],
                urlForMoreInformation: '',
                siteMap: '(Y or URL)',
                siteDiagram: '(Y or URL)',
                horizonMask: '(Y or URL)',
                monumentDescription: '(Y or URL)',
                sitePictures: '(Y or URL)',
                notes: '',
                antennaGraphicsWithDimensions: '',
                insertTextGraphicFromAntenna: '',
                doi: {
                    TYPE_NAME: 'GML_3_2_1.CodeType',
                    codeSpace: 'eGeodesy/doi',
                    value: 'TODO'
                }
            },
            dataStreams: {
                TYPE_NAME: 'GEODESYML_0_5.DataStreamPropertyType'
            },
            gnssAntennas: [],
            gnssReceivers: [
                {
                    startDate: '2017-05-29 03:48:31',
                    endDate: null,
                    receiverType: null,
                    manufacturerSerialNumber: null,
                    firmwareVersion: null,
                    satelliteSystem: null,
                    elevationCutoffSetting: 0,
                    temperatureStabilization: null,
                    notes: null
                },
                {
                    startDate: '2000-08-01 00:00:00',
                    endDate: '2017-05-29 03:48:31',
                    receiverType: 'ASHTECH Z-XII3',
                    manufacturerSerialNumber: '3213',
                    firmwareVersion: '1Y07-1DY4',
                    satelliteSystem: 'GPS',
                    elevationCutoffSetting: 0,
                    temperatureStabilization: 0,
                    notes: 'Receiver 1'
                },
                {
                    startDate: '1998-09-17 00:00:00',
                    endDate: '2000-08-01 00:00:00',
                    receiverType: 'ASHTECH Z-XII3',
                    manufacturerSerialNumber: '3213',
                    firmwareVersion: '1Y06-1D04',
                    satelliteSystem: 'GPS',
                    elevationCutoffSetting: 0,
                    temperatureStabilization: 0,
                    notes: 'Receiver 1'
                },
                {
                    startDate: '1996-01-01 00:00:00',
                    endDate: '1998-09-17 00:00:00',
                    receiverType: 'ASHTECH Z-XII3',
                    manufacturerSerialNumber: '3213',
                    firmwareVersion: '1Y05-1D04',
                    satelliteSystem: 'GPS',
                    elevationCutoffSetting: 0,
                    temperatureStabilization: 0,
                    notes: 'Receiver 1'
                },
                {
                    startDate: '1995-03-20 00:00:00',
                    endDate: '1996-01-01 00:00:00',
                    receiverType: 'ASHTECH Z-XII3',
                    manufacturerSerialNumber: '3213',
                    firmwareVersion: '1Y04-1D04',
                    satelliteSystem: 'GPS',
                    elevationCutoffSetting: 0,
                    temperatureStabilization: 0,
                    notes: 'Receiver 1'
                }
            ],
            surveyedLocalTies: [
                {
                    startDate: null,
                    endDate: null,
                    tiedMarkerName: 'UNK',
                    tiedMarkerUsage: '(SLR/VLBI/LOCAL CONTROL/FOOTPRINT/etc)',
                    tiedMarkerCDPNumber: '(A4)',
                    tiedMarkerDOMESNumber: '(A9)',
                    differentialComponent: {
                        dx: 0,
                        dy: 0,
                        dz: 0
                    },
                    localSiteTiesAccuracy: 0,
                    surveyMethod: '(GPS CAMPAIGN/TRILATERATION/TRIANGULATION/etc)',
                    notes: null
                }
            ],
            frequencyStandards: [
                {
                    startDate: '2001-08-23 00:00:00',
                    endDate: null,
                    standardType: 'Cesium / Rcvr 1',
                    inputFrequency: 0,
                    notes: 'HP 5071A (S/N - 3249A00660)'
                }
            ],
            localEpisodicEffects: [],
            humiditySensors: [
                {
                    startDate: null,
                    endDate: null,
                    calibrationDate: null,
                    dataSamplingInterval: 0,
                    accuracyPercentRelativeHumidity: 0,
                    aspiration: '(UNASPIRATED/NATURAL/FAN/etc)',
                    notes: '(multiple lines)',
                    manufacturer: 'Vaisala',
                    serialNumber: 'P2240006',
                    heightDiffToAntenna: 0
                }
            ],
            pressureSensors: [
                {
                    startDate: null,
                    endDate: null,
                    calibrationDate: null,
                    dataSamplingInterval: 0,
                    accuracyHPa: 0,
                    notes: null,
                    manufacturer: 'Vaisala',
                    serialNumber: 'P2240006',
                    heightDiffToAntenna: 0
                }
            ],
            temperatureSensors: [
                {
                    startDate: null,
                    endDate: null,
                    calibrationDate: null,
                    dataSamplingInterval: 0,
                    accuracyDegreesCelcius: 0,
                    notes: null,
                    manufacturer: 'Vaisala',
                    serialNumber: 'P2240006',
                    heightDiffToAntenna: 0,
                    aspiration: null
                }
            ],
            waterVaporSensors: [
                {
                    startDate: null,
                    endDate: null,
                    calibrationDate: null,
                    notes: null,
                    manufacturer: null,
                    serialNumber: null,
                    heightDiffToAntenna: 0
                }
            ],
            siteContacts: [
                {
                    startDate: null,
                    endDate: null,
                    individualName: 'fff',
                    organisationName: 'ggg',
                    positionName: null,
                    deliveryPoint: null,
                    city: null,
                    administrativeArea: 'hhh',
                    postalCode: null,
                    country: null,
                    email: null,
                    phone: null,
                    fax: null
                },
                {
                    startDate: null,
                    endDate: null,
                    individualName: 'Randall E. Taylor',
                    organisationName: 'National Geospatial-Intelligence Agency',
                    positionName: null,
                    deliveryPoint: '3838 Vogel Rd., Arnold, MO 63010-6238',
                    city: null,
                    administrativeArea: 'sss',
                    postalCode: null,
                    country: null,
                    email: 'Randall.E.Taylor@nga.mil',
                    phone: '(314) 676-1223',
                    fax: '(314) 676-3174'
                }
            ],
            siteMetadataCustodian: [
                {
                    startDate: null,
                    endDate: null,
                    individualName: 'James C Berra',
                    organisationName: 'National Geospatial-Intelligence Agency',
                    positionName: null,
                    deliveryPoint: '3838 Vogel Rd., Arnold, MO 63010-6238',
                    city: null,
                    administrativeArea: 'ccc',
                    postalCode: null,
                    country: null,
                    email: 'James.C.Berra@nga.mil',
                    phone: '(314) 676-9140',
                    fax: '(314) 676-3174'
                }
            ],
            siteDataSource: [
                {
                    startDate: null,
                    endDate: null,
                    individualName: 'ddd',
                    organisationName: 'ddd',
                    positionName: null,
                    deliveryPoint: null,
                    city: null,
                    administrativeArea: 'ddd',
                    postalCode: null,
                    country: null,
                    email: null,
                    phone: null,
                    fax: null
                }
            ],
            siteDataCenters: [],
            radioInterferences: [],
            signalObstructions: [],
            multipathSources: [],
            siteOwner: []
        };
    }

    /**
     * This returns valid JSON object that can be used to modify as required.
     *
     * @return valid JSON object for a siteLog data model - from ADE1
     */
    public static dataObject(): any {
        return {
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
                            codeSpace: 'eGeodesy/type',
                            value: 'HMP233'
                        },
                        notes: '(multiple lines)',
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
                        accuracyPercentRelativeHumidity: 0,
                        aspiration: '(UNASPIRATED/NATURAL/FAN/etc)'
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
                            value: ''
                        },
                        notes: 'Receiver 1',
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
                                'http://xml.gov.au/icsm/geodesyml/codelists/antenna-receiver-codelists.xml#GeodesyML_GNSSReceiverTypeCode',
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
                        firmwareVersion: '1Y04-1D04',
                        dateInstalled: {
                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                            value: [
                                '1995-03-20T00:00:00.000Z'
                            ]
                        },
                        dateRemoved: {
                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                            value: [
                                '1996-01-01T00:00:00.000Z'
                            ]
                        }
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
                            value: ''
                        },
                        notes: 'Receiver 1',
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
                                'http://xml.gov.au/icsm/geodesyml/codelists/antenna-receiver-codelists.xml#GeodesyML_GNSSReceiverTypeCode',
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
                        firmwareVersion: '1Y05-1D04',
                        dateInstalled: {
                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                            value: [
                                '1996-01-01T00:00:00.000Z'
                            ]
                        },
                        dateRemoved: {
                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                            value: [
                                '1998-09-17T00:00:00.000Z'
                            ]
                        }
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
                            value: ''
                        },
                        notes: 'Receiver 1',
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
                                'http://xml.gov.au/icsm/geodesyml/codelists/antenna-receiver-codelists.xml#GeodesyML_GNSSReceiverTypeCode',
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
                        firmwareVersion: '1Y06-1D04',
                        dateInstalled: {
                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                            value: [
                                '1998-09-17T00:00:00.000Z'
                            ]
                        },
                        dateRemoved: {
                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                            value: [
                                '2000-08-01T00:00:00.000Z'
                            ]
                        }
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
                            value: ''
                        },
                        notes: 'Receiver 1',
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
                                'http://xml.gov.au/icsm/geodesyml/codelists/antenna-receiver-codelists.xml#GeodesyML_GNSSReceiverTypeCode',
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
                        firmwareVersion: '1Y07-1DY4',
                        dateInstalled: {
                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                            value: [
                                '2000-08-01T00:00:00.000Z'
                            ]
                        },
                        dateRemoved: {
                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                            value: []
                        }
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
                        notes: '',
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
                        manufacturerSerialNumber: '1121',
                        igsModelCode: {
                            TYPE_NAME: 'GEODESYML_0_5.IgsAntennaModelCodeType',
                            codeList:
                                'http://xml.gov.au/icsm/geodesyml/codelists/antenna-receiver-codelists.xml#GeodesyML_GNSSAntennaTypeCode',
                            codeListValue: 'ASH700936B_M',
                            codeSpace: 'https://igscb.jpl.nasa.gov/igscb/station/general/rcvr_ant.tab',
                            value: 'ASH700936B_M'
                        },
                        antennaReferencePoint: {
                            TYPE_NAME: 'GML_3_2_1.CodeType',
                            codeSpace: 'eGeodesy/antennaReferencePoint',
                            value: 'BPA'
                        },
                        markerArpUpEcc: 0,
                        antennaRadomeType: {
                            TYPE_NAME: 'GEODESYML_0_5.IgsRadomeModelCodeType',
                            codeSpace: 'eGeodesy/antennaRadomeType',
                            value: 'SNOW'
                        },
                        radomeSerialNumber: '',
                        antennaCableType: '(vendor & type number)',
                        dateInstalled: {
                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                            value: [
                                '1995-01-01T00:00:00.000Z'
                            ]
                        },
                        dateRemoved: {
                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                            value: []
                        }
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
                    TYPE_NAME: 'GEODESYML_0_5.SurveyedLocalTiePropertyType',
                    surveyedLocalTie: {
                        TYPE_NAME: 'GEODESYML_0_5.SurveyedLocalTieType',
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
                        tiedMarkerUsage: '(SLR/VLBI/LOCAL CONTROL/FOOTPRINT/etc)',
                        tiedMarkerCDPNumber: '(A4)',
                        tiedMarkerDOMESNumber: '(A9)',
                        differentialComponentsGNSSMarkerToTiedMonumentITRS: {
                            TYPE_NAME: 'GEODESYML_0_5.SurveyedLocalTieType.DifferentialComponentsGNSSMarkerToTiedMonumentITRS',
                            dx: 0,
                            dy: 0,
                            dz: 0
                        },
                        localSiteTiesAccuracy: 0,
                        surveyMethod: '(GPS CAMPAIGN/TRILATERATION/TRIANGULATION/etc)',
                        dateMeasured: {
                            TYPE_NAME: 'GML_3_2_1.TimePositionType',
                            value: []
                        },
                        notes: '',
                        extension: {
                            TYPE_NAME: 'AnyType',
                            attributes: {
                                '{http://www.w3.org/2000/xmlns/}xsi': 'http://www.w3.org/2001/XMLSchema-instance',
                                '{http://www.w3.org/2001/XMLSchema-instance}nil': 'true'
                            }
                        }
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
                        notes: 'HP 5071A (S/N - 3249A00660)',
                        extension: {
                            TYPE_NAME: 'AnyType',
                            attributes: {
                                '{http://www.w3.org/2000/xmlns/}xsi': 'http://www.w3.org/2001/XMLSchema-instance',
                                '{http://www.w3.org/2001/XMLSchema-instance}nil': 'true'
                            }
                        }
                    },
                    notes: '',
                    extension: {
                        TYPE_NAME: 'AnyType',
                        attributes: {
                            '{http://www.w3.org/2000/xmlns/}xsi': 'http://www.w3.org/2001/XMLSchema-instance',
                            '{http://www.w3.org/2001/XMLSchema-instance}nil': 'true'
                        }
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
            localEpisodicEffects: [],
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
                        notes: '',
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
                        accuracyHPa: 0
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
                        notes: '',
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
                        accuracyDegreesCelcius: 0,
                        aspiration: '(UNASPIRATED/NATURAL/FAN/etc)'
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
                        notes: '',
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
                        distanceToAntenna: 0
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
            siteContacts: [
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
                            TYPE_NAME: 'ISO19139_GCO_20070417.CharacterStringPropertyType'
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
                                                    'gco:CharacterString': '3838 Vogel Rd., Arnold'
                                                }
                                            },
                                            {
                                                TYPE_NAME: 'ISO19139_GCO_20070417.CharacterStringPropertyType',
                                                characterString: {
                                                    'gco:CharacterString': 'MO 63010-6238, USA'
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
                                            TYPE_NAME: 'ISO19139_GCO_20070417.CharacterStringPropertyType'
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
                                                    'gco:CharacterString': 'Randall.E.Taylor@nga.mil'
                                                }
                                            }
                                        ]
                                    }
                                },
                                onlineResource: {
                                    TYPE_NAME: 'ISO19139_GMD_20070417.CIOnlineResourcePropertyType'
                                },
                                hoursOfService: {
                                    TYPE_NAME: 'ISO19139_GCO_20070417.CharacterStringPropertyType'
                                },
                                contactInstructions: {
                                    TYPE_NAME: 'ISO19139_GCO_20070417.CharacterStringPropertyType'
                                }
                            }
                        },
                        role: {
                            TYPE_NAME: 'ISO19139_GMD_20070417.CIRoleCodePropertyType'
                        }
                    }
                }
            ],
            siteDataCenters: [],
            radioInterferences: [],
            signalObstructions: [],
            multipathSources: [],
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
                reportType: 'NEW'
            },
            siteIdentification: {
                TYPE_NAME: 'GEODESYML_0_5.SiteIdentificationType',
                siteName: 'Australia NGA collocated',
                fourCharacterID: 'ADE1',
                monumentInscription: '',
                iersDOMESNumber: '50109S001',
                cdpNumber: 'n/a',
                monumentDescription: {
                    TYPE_NAME: 'GML_3_2_1.CodeType',
                    codeSpace: 'eGeodesy/monumentDescription',
                    value: 'None'
                },
                heightOfTheMonument: 0,
                monumentFoundation: '(STEEL RODS, CONCRETE BLOCK, ROOF, etc)',
                foundationDepth: 0,
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
                    value: '(BEDROCK/CLAY/CONGLOMERATE/GRAVEL/SAND/etc)'
                },
                bedrockType: '(IGNEOUS/METAMORPHIC/SEDIMENTARY)',
                bedrockCondition: '(FRESH/JOINTED/WEATHERED)',
                fractureSpacing: '(1-10 cm/11-50 cm/51-200 cm/over 200 cm)',
                faultZonesNearby: {
                    TYPE_NAME: 'GML_3_2_1.CodeType',
                    codeSpace: 'eGeodesy/faultZonesNearby',
                    value: '(YES/NO/Name of the zone)'
                },
                distanceActivity: '',
                notes: ''
            },
            siteLocation: {
                TYPE_NAME: 'GEODESYML_0_5.SiteLocationType',
                city: 'Salisbury',
                state: 'South Australia',
                countryCodeISO: {
                    TYPE_NAME: 'GEODESYML_0_5.CountryCodeType',
                    codeSpace: 'country',
                    value: 'Australia'
                },
                tectonicPlate: {
                    TYPE_NAME: 'GML_3_2_1.CodeType',
                    codeSpace: 'eGeodesy/tectonicPlate',
                    value: 'Australian'
                },
                approximatePositionITRF: {
                    TYPE_NAME: 'GEODESYML_0_5.SiteLocationType.ApproximatePositionITRF',
                    cartesianPosition: {
                        TYPE_NAME: 'GEODESYML_0_5.CartesianPosition',
                        point: {
                            TYPE_NAME: 'GML_3_2_1.PointType',
                            srsName: 'EPSG:7789',
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
                            pos: {
                                TYPE_NAME: 'GML_3_2_1.DirectPositionType',
                                value: [
                                    -3939182.131,
                                    3467075.376,
                                    -3613220.824
                                ]
                            },
                            coordinates: {
                                TYPE_NAME: 'GML_3_2_1.CoordinatesType',
                                value: ''
                            }
                        }
                    },
                    geodeticPosition: {
                        TYPE_NAME: 'GEODESYML_0_5.GeodeticPosition',
                        point: {
                            TYPE_NAME: 'GML_3_2_1.PointType',
                            srsName: 'EPSG:7789',
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
                            pos: {
                                TYPE_NAME: 'GML_3_2_1.DirectPositionType',
                                value: [
                                    11.66,
                                    66.99,
                                    99.11
                                ]
                            },
                            coordinates: {
                                TYPE_NAME: 'GML_3_2_1.CoordinatesType',
                                value: ''
                            }
                        }
                    }
                },
                notes: ''
            },
            siteOwner: {
                TYPE_NAME: 'GEODESYML_0_5.AgencyPropertyType'
            },
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
                            'gco:CharacterString': 'James C Berra'
                        }
                    },
                    organisationName: {
                        TYPE_NAME: 'ISO19139_GCO_20070417.CharacterStringPropertyType',
                        characterString: {
                            'gco:CharacterString': 'National Geospatial-Intelligence Agency'
                        }
                    },
                    positionName: {
                        TYPE_NAME: 'ISO19139_GCO_20070417.CharacterStringPropertyType'
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
                                                'gco:CharacterString': '3838 Vogel Rd., Arnold, MO 63010-6238'
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
                                        TYPE_NAME: 'ISO19139_GCO_20070417.CharacterStringPropertyType'
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
                                                'gco:CharacterString': 'James.C.Berra@nga.mil'
                                            }
                                        }
                                    ]
                                }
                            },
                            onlineResource: {
                                TYPE_NAME: 'ISO19139_GMD_20070417.CIOnlineResourcePropertyType'
                            },
                            hoursOfService: {
                                TYPE_NAME: 'ISO19139_GCO_20070417.CharacterStringPropertyType'
                            },
                            contactInstructions: {
                                TYPE_NAME: 'ISO19139_GCO_20070417.CharacterStringPropertyType'
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
                TYPE_NAME: 'GEODESYML_0_5.MoreInformationType',
                dataCenter: [
                    'CDDIS',
                    'SIO'
                ],
                urlForMoreInformation: '',
                siteMap: '(Y or URL)',
                siteDiagram: '(Y or URL)',
                horizonMask: '(Y or URL)',
                monumentDescription: '(Y or URL)',
                sitePictures: '(Y or URL)',
                notes: '',
                antennaGraphicsWithDimensions: '',
                insertTextGraphicFromAntenna: '',
                doi: {
                    TYPE_NAME: 'GML_3_2_1.CodeType',
                    codeSpace: 'eGeodesy/doi',
                    value: 'TODO'
                }
            },
            dataStreams: {
                TYPE_NAME: 'GEODESYML_0_5.DataStreamPropertyType'
            }
        };
    }
}
