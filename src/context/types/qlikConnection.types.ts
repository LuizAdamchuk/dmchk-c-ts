import { ReactNode } from "react";

interface SaasConfig {
  host: string;
  prefix: string;
  port: number;
  isSecure: boolean;
  webIntegrationId: string;
}
interface AppIds {
  [key: string]: string;
}

export interface QlikModule {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  openApp: any;
}

export type QlikConnectionProviderProps = {
  children: ReactNode;
};

export type useQlikConnectionProps = {
  qlikModule: QlikModule | null;
  config: SaasConfig;
  appIds: AppIds;
};
