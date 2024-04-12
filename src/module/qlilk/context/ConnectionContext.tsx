/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { AdapterConnection } from "../../../enviroment";
import { QlikConnection } from "../enviroment";
import {
  QlikModule,
  SaasConfig,
  AppConfig,
  useConnectionProps,
  Props,
} from "./types";

const ConnectionContext = createContext<useConnectionProps>({
  qlikModule: {} as QlikModule,
  saasConfig: {} as SaasConfig,
  appConfig: {} as AppConfig,
});
const adapter = new AdapterConnection();

function ConnectionProvider({ children }: Props) {
  const [qlikModule, setQlikModule] = useState<QlikModule | null>(null);

  useEffect(() => {
    adapter.connect(QlikConnection.config.saas).then((qlikModule) => {
      setQlikModule(qlikModule as unknown as QlikModule);
    });
  }, []);

  return (
    <ConnectionContext.Provider
      value={{
        qlikModule: qlikModule ?? null,
        saasConfig: QlikConnection.config.saas,
        appConfig: QlikConnection.config.app,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
}

function useConnection() {
  const context = useContext(ConnectionContext);

  if (!context) {
    throw new Error("useConnection should be used within a ConnectionProvider");
  }

  return context;
}

export { ConnectionProvider, useConnection };
