// Feel free to extend this interface
// depending on your app specific config.
export interface EnvConfig {
  API?: string;
  ENV?: string;
  WEB_SERVICE_URL?: string;
  WFS_GEOSERVER_URL?: string;
  OPENAM_SERVER_URL?: string;
}

export const Config: EnvConfig = JSON.parse('<%= ENV_CONFIG %>');

