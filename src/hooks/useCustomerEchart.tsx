import { useEffect, useState } from "react";

import { MatrixParsedOutput, EchartOptionsConfigDTO } from "./types";

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
