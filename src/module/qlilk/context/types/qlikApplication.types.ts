/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppConfig, SaasConfig } from "./qlikConnection.types";

export interface QlikApplication {
  getAppLayout: any;
  visualization?: any;
  createCube?: any;
}

export type useQlikApplicationIntanciation = {
  qlikApplicationIntance: QlikApplication | null;
  saasConfig: SaasConfig;
  appConfig: AppConfig;
};
