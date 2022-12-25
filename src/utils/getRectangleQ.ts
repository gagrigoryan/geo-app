import { IRectangle } from "../domain/entities/rectangle";
import { IPoint } from "../domain/entities/point";

export const getRectangleQ = (
  rectangle: IRectangle,
  pointList: IPoint[]
): number => {
  let result = 0;

  const { x, y } = rectangle;

  pointList.forEach((point) => {
    if (point.x <= x && point.y <= y) {
      result++;
    }
  });

  return result;
};
