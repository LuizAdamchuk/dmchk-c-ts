import { memo, useRef } from "react";
import { useQlikApplicationIntanciation } from "../../context";
import { useQlikNativeObject } from "../../hooks";

// --------- Types -------- //

type NativeObjectProps = {
  qlikChartId: string;
};

// --------- Types -------- //

const NativeObject = ({ qlikChartId }: NativeObjectProps) => {
  const { qlikApplicationIntance } = useQlikApplicationIntanciation();

  const referenceForDisplayChart = useRef<HTMLDivElement | null>(null);

  useQlikNativeObject({
    qlikApplicationIntance,
    qlikChartId,
    referenceForDisplayChart,
  });

  return (
    <div
      ref={referenceForDisplayChart}
      style={{
        position: "relative",
        height: "100%",
        width: "100%",
      }}
    >
      <p>Load Native Object</p>
    </div>
  );
};

const MemoizedNativeObject = memo(NativeObject, (prevProps, nextProps) => {
  return prevProps.qlikChartId === nextProps.qlikChartId;
});

export { MemoizedNativeObject };