// src/hooks/useQlikVisualization.js
import { useEffect, useState } from "react";
import { hyperCubeInputDTO, hyperCubeOutputDTO } from "./dto";
import {
  MatrixParsedOutput,
  QHyperCube,
  QlikApplication,
  QlikOutputProps,
} from "./types";

const useQlikHyperCubeFetchData = (
  qlikApplicationIntance: QlikApplication,
  qlikChartId: string
): MatrixParsedOutput | null => {
  const [matrix, setMatrix] = useState<MatrixParsedOutput | null>(null);
  null;
  const [dimension, setDimension] = useState<string | null>(null);
  const [measure, setMeasure] = useState<string | null>(null);

  // Pegando as informacoes necessarias do qHyperCube
  useEffect(() => {
    if (qlikApplicationIntance && qlikChartId) {
      qlikApplicationIntance.visualization
        .get(qlikChartId)
        .then((vis: QlikOutputProps) => {
          setDimension(vis.table.qHyperCube.qDimensionInfo[0].qFallbackTitle);
          setMeasure(vis.table.qHyperCube.qMeasureInfo[0].qFallbackTitle);
        })
        .catch((error: unknown) => {
          console.error(error, `object id: ${qlikChartId}`);
        });
    }
  }, [qlikApplicationIntance, qlikChartId]);

  // Criando um cubo para acessas as informacoes
  useEffect(() => {
    const createCube = async () => {
      if (dimension && measure) {
        const hyperCubeInputParser = hyperCubeInputDTO({ dimension, measure });

        await qlikApplicationIntance.createCube(
          hyperCubeInputParser,
          function (reply: QHyperCube) {
            // Retrieving hyperCube data
            const parsedhyperCubeOutputDTO = hyperCubeOutputDTO(
              reply.qHyperCube.qDataPages[0].qMatrix
            );
            setMatrix(parsedhyperCubeOutputDTO);
          }
        );
        setDimension(null);
        setMeasure(null);
      }
    };

    createCube();
  }, [dimension, measure, qlikApplicationIntance]);

  return matrix;
};

export { useQlikHyperCubeFetchData };
