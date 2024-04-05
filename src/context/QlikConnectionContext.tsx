/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { QlikEngine, QlikConnection } from "../enviroment";
import {
  QlikModule,
  SaasConfig,
  AppConfig,
  useQlikConnectionProps,
  Props,
} from "./types";

const QlikConnectionContext = createContext<useQlikConnectionProps>({
  qlikModule: {} as QlikModule,
  saasConfig: {} as SaasConfig,
  appConfig: {} as AppConfig,
});

function QlikConnectionProvider({ children }: Props) {
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
        saasConfig: QlikConnection.config.saas,
        appConfig: QlikConnection.config.app,
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
