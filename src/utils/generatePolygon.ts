import { IPoint } from "../domain/entities/point";
import { IPolygon } from "../domain/entities/polygon";
import { getRandomNumber } from "./getRandomNumber";
import { getRadianFromDegree } from "./getRadianFromDegree";

const getPointPosition = (
  sourcePoint: IPoint,
  angle: number,
  distance: number
): IPoint => {
  const x = sourcePoint.x + distance * Math.cos(angle);
  const y = sourcePoint.y + distance * Math.sin(angle);

  return { x, y };
};

export const generatePolygon = (
  sourcePoint: IPoint,
  minDistance: number = 10,
  maxDistance: number = 100,
  minAngle: number = 1,
  maxAngle: number = 60
): IPolygon => {
  let phi = 0;
  const distance = getRandomNumber(minDistance, maxDistance);
  const firstPoint = getPointPosition(sourcePoint, phi, distance);
  const polygon: IPolygon = {
    id: 1,
    points: [firstPoint],
  };

  while (phi <= 360) {
    const newPhi = getRandomNumber(minAngle, maxAngle);
    const newDistance = getRandomNumber(minDistance, maxDistance);

    phi += newPhi;
    const newPoint = getPointPosition(
      sourcePoint,
      getRadianFromDegree(phi),
      newDistance
    );
    polygon.points.push(newPoint);
  }

  return polygon;
};
