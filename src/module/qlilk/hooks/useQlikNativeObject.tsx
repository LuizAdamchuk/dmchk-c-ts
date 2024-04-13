import { useEffect, useRef } from "react";
import { QlikNativeObjectHookProps, QlikVisualization } from "./types";
import { useQlikApplicationIntanciation } from "../context";

const useQlikNativeObject = ({
  qlikChartId,
  referenceForDisplayChart,
}: QlikNativeObjectHookProps) => {
  const { qlikApplicationIntance } = useQlikApplicationIntanciation();

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
