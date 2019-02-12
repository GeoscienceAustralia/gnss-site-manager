import { EnvConfig } from './env-config.interface';

const E2EConfig: EnvConfig = {
  ENV: 'E2E',
  WEB_SERVICE_URL: 'https://testgeodesy-webservices.geodesy.ga.gov.au',
  WFS_GEOSERVER_URL: 'https://testgeodesy-geoserver.geodesy.ga.gov.au/geoserver/wfs',
  OPENAM_SERVER_URL: 'https://testgeodesy-openam.geodesy.ga.gov.au/openam',
  CLIENT_URL: 'http://localhost:5555'
};

export = E2EConfig;

