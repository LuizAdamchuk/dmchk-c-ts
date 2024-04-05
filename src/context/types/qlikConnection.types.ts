/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";

export interface SaasConfig {
  host: string;
  prefix: string;
  port: number;
  isSecure: boolean;
  webIntegrationId: string;
}
export interface AppConfig {
  [key: string]: string;
}

export interface QlikModule {
  openApp: any;
}

export type Props = {
  children: ReactNode;
};

export type useQlikConnectionProps = {
  qlikModule: QlikModule | null;
  saasConfig: SaasConfig;
  appConfig: AppConfig;
};
