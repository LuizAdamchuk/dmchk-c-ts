/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppConfig, SaasConfig } from "./qlikConnection.types";

export interface QlikApplication {
  getAppLayout: any;
}

export type useQlikApplicationIntanciation = {
  qlikApplicationIntance: QlikApplication | null;
  saasConfig: SaasConfig;
  appConfig: AppConfig;
};
