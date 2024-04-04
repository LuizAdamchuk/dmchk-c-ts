export interface IConnectQCS {
  host: string;
  prefix: string;
  port: number;
  isSecure: boolean;
  webIntegrationId: string;
}

export interface IUser {
  name: string;
}

export interface IQlik {
  openApp: (id: string) => Promise<unknown>;
}
