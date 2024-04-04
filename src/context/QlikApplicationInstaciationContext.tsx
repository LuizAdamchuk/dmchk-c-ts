/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { useQlikConnection } from "./QlikConnectionContext";

import {
  AppIds,
  QlikApplication,
  QlikApplicationInstaciationProps,
  SaasConfig,
  useQlikApplicationIntanciation,
} from "./types";

const QlikApplicationIntanciationContext =
  createContext<useQlikApplicationIntanciation>({
    qlikApplicationIntance: {} as QlikApplication,
    config: {} as SaasConfig,
    appIds: {} as AppIds,
  });

function QlikApplicationIntanciationProvider({
  children,
}: QlikApplicationInstaciationProps) {
  const { qlikModule, config: qlikConfig, appIds } = useQlikConnection();

  const [qlikApplicationIntance, setQlikApplicationIntance] =
    useState<QlikApplication | null>(null);

  useEffect(() => {
    const fetchAppInfo = async () => {
      if (qlikModule && qlikConfig && appIds) {
        const dataQlikApp = await qlikModule.openApp(
          appIds.aplicacaoExemplo2,
          qlikConfig
        );

        setQlikApplicationIntance(dataQlikApp);
      }
    };

    fetchAppInfo();
  }, [qlikModule, qlikConfig, appIds]);

  return (
    <QlikApplicationIntanciationContext.Provider
      value={{
        qlikApplicationIntance: qlikApplicationIntance ?? null,
        config: qlikConfig,
        appIds: appIds,
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
