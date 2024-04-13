/* eslint-disable react-hooks/rules-of-hooks */
import { memo } from "react";
import ReactECharts from "echarts-for-react";
import { useQlikHyperCubeFetchData } from "../../module/qlilk";
import { ICustomerEchart } from "./types";
import { useCustomEchart } from "../../hooks";

const CustomEchart = ({ qlikChartId, echartOptionConfig }: ICustomerEchart) => {
  const hyperCubeData = useQlikHyperCubeFetchData(qlikChartId);

  const echartOptions = useCustomEchart(hyperCubeData, echartOptionConfig);

  if (!echartOptions) {
    return null;
  }

  return <ReactECharts option={echartOptions} />;
};

const MemoizedCustomEchart = memo(CustomEchart, (prevProps, nextProps) => {
  return prevProps.qlikChartId === nextProps.qlikChartId;
});

export { MemoizedCustomEchart };
