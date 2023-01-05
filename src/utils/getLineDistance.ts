import { ILine } from "../domain/entities/line";

export const getLineDistance = (line: ILine): number => {
  const { start, finish } = line;
  return Math.sqrt(
    Math.pow(start.x - finish.x, 2) + Math.pow(start.y - finish.y, 2)
  );
};
