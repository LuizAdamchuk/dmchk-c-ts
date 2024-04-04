/* eslint-disable react-hooks/rules-of-hooks */
import { memo } from "react";
import ReactECharts from "echarts-for-react";
import { useQlikApplicationIntanciation } from "../../context";
import { useQlikHyperCubeFetchData, useCustomEchart } from "../../hooks";

// ---------- Types -------- //
interface ICustomerEchart {
  qlikChartId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  echartOptionConfig: any;
}
// ---------- Types -------- //

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
