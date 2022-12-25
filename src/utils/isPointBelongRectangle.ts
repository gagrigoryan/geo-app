import { IRectangle } from "../domain/entities/rectangle";
import { IPoint } from "../domain/entities/point";

export const isPointBelongRectangle = (
  rectangle: IRectangle,
  point: IPoint
): boolean => {
  return (
    rectangle.x <= point.x &&
    point.x <= rectangle.x + rectangle.width &&
    rectangle.y <= point.y &&
    point.y <= rectangle.y + rectangle.height
  );
};
