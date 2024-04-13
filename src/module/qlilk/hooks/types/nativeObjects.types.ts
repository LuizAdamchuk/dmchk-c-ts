import { QlikApplication } from "../../hooks/types";

export interface QlikModule extends QlikApplication {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  openApp?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  visualization?: any;
}

export interface QlikNativeObjectHookProps {
  qlikChartId: string;
  referenceForDisplayChart: React.RefObject<HTMLDivElement>;
}

export interface QlikVisualization {
  show: (element: HTMLElement) => void;
  close: () => void;
  // Adicione outros métodos e propriedades conforme necessário
}
