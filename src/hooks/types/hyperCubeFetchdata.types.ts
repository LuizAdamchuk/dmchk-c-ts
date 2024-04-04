export interface QlikApplication {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAppLayout?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  visualization?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createCube?: any;
}

export interface QFallbackTitle {
  qFallbackTitle: string;
}

export interface IHyperCubeMatrixOutputProps {
  qText: string;
  qNum: string | number;
  qElemNumber: number;
  qState: string;
}

type HyperCubeMatrixOutput = IHyperCubeMatrixOutputProps[][];

export interface QMatrix {
  qMatrix: HyperCubeMatrixOutput;
}

export interface QDataPage {
  qDataPages: QMatrix[];
}

export interface QMatrixInfo extends QDataPage {
  qDimensionInfo: QFallbackTitle[];
  qMeasureInfo: QFallbackTitle[];
}

export interface QHyperCube {
  qHyperCube: QMatrixInfo;
}

export interface Table {
  table: QHyperCube;
}

export interface QlikOutputProps extends Table {}

export interface IHyperCubeMatrixParsed {
  qText: string;
  qNum: string | number;
}

export type MatrixParsedOutput = IHyperCubeMatrixParsed[] | null;
