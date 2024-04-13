import { memo, useRef } from "react";
import { useQlikNativeObject } from "../../module/qlilk";
import { NativeObjectProps } from "./types";

const NativeObject = ({ qlikChartId }: NativeObjectProps) => {
  const referenceForDisplayChart = useRef<HTMLDivElement | null>(null);

  useQlikNativeObject({
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
