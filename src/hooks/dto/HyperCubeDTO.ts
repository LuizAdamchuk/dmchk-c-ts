import { IHyperCubeInputProps, IHyperCubeMatrixOutputProps } from "../types";

const hyperCubeOutputDTO = (
  hyperCubeOutput: IHyperCubeMatrixOutputProps[][]
) => {
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
