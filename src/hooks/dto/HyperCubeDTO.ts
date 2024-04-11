/* eslint-disable @typescript-eslint/no-explicit-any */

const parseHyperCubeRefLines = (structuredData, data) => {
  if (data.refLines && data.refLines.length > 0) {
    const targets = data.refLines
      .filter((line: any) => line.show)
      .map((line: any) => [
        {
          title: line.label,
          numValue: line.refLineExpr.value,
          strValue: line.refLineExpr.label,
          color: line.paletteColor.color,
        },
      ]);

    structuredData.targets = targets;
  }
};

const parseHyperCubeMeasure = (structuredData, data) => {
  const qStateL = data.qDataPages[0].qMatrix.filter((item: any) =>
    item.some((cell: any) => cell.qState === "L")
  );

  if (data.qMeasureInfo && qStateL.length > 0) {
    structuredData.measures = qStateL.map((item: any) => {
      return item
        .filter((cell: any) => cell.qState === "L")
        .map((cell: any, index: number) => {
          const measureInfo = data.qMeasureInfo[index];
          const colorText =
            cell.qAttrExps?.qValues[0]?.qText ||
            measureInfo?.coloring?.baseColor?.color ||
            "";
          const color =
            colorText.startsWith("RGB") || colorText.startsWith("#")
              ? colorText
              : "RGB(255,255,255)";
          return {
            title: measureInfo?.qFallbackTitle || "Medida " + index,
            numValue: cell.qNum,
            strValue: cell.qText,
            color: color,
          };
        });
    });
  }
};

const parseHyperCubeDimension = (structuredData, data) => {
  const qStateO = data.qDataPages[0].qMatrix.filter((item: any) =>
    item.some((cell: any) => cell.qState === "O" || cell.qState === "S")
  );

  if (data.qDimensionInfo && qStateO.length > 0) {
    structuredData.dimensions = qStateO.map((item: any) => {
      return item
        .filter((cell: any) => cell.qState === "O" || cell.qState === "S")
        .map((cell: any, index: number) => {
          return {
            title:
              data.qDimensionInfo[index]?.qFallbackTitle || "Dimensão " + index,
            numValue: cell.qNum,
            strValue: cell.qText,
          };
        });
    });
  }
};

const hyperCubeOutputDTO = (data: any, props: any) => {
  const structuredData: any = {
    dimensions: [],
    measures: [],
    common: {
      title: props.title,
      subtitle: props.subtitle,
      footnote: props.footnote,
    },
  };

  if (
    !data ||
    !data.qDataPages ||
    data.qDataPages.length === 0 ||
    data.qDataPages[0].qMatrix.length === 0
  ) {
    return structuredData;
  }

  parseHyperCubeDimension(structuredData, data);

  parseHyperCubeMeasure(structuredData, data);

  parseHyperCubeRefLines(structuredData, data);

  return structuredData;
};

export { hyperCubeOutputDTO };
