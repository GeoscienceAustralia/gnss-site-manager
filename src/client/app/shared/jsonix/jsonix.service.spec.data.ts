export class JsonServiceSpecData {
    /**
     * This returns valid JSON object that can be used to modify as required.
     *
     * @return valid JSON object for a siteLog data Model
     */
    public static data(): any {
        return {
            'geo:siteLog': {
                humiditySensors: [
                    {
                        dateDeleted: {
                            value: [
                                null
                            ]
                        },
                        dateInserted: {
                            value: [
                                null
                            ]
                        },
                        deletedReason: null,
                        humiditySensor: {
                            validTime: {
                                abstractTimePrimitive: {
                                    'gml:TimePeriod': {
                                        beginPosition: {
                                            value: [
                                                null
                                            ]
                                        },
                                        endPosition: {
                                            value: [
                                                null
                                            ]
                                        }
                                    }
                                }
                            },
                            calibrationDate: {
                                value: [
                                    null
                                ]
                            },
                            dataSamplingInterval: 0,
                            accuracyPercentRelativeHumidity: 0,
                            aspiration: '(UNASPIRATED/NATURAL/FAN/etc)',
                            notes: '(multiple lines)',
                            manufacturer: 'Vaisala',
                            serialNumber: 'P2240006',
                            heightDiffToAntenna: 0
                        }
                    }
                ],
                gnssReceivers: [
                    {
                        dateDeleted: {
                            value: [
                                null
                            ]
                        },
                        dateInserted: {
                            value: [
                                null
                            ]
                        },
                        deletedReason: null,
                        gnssReceiver: {
                            igsModelCode: {
                                value: null
                            },
                            manufacturerSerialNumber: null,
                            firmwareVersion: null,
                            satelliteSystem: [
                                {
                                    value: null
                                }
                            ],
                            elevationCutoffSetting: 0,
                            temperatureStabilization: null,
                            dateInstalled: {
                                value: [
                                    '2017-05-29T03:48:31.000Z'
                                ]
                            },
                            dateRemoved: {
                                value: [
                                    null
                                ]
                            },
                            notes: null
                        }
                    },
                    {
                        dateDeleted: {
                            value: [
                                null
                            ]
                        },
                        dateInserted: {
                            value: [
                                null
                            ]
                        },
                        deletedReason: null,
                        gnssReceiver: {
                            igsModelCode: {
                                value: 'ASHTECH Z-XII3'
                            },
                            manufacturerSerialNumber: '3213',
                            firmwareVersion: '1Y07-1DY4',
                            satelliteSystem: [
                                {
                                    value: 'GPS'
                                }
                            ],
                            elevationCutoffSetting: 0,
                            temperatureStabilization: 0,
                            dateInstalled: {
                                value: [
                                    '2000-08-01T00:00:00.000Z'
                                ]
                            },
                            dateRemoved: {
                                value: [
                                    '2017-05-29T03:48:31.000Z'
                                ]
                            },
                            notes: 'Receiver 1'
                        }
                    },
                    {
                        dateDeleted: {
                            value: [
                                null
                            ]
                        },
                        dateInserted: {
                            value: [
                                null
                            ]
                        },
                        deletedReason: null,
                        gnssReceiver: {
                            igsModelCode: {
                                value: 'ASHTECH Z-XII3'
                            },
                            manufacturerSerialNumber: '3213',
                            firmwareVersion: '1Y06-1D04',
                            satelliteSystem: [
                                {
                                    value: 'GPS'
                                }
                            ],
                            elevationCutoffSetting: 0,
                            temperatureStabilization: 0,
                            dateInstalled: {
                                value: [
                                    '1998-09-17T00:00:00.000Z'
                                ]
                            },
                            dateRemoved: {
                                value: [
                                    '2000-08-01T00:00:00.000Z'
                                ]
                            },
                            notes: 'Receiver 1'
                        }
                    },
                    {
                        dateDeleted: {
                            value: [
                                null
                            ]
                        },
                        dateInserted: {
                            value: [
                                null
                            ]
                        },
                        deletedReason: null,
                        gnssReceiver: {
                            igsModelCode: {
                                value: 'ASHTECH Z-XII3'
                            },
                            manufacturerSerialNumber: '3213',
                            firmwareVersion: '1Y05-1D04',
                            satelliteSystem: [
                                {
                                    value: 'GPS'
                                }
                            ],
                            elevationCutoffSetting: 0,
                            temperatureStabilization: 0,
                            dateInstalled: {
                                value: [
                                    '1996-01-01T00:00:00.000Z'
                                ]
                            },
                            dateRemoved: {
                                value: [
                                    '1998-09-17T00:00:00.000Z'
                                ]
                            },
                            notes: 'Receiver 1'
                        }
                    },
                    {
                        dateDeleted: {
                            value: [
                                null
                            ]
                        },
                        dateInserted: {
                            value: [
                                null
                            ]
                        },
                        deletedReason: null,
                        gnssReceiver: {
                            igsModelCode: {
                                value: 'ASHTECH Z-XII3'
                            },
                            manufacturerSerialNumber: '3213',
                            firmwareVersion: '1Y04-1D04',
                            satelliteSystem: [
                                {
                                    value: 'GPS'
                                }
                            ],
                            elevationCutoffSetting: 0,
                            temperatureStabilization: 0,
                            dateInstalled: {
                                value: [
                                    '1995-03-20T00:00:00.000Z'
                                ]
                            },
                            dateRemoved: {
                                value: [
                                    '1996-01-01T00:00:00.000Z'
                                ]
                            },
                            notes: 'Receiver 1'
                        }
                    }
                ],
                gnssAntennas: [],
                surveyedLocalTies: [
                    {
                        dateDeleted: {
                            value: [
                                null
                            ]
                        },
                        dateInserted: {
                            value: [
                                null
                            ]
                        },
                        deletedReason: null,
                        surveyedLocalTie: {
                            tiedMarkerName: 'UNK',
                            tiedMarkerUsage: '(SLR/VLBI/LOCAL CONTROL/FOOTPRINT/etc)',
                            tiedMarkerCDPNumber: '(A4)',
                            tiedMarkerDOMESNumber: '(A9)',
                            localSiteTiesAccuracy: 0,
                            surveyMethod: '(GPS CAMPAIGN/TRILATERATION/TRIANGULATION/etc)',
                            differentialComponentsGNSSMarkerToTiedMonumentITRS: {
                                dx: 0,
                                dy: 0,
                                dz: 0
                            },
                            dateMeasured: {
                                value: [
                                    null
                                ]
                            },
                            notes: null
                        }
                    }
                ],
                frequencyStandards: [
                    {
                        dateDeleted: {
                            value: [
                                null
                            ]
                        },
                        dateInserted: {
                            value: [
                                null
                            ]
                        },
                        deletedReason: null,
                        frequencyStandard: {
                            validTime: {
                                abstractTimePrimitive: {
                                    'gml:TimePeriod': {
                                        beginPosition: {
                                            value: [
                                                '2001-08-23T00:00:00.000Z'
                                            ]
                                        },
                                        endPosition: {
                                            value: [
                                                null
                                            ]
                                        }
                                    }
                                }
                            },
                            standardType: {
                                value: 'Cesium / Rcvr 1'
                            },
                            inputFrequency: 0,
                            notes: 'HP 5071A (S/N - 3249A00660)'
                        }
                    }
                ],
                localEpisodicEffects: [],
                pressureSensors: [
                    {
                        dateDeleted: {
                            value: [
                                null
                            ]
                        },
                        dateInserted: {
                            value: [
                                null
                            ]
                        },
                        deletedReason: null,
                        pressureSensor: {
                            validTime: {
                                abstractTimePrimitive: {
                                    'gml:TimePeriod': {
                                        beginPosition: {
                                            value: [
                                                null
                                            ]
                                        },
                                        endPosition: {
                                            value: [
                                                null
                                            ]
                                        }
                                    }
                                }
                            },
                            calibrationDate: {
                                value: [
                                    null
                                ]
                            },
                            dataSamplingInterval: 0,
                            accuracyHPa: 0,
                            notes: null,
                            manufacturer: 'Vaisala',
                            serialNumber: 'P2240006',
                            heightDiffToAntenna: 0
                        }
                    }
                ],
                temperatureSensors: [
                    {
                        dateDeleted: {
                            value: [
                                null
                            ]
                        },
                        dateInserted: {
                            value: [
                                null
                            ]
                        },
                        deletedReason: null,
                        temperatureSensor: {
                            validTime: {
                                abstractTimePrimitive: {
                                    'gml:TimePeriod': {
                                        beginPosition: {
                                            value: [
                                                null
                                            ]
                                        },
                                        endPosition: {
                                            value: [
                                                null
                                            ]
                                        }
                                    }
                                }
                            },
                            calibrationDate: {
                                value: [
                                    null
                                ]
                            },
                            dataSamplingInterval: 0,
                            accuracyDegreesCelcius: 0,
                            notes: null,
                            manufacturer: 'Vaisala',
                            serialNumber: 'P2240006',
                            heightDiffToAntenna: 0,
                            aspiration: null
                        }
                    }
                ],
                waterVaporSensors: [
                    {
                        dateDeleted: {
                            value: [
                                null
                            ]
                        },
                        dateInserted: {
                            value: [
                                null
                            ]
                        },
                        deletedReason: null,
                        waterVaporSensor: {
                            validTime: {
                                abstractTimePrimitive: {
                                    'gml:TimePeriod': {
                                        beginPosition: {
                                            value: [
                                                null
                                            ]
                                        },
                                        endPosition: {
                                            value: [
                                                null
                                            ]
                                        }
                                    }
                                }
                            },
                            calibrationDate: {
                                value: [
                                    null
                                ]
                            },
                            notes: null,
                            manufacturer: null,
                            serialNumber: null,
                            heightDiffToAntenna: 0
                        }
                    }
                ],
                siteContacts: [
                    {
                        dateDeleted: {
                            value: [
                                null
                            ]
                        },
                        dateInserted: {
                            value: [
                                null
                            ]
                        },
                        deletedReason: null,
                        ciResponsibleParty: {
                            individualName: {
                                characterString: {
                                    'gco:CharacterString': 'fff'
                                }
                            },
                            organisationName: {
                                characterString: {
                                    'gco:CharacterString': 'ggg'
                                }
                            },
                            positionName: {
                                characterString: {
                                    'gco:CharacterString': null
                                }
                            },
                            contactInfo: {
                                ciContact: {
                                    address: {
                                        ciAddress: {
                                            deliveryPoint: [
                                                {
                                                    characterString: {
                                                        'gco:CharacterString': null
                                                    }
                                                }
                                            ],
                                            city: {
                                                characterString: {
                                                    'gco:CharacterString': null
                                                },
                                                country: {
                                                    characterString: {
                                                        'gco:CharacterString': null
                                                    }
                                                }
                                            },
                                            administrativeArea: {
                                                characterString: {
                                                    'gco:CharacterString': 'hhh'
                                                }
                                            },
                                            postalCode: {
                                                characterString: {
                                                    'gco:CharacterString': null
                                                }
                                            },
                                            electronicMailAddress: [
                                                {
                                                    characterString: {
                                                        'gco:CharacterString': null
                                                    }
                                                }
                                            ]
                                        }
                                    },
                                    phone: {
                                        ciTelephone: {
                                            voice: [
                                                {
                                                    characterString: {
                                                        'gco:CharacterString': null
                                                    }
                                                }
                                            ],
                                            facsimile: [
                                                {
                                                    characterString: {
                                                        'gco:CharacterString': null
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    },
                    {
                        dateDeleted: {
                            value: [
                                null
                            ]
                        },
                        dateInserted: {
                            value: [
                                null
                            ]
                        },
                        deletedReason: null,
                        ciResponsibleParty: {
                            individualName: {
                                characterString: {
                                    'gco:CharacterString': 'Randall E. Taylor'
                                }
                            },
                            organisationName: {
                                characterString: {
                                    'gco:CharacterString': 'National Geospatial-Intelligence Agency'
                                }
                            },
                            positionName: {
                                characterString: {
                                    'gco:CharacterString': null
                                }
                            },
                            contactInfo: {
                                ciContact: {
                                    address: {
                                        ciAddress: {
                                            deliveryPoint: [
                                                {
                                                    characterString: {
                                                        'gco:CharacterString': '3838 Vogel Rd., Arnold, MO 63010-6238'
                                                    }
                                                }
                                            ],
                                            city: {
                                                characterString: {
                                                    'gco:CharacterString': null
                                                },
                                                country: {
                                                    characterString: {
                                                        'gco:CharacterString': null
                                                    }
                                                }
                                            },
                                            administrativeArea: {
                                                characterString: {
                                                    'gco:CharacterString': 'sss'
                                                }
                                            },
                                            postalCode: {
                                                characterString: {
                                                    'gco:CharacterString': null
                                                }
                                            },
                                            electronicMailAddress: [
                                                {
                                                    characterString: {
                                                        'gco:CharacterString': 'Randall.E.Taylor@nga.mil'
                                                    }
                                                }
                                            ]
                                        }
                                    },
                                    phone: {
                                        ciTelephone: {
                                            voice: [
                                                {
                                                    characterString: {
                                                        'gco:CharacterString': '(314) 676-1223'
                                                    }
                                                }
                                            ],
                                            facsimile: [
                                                {
                                                    characterString: {
                                                        'gco:CharacterString': '(314) 676-3174'
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    }
                ],
                siteDataCenters: [],
                radioInterferences: [],
                signalObstructions: [],
                multipathSources: [],
                TYPE_NAME: {},
                description: {},
                descriptionReference: {},
                identifier: {},
                boundedBy: {},
                atSite: {},
                formInformation: {},
                siteIdentification: {
                    bedrockCondition: '(FRESH/JOINTED/WEATHERED)',
                    bedrockType: '(IGNEOUS/METAMORPHIC/SEDIMENTARY)',
                    cdpNumber: 'n/a',
                    dateInstalled: {
                        value: [
                            '1986-01-01 00:00:00'
                        ]
                    },
                    distanceActivity: null,
                    faultZonesNearby: {
                        value: '(YES/NO/Name of the zone)'
                    },
                    foundationDepth: 0,
                    fourCharacterID: 'ADE1',
                    fractureSpacing: '(1-10 cm/11-50 cm/51-200 cm/over 200 cm)',
                    geologicCharacteristic: {
                        value: '(BEDROCK/CLAY/CONGLOMERATE/GRAVEL/SAND/etc)'
                    },
                    heightOfTheMonument: 0,
                    iersDOMESNumber: '50109S001',
                    markerDescription: 'None',
                    monumentDescription: {
                        value: 'None'
                    },
                    monumentFoundation: '(STEEL RODS, CONCRETE BLOCK, ROOF, etc)',
                    monumentInscription: null,
                    notes: null,
                    siteName: 'A3ee'
                },
                siteLocation: {
                    city: 'Salisbury',
                    state: 'South Australia',
                    countryCodeISO: {
                        value: 'Australia'
                    },
                    tectonicPlate: {
                        value: 'Australian'
                    },
                    notes: null,
                    approximatePositionITRF: {
                        cartesianPosition: {
                            point: {
                                pos: {
                                    value: [
                                        12,
                                        2,
                                        3
                                    ]
                                }
                            }
                        },
                        geodeticPosition: {
                            point: {
                                pos: {
                                    value: [
                                        4,
                                        5,
                                        6
                                    ]
                                }
                            }
                        }
                    }
                },
                siteMetadataCustodian: {
                    dateDeleted: {
                        value: [
                            null
                        ]
                    },
                    dateInserted: {
                        value: [
                            null
                        ]
                    },
                    deletedReason: null,
                    ciResponsibleParty: {
                        individualName: {
                            characterString: {
                                'gco:CharacterString': 'James C Berra'
                            }
                        },
                        organisationName: {
                            characterString: {
                                'gco:CharacterString': 'National Geospatial-Intelligence Agency'
                            }
                        },
                        positionName: {
                            characterString: {
                                'gco:CharacterString': null
                            }
                        },
                        contactInfo: {
                            ciContact: {
                                address: {
                                    ciAddress: {
                                        deliveryPoint: [
                                            {
                                                characterString: {
                                                    'gco:CharacterString': '3838 Vogel Rd., Arnold, MO 63010-6238'
                                                }
                                            }
                                        ],
                                        city: {
                                            characterString: {
                                                'gco:CharacterString': null
                                            },
                                            country: {
                                                characterString: {
                                                    'gco:CharacterString': null
                                                }
                                            }
                                        },
                                        administrativeArea: {
                                            characterString: {
                                                'gco:CharacterString': 'ccc'
                                            }
                                        },
                                        postalCode: {
                                            characterString: {
                                                'gco:CharacterString': null
                                            }
                                        },
                                        electronicMailAddress: [
                                            {
                                                characterString: {
                                                    'gco:CharacterString': 'James.C.Berra@nga.mil'
                                                }
                                            }
                                        ]
                                    }
                                },
                                phone: {
                                    ciTelephone: {
                                        voice: [
                                            {
                                                characterString: {
                                                    'gco:CharacterString': '(314) 676-9140'
                                                }
                                            }
                                        ],
                                        facsimile: [
                                            {
                                                characterString: {
                                                    'gco:CharacterString': '(314) 676-3174'
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    }
                },
                siteDataSource: {
                    dateDeleted: {
                        value: [
                            null
                        ]
                    },
                    dateInserted: {
                        value: [
                            null
                        ]
                    },
                    deletedReason: null,
                    ciResponsibleParty: {
                        individualName: {
                            characterString: {
                                'gco:CharacterString': 'ddd'
                            }
                        },
                        organisationName: {
                            characterString: {
                                'gco:CharacterString': 'ddd'
                            }
                        },
                        positionName: {
                            characterString: {
                                'gco:CharacterString': null
                            }
                        },
                        contactInfo: {
                            ciContact: {
                                address: {
                                    ciAddress: {
                                        deliveryPoint: [
                                            {
                                                characterString: {
                                                    'gco:CharacterString': null
                                                }
                                            }
                                        ],
                                        city: {
                                            characterString: {
                                                'gco:CharacterString': null
                                            },
                                            country: {
                                                characterString: {
                                                    'gco:CharacterString': null
                                                }
                                            }
                                        },
                                        administrativeArea: {
                                            characterString: {
                                                'gco:CharacterString': 'ddd'
                                            }
                                        },
                                        postalCode: {
                                            characterString: {
                                                'gco:CharacterString': null
                                            }
                                        },
                                        electronicMailAddress: [
                                            {
                                                characterString: {
                                                    'gco:CharacterString': null
                                                }
                                            }
                                        ]
                                    }
                                },
                                phone: {
                                    ciTelephone: {
                                        voice: [
                                            {
                                                characterString: {
                                                    'gco:CharacterString': null
                                                }
                                            }
                                        ],
                                        facsimile: [
                                            {
                                                characterString: {
                                                    'gco:CharacterString': null
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
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
                }
            }
        };
    }
}
