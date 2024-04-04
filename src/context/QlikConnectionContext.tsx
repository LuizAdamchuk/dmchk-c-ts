/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { QlikEngine, QlikConnection } from "../enviroment";
import {
  QlikModule,
  SaasConfig,
  AppIds,
  QlikConnectionProviderProps,
  useQlikConnectionProps,
} from "./types";

// --------- Types -------- //

// --------- Types -------- //

const QlikConnectionContext = createContext<useQlikConnectionProps>({
  qlikModule: {} as QlikModule,
  config: {} as SaasConfig,
  appIds: {} as AppIds,
});

function QlikConnectionProvider({ children }: QlikConnectionProviderProps) {
  const [qlikModule, setQlikModule] = useState<QlikModule | null>(null);

  useEffect(() => {
    QlikEngine.connectQCS(QlikConnection.config.saas).then((qlikModule) => {
      setQlikModule(qlikModule as QlikModule);
    });
  }, []);

  return (
    <QlikConnectionContext.Provider
      value={{
        qlikModule: qlikModule ?? null,
        config: QlikConnection.config.saas,
        appIds: QlikConnection.config.appIds,
      }}
    >
      {children}
    </QlikConnectionContext.Provider>
  );
}

function useQlikConnection() {
  const context = useContext(QlikConnectionContext);

  if (!context) {
    throw new Error(
      "useQlikConnection should be used within a QlikConnectionProvider"
    );
  }

  return context;
}

export { QlikConnectionProvider, useQlikConnection };
