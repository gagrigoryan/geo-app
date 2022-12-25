import { IPolygon } from "../domain/entities/polygon";
import { IPoint } from "../domain/entities/point";

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
