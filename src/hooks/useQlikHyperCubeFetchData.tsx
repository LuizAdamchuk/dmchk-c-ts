/* eslint-disable @typescript-eslint/no-explicit-any */
// src/hooks/useQlikVisualization.js
import { useEffect, useState } from "react";
import { hyperCubeOutputDTO } from "./dto";
import { MatrixParsedOutput, QHyperCube, QlikApplication } from "./types";

const useQlikHyperCubeFetchData = (
  qlikApplicationIntance: QlikApplication,
  qlikChartId: string
): MatrixParsedOutput | null => {
  const [matrix, setMatrix] = useState<MatrixParsedOutput | null>(null);
  null;

  const [qHyperCubeDef, setqHyperCubeDef] = useState<string | null>(null);
  const [hyperCubeProps, setHyperCubeProps] = useState<string | null>(null);
  // Pegando as informacoes necessarias do qHyperCube
  useEffect(() => {
    if (qlikApplicationIntance && qlikChartId) {
      qlikApplicationIntance.visualization
        .get(qlikChartId)
        .then((object: any) => {
          object.model
            .getProperties()
            .then((props: any) => {
              setHyperCubeProps(props);
              setqHyperCubeDef(props.qHyperCubeDef);
            })
            .catch((error: any) => {
              return error;
            });
        })
        .catch((error: any) => {
          return error;
        });
    }
  }, [qlikApplicationIntance, qlikChartId]);

  // Criando um cubo para acessas as informacoes
  useEffect(() => {
    const createCube = async () => {
      if (hyperCubeProps) {
        await qlikApplicationIntance.createCube(
          qHyperCubeDef,
          function (reply: QHyperCube) {
            setMatrix(hyperCubeOutputDTO(reply.qHyperCube, hyperCubeProps));
          }
        );
      }
    };

    createCube();
  }, [hyperCubeProps, qlikApplicationIntance, qHyperCubeDef]);

  return matrix;
};

export { useQlikHyperCubeFetchData };
