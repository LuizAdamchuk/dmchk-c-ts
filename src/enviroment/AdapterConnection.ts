import { AbstractConnectionAdapter } from "src/AbstractMethods";
import { QlikEngine } from "./QlikEngine";
import { IConnectQCS } from "./types";

class AdapterConnection implements AbstractConnectionAdapter {
  private qlikEngine: typeof QlikEngine;

  constructor() {
    this.qlikEngine = QlikEngine;
  }

  async connect(config: IConnectQCS): Promise<unknown> {
    try {
      return await this.qlikEngine.connectQCS(config);
    } catch (error) {
      console.error("Failed to connect to Qlik Engine", error);
      throw error;
    }
  }
}
export { AdapterConnection };
