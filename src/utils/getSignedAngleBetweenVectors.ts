import { ILine } from "../domain/entities/line";

const slope = (line: ILine): number => {
  const { start, finish } = line;
  return (finish.y - start.y) / (finish.x - start.x);
};

export const getSignedAngleBetweenVectors = (
  vector1: ILine,
  vector2: ILine
): number => {
  const slope1 = slope(vector1);
  const slope2 = slope(vector2);
  return Math.atan((slope2 - slope1) / (1 + slope2 * slope1));
};
