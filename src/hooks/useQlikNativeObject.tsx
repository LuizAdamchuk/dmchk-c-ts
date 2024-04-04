import { useEffect, useRef } from "react";
import { QlikApplication } from "src/context/QlikApplicationInstaciationContext";
// --------- Types -------- //

interface QlikModule extends QlikApplication {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  openApp?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  visualization?: any;
}

interface QlikNativeObjectHookProps {
  qlikApplicationIntance: QlikModule | null;
  qlikChartId: string;
  referenceForDisplayChart: React.RefObject<HTMLDivElement>;
}

interface QlikVisualization {
  show: (element: HTMLElement) => void;
  close: () => void;
  // Adicione outros métodos e propriedades conforme necessário
}

// --------- Types -------- //

const useQlikNativeObject = ({
  qlikApplicationIntance,
  qlikChartId,
  referenceForDisplayChart,
}: QlikNativeObjectHookProps) => {
  const visRef = useRef<QlikVisualization | null>(null);

  useEffect(() => {
    if (qlikApplicationIntance && qlikChartId) {
      qlikApplicationIntance.visualization
        .get(qlikChartId)
        .then((vis: QlikVisualization) => {
          if (vis !== undefined && referenceForDisplayChart.current) {
            visRef.current = vis;
            vis.show(referenceForDisplayChart.current);
          }
        })
        .catch((error: unknown) => {
          console.error(error, `object id: ${qlikChartId}`);
        });
      return () => {
        if (visRef.current?.close) {
          visRef.current.close();
        }
      };
    }
  }, [qlikApplicationIntance, qlikChartId, referenceForDisplayChart]);
};

export { useQlikNativeObject };
