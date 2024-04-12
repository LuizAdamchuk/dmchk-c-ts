/* eslint-disable @typescript-eslint/no-explicit-any */
import { IConnectQCS } from "../module/qlilk";

export interface AbstractConnectionAdapter {
  connect(config: IConnectQCS): Promise<unknown>;
}
