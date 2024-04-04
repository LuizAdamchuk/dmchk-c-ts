import { useEffect, useState } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";

import { useQlikApplicationIntanciation } from "../context";

import {
  MemoizedNativeObject,
  MemoizedCustomEchart,
  echartOptionsConfigDTO,
} from "../components";

const ExamplePage = () => {
  const { qlikApplicationIntance, appIds } = useQlikApplicationIntanciation();
  const [loading, setLoading] = useState(true);

  const layouts = {
    lg: [
      { i: "1", x: 0, y: 0, w: 12, h: 8 },
      { i: "2", x: 0, y: 1, w: 12, h: 8 },
      { i: "3", x: 0, y: 2, w: 12, h: 8 },
      { i: "4", x: 0, y: 3, w: 12, h: 8 },
    ],
    md: [
      { i: "1", x: 0, y: 0, w: 6, h: 2 },
      { i: "2", x: 6, y: 0, w: 6, h: 2 },
      { i: "3", x: 0, y: 2, w: 6, h: 2 },
      { i: "4", x: 0, y: 3, w: 12, h: 8 },
    ],
    sm: [
      { i: "1", x: 0, y: 0, w: 12, h: 2 },
      { i: "2", x: 0, y: 2, w: 12, h: 2 },
      { i: "3", x: 0, y: 4, w: 12, h: 2 },
      { i: "4", x: 0, y: 6, w: 12, h: 8 },
    ],
    xs: [
      { i: "1", x: 0, y: 0, w: 12, h: 2 },
      { i: "2", x: 0, y: 2, w: 12, h: 2 },
      { i: "3", x: 0, y: 4, w: 12, h: 2 },
      { i: "4", x: 0, y: 6, w: 12, h: 8 },
    ],
    xxs: [
      { i: "1", x: 0, y: 0, w: 12, h: 2 },
      { i: "2", x: 0, y: 2, w: 12, h: 2 },
      { i: "3", x: 0, y: 4, w: 12, h: 2 },
      { i: "4", x: 0, y: 6, w: 12, h: 8 },
    ],
  };

  const ResponsiveGridLayout = WidthProvider(Responsive);

  useEffect(() => {
    const fetchAppInfo = async () => {
      if (qlikApplicationIntance) {
        console.log(
          "🚀 ~ fetchAppInfo ~ qlikApplicationIntance:",
          qlikApplicationIntance
        );
        await qlikApplicationIntance.getAppLayout();

        setLoading(false);
      }
    };

    fetchAppInfo();
  }, [qlikApplicationIntance]);

  return (
    <>
      {loading ? (
        <h1 className="text-5xl font-bold underline text-red-400">
          Loading...
        </h1>
      ) : (
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={30}
        >
          <div key="1">
            <MemoizedNativeObject qlikChartId={appIds.chartId2} />
          </div>
          <div key="2">
            <MemoizedCustomEchart
              qlikChartId={appIds.chartId2}
              echartOptionConfig={echartOptionsConfigDTO}
            />
          </div>
        </ResponsiveGridLayout>
      )}
    </>
  );
};
export { ExamplePage };
