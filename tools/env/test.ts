import { EnvConfig } from './env-config.interface';

const TestConfig: EnvConfig = {
  ENV: 'TEST',
  WEB_SERVICE_URL: 'https://testgeodesy-webservices.geodesy.ga.gov.au',
  WFS_GEOSERVER_URL: 'https://testgeodesy-geoserver.geodesy.ga.gov.au/geoserver/wfs',
  OPENAM_SERVER_URL: 'https://testgeodesy-openam.geodesy.ga.gov.au/openam',
  RECEIVER_ANTENNA_CODE_URL:
    'https://raw.githubusercontent.com/GeoscienceAustralia/GeodesyML/master/codelists/antenna-receiver-codelists.xml',
  CLIENT_URL: 'https://test.gnss-site-manager.geodesy.ga.gov.au',
  WEB_URL_LINKS: [
    { name: 'AUSCORS', url: 'https://www.auscors.ga.gov.au' },
    { name: 'GNSS Data Repository', url: 'https://test-data.gnss.ga.gov.au' },
    { name: 'GNSS Portal', url: 'https://portal.gnss.ga.gov.au' },
  ],
};

export = TestConfig;
