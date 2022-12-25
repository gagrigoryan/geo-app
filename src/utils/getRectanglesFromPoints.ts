import { IRectangle, TExpandedRectangle } from "../domain/entities/rectangle";
import { IPoint } from "../domain/entities/point";
import { getRectangleQ } from "./getRectangleQ";

export const getRectanglesFromPoints = (
  points: IPoint[]
): TExpandedRectangle[] => {
  const sortedPointsByX = [
    { x: 0, y: 0 },
    ...points,
    { x: window.innerWidth, y: window.innerHeight },
  ].sort((a, b) => a.x - b.x);
  const sortedPointsByY = [
    { x: 0, y: 0 },
    ...points,
    { x: window.innerWidth, y: window.innerHeight },
  ].sort((a, b) => a.y - b.y);

  const rectangles: TExpandedRectangle[] = [];
  const { length } = points;

  for (let i = 0; i <= length; ++i) {
    const { x } = sortedPointsByX[i];
    for (let j = 0; j <= length; ++j) {
      const { y } = sortedPointsByY[j];
      const rectangle: IRectangle = {
        x,
        y,
        width: sortedPointsByX[i + 1].x - x,
        height: sortedPointsByY[j + 1].y - y,
      };
      rectangles.push({
        ...rectangle,
        q: getRectangleQ(rectangle, points),
      });
    }
  }

  return rectangles;
};
