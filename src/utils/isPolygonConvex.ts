import { IPolygon } from "../domain/entities/polygon";
import { ILine } from "../domain/entities/line";
import {
  getPointPositionRelativeLine,
  PointPosition,
} from "./getPointPositionRelativeLine";

export const isPolygonConvex = (polygon: IPolygon): boolean => {
  const isConvex = true;
  const { points } = polygon;
  const { length } = points;

  for (let index = 0; index < length; ++index) {
    const currentPoint = points[index];
    const prevPoint = points[(index - 1 + length) % length];
    const nextPoint = points[(index + 1) % length];

    const line: ILine = { start: prevPoint, finish: currentPoint };
    const pointPosition = getPointPositionRelativeLine(line, nextPoint);

    if (pointPosition === PointPosition.Left) {
      return false;
    }
  }

  return isConvex;
};
