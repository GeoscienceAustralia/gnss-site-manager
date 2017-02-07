import {EnvConfig} from './env-config.interface';

const LocalConfig: EnvConfig = {
    ENV: 'LOCAL',
    WEB_SERVICE_URL: 'http://localhost:8081',
    WFS_GEOSERVER_URL: 'http://localhost:8082/wfs',
    OPENAM_SERVER_URL: 'http://localhost:8083/openam'
};

export = LocalConfig;

