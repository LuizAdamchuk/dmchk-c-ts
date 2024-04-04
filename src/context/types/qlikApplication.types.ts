import { ReactNode } from "react";

export type QlikApplicationInstaciationProps = {
  children: ReactNode;
};

export interface SaasConfig {
  host: string;
  prefix: string;
  port: number;
  isSecure: boolean;
  webIntegrationId: string;
}
export interface AppIds {
  [key: string]: string;
}

export interface QlikApplication {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAppLayout: any;
}

export type useQlikApplicationIntanciation = {
  qlikApplicationIntance: QlikApplication | null;
  config: SaasConfig;
  appIds: AppIds;
};
