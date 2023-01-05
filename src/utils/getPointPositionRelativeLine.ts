import { ILine } from "../domain/entities/line";
import { IPoint } from "../domain/entities/point";

export enum PointPosition {
  Left = "left",
  Right = "right",
}

export const getPointPositionRelativeLine = (
  line: ILine,
  point: IPoint
): PointPosition | null => {
  const { start, finish } = line;
  const power: number =
    (finish.x - start.x) * (point.y - start.y) -
    (finish.y - start.y) * (point.x - start.x);
  if (power === 0) {
    return null;
  }
  return power > 0 ? PointPosition.Right : PointPosition.Left;
};
