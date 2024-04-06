import { IConnectQCS } from "../enviroment/types";

export interface AbstractConnectionAdapter {
  connect(config: IConnectQCS): Promise<unknown>;
}
