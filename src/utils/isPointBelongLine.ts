import { ILine } from "../domain/entities/line";
import { IPoint } from "../domain/entities/point";
import { getLineDistance } from "./getLineDistance";

export const isPointBelongLine = (line: ILine, point: IPoint): boolean => {
  const { start, finish } = line;
  const startPointDistance = getLineDistance({
    start,
    finish: point,
  });
  const finishPointDistance = getLineDistance({ start: point, finish });
  const lineDistance = getLineDistance(line);

  return startPointDistance + finishPointDistance === lineDistance;
};
