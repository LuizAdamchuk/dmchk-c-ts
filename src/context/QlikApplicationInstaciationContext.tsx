/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { useQlikConnection } from "./QlikConnectionContext";

import type {
  AppConfig,
  QlikApplication,
  SaasConfig,
  useQlikApplicationIntanciation,
  Props,
} from "./types";

const QlikApplicationIntanciationContext =
  createContext<useQlikApplicationIntanciation>({
    qlikApplicationIntance: {} as QlikApplication,
    saasConfig: {} as SaasConfig,
    appConfig: {} as AppConfig,
  });

function QlikApplicationIntanciationProvider({ children }: Props) {
  const { qlikModule, saasConfig: qlikConfig, appConfig } = useQlikConnection();

  const [qlikApplicationIntance, setQlikApplicationIntance] =
    useState<QlikApplication | null>(null);

  useEffect(() => {
    const fetchAppInfo = async () => {
      if (qlikModule && qlikConfig && appConfig) {
        const applicationId = appConfig.appId;

        const dataQlikApp = await qlikModule.openApp(applicationId, qlikConfig);

        setQlikApplicationIntance(dataQlikApp);
      }
    };

    fetchAppInfo();
  }, [qlikModule, qlikConfig, appConfig]);

  return (
    <QlikApplicationIntanciationContext.Provider
      value={{
        qlikApplicationIntance: qlikApplicationIntance ?? null,
        saasConfig: qlikConfig,
        appConfig: appConfig,
      }}
    >
      {children}
    </QlikApplicationIntanciationContext.Provider>
  );
}

function useQlikApplicationIntanciation() {
  const context = useContext(QlikApplicationIntanciationContext);

  if (!context) {
    throw new Error(
      "useQlikApplicationIntanciation should be used within a QlikApplicationIntanciationProvider"
    );
  }

  return context;
}

export { QlikApplicationIntanciationProvider, useQlikApplicationIntanciation };
