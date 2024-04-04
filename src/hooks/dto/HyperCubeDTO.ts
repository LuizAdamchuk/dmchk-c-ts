// ---------- Types ---------- //

interface IHyperCubeMatrixOutputProps {
  qText: string;
  qNum: string | number;
  qElemNumber: number;
  qState: string;
}

type HyperCubeMatrixOutput = IHyperCubeMatrixOutputProps[][];

interface IHyperCubeInputProps {
  dimension: string;
  measure: string;
}

// ---------- Types ---------- //

const hyperCubeOutputDTO = (hyperCubeOutput: HyperCubeMatrixOutput) => {
  return hyperCubeOutput.map((subarray) => {
    return {
      qText: subarray[0].qText,
      qNum: subarray[1].qNum,
    };
  });
};

const hyperCubeInputDTO = (hyperCubeInput: IHyperCubeInputProps) => {
  const { dimension, measure } = hyperCubeInput;
  return {
    qDimensions: [
      {
        qDef: {
          qFieldDefs: [`${dimension}`],
        },
      },
    ],
    qMeasures: [
      {
        qDef: {
          qDef: `= ${measure}`,
        },
      },
    ],
    qInitialDataFetch: [{ qTop: 0, qLeft: 0, qWidth: 3, qHeight: 1000 }],
  };
};

export { hyperCubeOutputDTO, hyperCubeInputDTO };
