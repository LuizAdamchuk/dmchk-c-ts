// ---------- Types --------- //

interface IHyperCubeMatrixParsed {
  qText: string;
  qNum: string | number;
}

type MatrixParsedOutput = {
  matrix: IHyperCubeMatrixParsed[];
};

// ---------- Types --------- //

const echartOptionsConfigDTO = (optionsConfigs: MatrixParsedOutput) => {
  const { matrix } = optionsConfigs;
  const parsedEchartInput = echartInputDTO(matrix);

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
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
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
        data: [...parsedEchartInput],
      },
    ],
  };
};

// ---- Private Methods ----- //

const echartInputDTO = (echartInput: IHyperCubeMatrixParsed[]) => {
  return echartInput.map((item) => {
    let value = item.qNum;
    if (typeof value === "string") {
      value = parseFloat(value);
    }
    return {
      name: item.qText,
      value: value.toFixed(1),
    };
  });
};

export { echartOptionsConfigDTO };
