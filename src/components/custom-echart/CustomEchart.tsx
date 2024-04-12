/* eslint-disable react-hooks/rules-of-hooks */
import { memo } from "react";
import ReactECharts from "echarts-for-react";
import { useQlikApplicationIntanciation } from "../../module/qlilk";
import { useQlikHyperCubeFetchData, useCustomEchart } from "../../module/qlilk";
import { ICustomerEchart } from "./types";

const CustomEchart = ({ qlikChartId, echartOptionConfig }: ICustomerEchart) => {
  const { qlikApplicationIntance } = useQlikApplicationIntanciation();

  if (qlikApplicationIntance) {
    const hyperCubeData = useQlikHyperCubeFetchData(
      qlikApplicationIntance,
      qlikChartId
    );

    const echartOptions = useCustomEchart(hyperCubeData, echartOptionConfig);

    if (!echartOptions) {
      return null;
    }

    return <ReactECharts option={echartOptions} />;
  }
};

const MemoizedCustomEchart = memo(CustomEchart, (prevProps, nextProps) => {
  return prevProps.qlikChartId === nextProps.qlikChartId;
});

export { MemoizedCustomEchart };
