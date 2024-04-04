import { useEffect, useState } from "react";

// ---------- Types --------- //

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EchartOptionsConfigDTO = any;

interface IHyperCubeMatrixParsed {
  qText: string;
  qNum: string | number;
}

type MatrixParsedOutput = IHyperCubeMatrixParsed[] | null;

// ---------- Types --------- //

const useCustomEchart = (
  matrix: MatrixParsedOutput,
  echartOptionsConfigDTO: EchartOptionsConfigDTO
) => {
  const [echartOptions, setEchartOptions] = useState(null);

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Parseando os dados vindos do hyperCube para a lib Echarts
  useEffect(() => {
    if (matrix) {
      setEchartOptions(echartOptionsConfigDTO({ matrix }));
      setIsDataLoaded(true);
    }
  }, [matrix, echartOptionsConfigDTO]);

  return isDataLoaded && echartOptions;
};

export { useCustomEchart };
