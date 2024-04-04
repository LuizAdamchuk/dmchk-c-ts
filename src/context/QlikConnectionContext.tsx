/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { QlikEngine, QlikConnection } from "../enviroment";

// --------- Types -------- //

interface SaasConfig {
  host: string;
  prefix: string;
  port: number;
  isSecure: boolean;
  webIntegrationId: string;
}
interface AppIds {
  [key: string]: string;
}

interface QlikModule {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  openApp: any;
}

type QlikConnectionProviderProps = {
  children: ReactNode;
};

type useQlikConnection = {
  qlikModule: QlikModule | null;
  config: SaasConfig;
  appIds: AppIds;
};

// --------- Types -------- //

const QlikConnectionContext = createContext<useQlikConnection>({
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
