import { IRectangle, TExpandedRectangle } from "../domain/entities/rectangle";
import { IPoint } from "../domain/entities/point";

export const getRectanglePoints = (
  rectangle: IRectangle | TExpandedRectangle
): IPoint[] => {
  const { x, y, width, height } = rectangle;
  const points: IPoint[] = [{ x, y }];

  points.push({ x: x + width, y });
  points.push({ x: x + width, y: y + height });
  points.push({ x: x, y: y + height });

  return points;
};
