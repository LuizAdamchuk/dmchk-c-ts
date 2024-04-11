/* eslint-disable @typescript-eslint/no-explicit-any */
// ---------- Types --------- //

// interface IHyperCubeMatrixParsed {
//   qText: string;
//   qNum: string | number;
// }

// type MatrixParsedOutput = {
//   matrix: IHyperCubeMatrixParsed[];
// };

// ---------- Types --------- //

const echartOptionsConfigDTO = (optionsConfigs: any) => {
  console.log(
    "🚀 ~ echartOptionsConfigDTO ~ optionsConfigs:",
    JSON.stringify(optionsConfigs)
  );
  // const { matrix } = optionsConfigs;
  const transformedData = optionsConfigs.matrix.dimensions.map(
    (dimension: any, index: any) => {
      const roundedValue =
        Math.round(optionsConfigs.matrix.measures[index][0].numValue * 100) /
        100;
      return {
        value: roundedValue,
        name: dimension[0].strValue,
      };
    }
  );
  console.log(
    "🚀 ~ echartOptionsConfigDTO ~ transformedData:",
    transformedData
  );

  return {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: {
          borderRadius: 10,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [...transformedData],
      },
    ],
  };
};

// ---- Private Methods ----- //

// const echartInputDTO = (echartInput: IHyperCubeMatrixParsed[]) => {
//   return echartInput.map((item) => {
//     let value = item.qNum;
//     if (typeof value === "string") {
//       value = parseFloat(value);
//     }
//     return {
//       name: item.qText,
//       value: value.toFixed(1),
//     };
//   });
// };

export { echartOptionsConfigDTO };
