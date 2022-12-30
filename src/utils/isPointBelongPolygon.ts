import { IPolygon, TExpandedPolygon } from "../domain/entities/polygon";
import { IPoint } from "../domain/entities/point";
import { ILine } from "../domain/entities/line";
import {
  getPointPositionRelativeLine,
  PointPosition,
} from "./getPointPositionRelativeLine";

export const isPointBelongPolygon = (
  polygon: IPolygon,
  point: IPoint
): boolean => {
  let result = false;

  const { points } = polygon;
  const { x, y } = point;

  for (let index = 0; index < points.length; ++index) {
    const currentPolygonPoint = points[index];
    const previousPolygonPoint =
      points[(index - 1 + points.length) % points.length];

    if (
      ((currentPolygonPoint.y <= y && y < previousPolygonPoint.y) ||
        (previousPolygonPoint.y <= y && y < currentPolygonPoint.y)) &&
      x >
        ((previousPolygonPoint.x - currentPolygonPoint.x) *
          (y - currentPolygonPoint.y)) /
          (previousPolygonPoint.y - currentPolygonPoint.y) +
          currentPolygonPoint.x
    ) {
      result = !result;
    }
  }

  return result;
};

export const isPointBelongPolygonAngularTest = (
  polygon: TExpandedPolygon,
  point: IPoint
): boolean | null => {
  const { sortedPointsByPolar, polarCenter } = polygon;

  if (!sortedPointsByPolar || !polarCenter) {
    return null;
  }

  let calculatedVector: ILine | null = null;
  const { length } = sortedPointsByPolar;

  for (let index = 0; index < length; ++index) {
    const currentPoint = sortedPointsByPolar[index];
    const nextPoint = sortedPointsByPolar[(index + 1 + length) % length];

    const startLine: ILine = { start: polarCenter, finish: currentPoint };
    const finishLine: ILine = { start: polarCenter, finish: nextPoint };
    const startPointPosition = getPointPositionRelativeLine(startLine, point);
    const finishPointPosition = getPointPositionRelativeLine(finishLine, point);
    if (
      startPointPosition === PointPosition.Right &&
      finishPointPosition === PointPosition.Left
    ) {
      calculatedVector = { start: currentPoint, finish: nextPoint };
      break;
    }
  }

  if (!calculatedVector) {
    return null;
  }

  const resultPointPosition = getPointPositionRelativeLine(
    calculatedVector,
    point
  );

  return resultPointPosition === PointPosition.Right;
};
