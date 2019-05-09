import { EnvConfig } from './env-config.interface';

const E2EConfig: EnvConfig = {
  ENV: 'E2E',
  WEB_SERVICE_URL: 'https://devgeodesy-webservices.geodesy.ga.gov.au',
  WFS_GEOSERVER_URL: 'https://devgeodesy-geoserver.geodesy.ga.gov.au/geoserver/wfs',
  OPENAM_SERVER_URL: 'https://devgeodesy-openam.geodesy.ga.gov.au/openam',
  RECEIVER_ANTENNA_CODE_URL:
    'https://raw.githubusercontent.com/GeoscienceAustralia/GeodesyML/master/codelists/antenna-receiver-codelists.xml',
  CLIENT_URL: 'http://localhost:5555',
  WEB_URL_LINKS: [
    { name: 'AUSCORS', url: 'https://www.auscors.ga.gov.au' },
    { name: 'GNSS Data Repository', url: 'https://dev-data.gnss.ga.gov.au' },
    { name: 'GNSS Portal', url: 'https://portal.gnss.ga.gov.au' },
  ],
};

export = E2EConfig;
