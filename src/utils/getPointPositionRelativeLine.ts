import { ILine } from "../domain/entities/line";
import { IPoint } from "../domain/entities/point";

export enum PointPosition {
  Left = "left",
  Right = "right",
}

export const getPointPositionRelativeLine = (
  line: ILine,
  point: IPoint
): PointPosition => {
  const { start, finish } = line;
  const isRight: boolean =
    (finish.x - start.x) * (point.y - start.y) -
      (finish.y - start.y) * (point.x - start.x) >
    0;
  return isRight ? PointPosition.Right : PointPosition.Left;
};
