import { IPoint } from "../domain/entities/point";
import { IPolygon } from "../domain/entities/polygon";
import { getRandomNumber } from "./getRandomNumber";
import { getRadianFromDegree } from "./getRadianFromDegree";
import { ILine } from "../domain/entities/line";
import {
  getPointPositionRelativeLine,
  PointPosition,
} from "./getPointPositionRelativeLine";

const getPointPosition = (
  sourcePoint: IPoint,
  angle: number,
  distance: number
): IPoint => {
  const x = sourcePoint.x + distance * Math.cos(angle);
  const y = sourcePoint.y + distance * Math.sin(angle);

  return { x, y };
};

const generateNewPoint = (
  sourcePoint: IPoint,
  phi: number,
  minDistance: number,
  maxDistance: number,
  minAngle: number,
  maxAngle: number
): { point: IPoint; angle: number } => {
  const distance = getRandomNumber(minDistance, maxDistance);
  const angle = getRandomNumber(minAngle, maxAngle);

  return {
    point: getPointPosition(
      sourcePoint,
      getRadianFromDegree(phi + angle),
      distance
    ),
    angle: phi + angle,
  };
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

  while (phi < 360) {
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

export const generateConvexPolygon = (
  sourcePoint: IPoint,
  minDistance: number = 10,
  maxDistance: number = 100,
  minAngle: number = 1,
  maxAngle: number = 60
): IPolygon => {
  let phi = 0;
  const distance = getRandomNumber(minDistance, maxDistance);
  const firstPoint = getPointPosition(sourcePoint, phi, distance);
  const { point: secondPoint, angle } = generateNewPoint(
    sourcePoint,
    phi,
    minDistance,
    maxDistance,
    minAngle,
    maxAngle
  );
  phi = angle;
  const pointList: IPoint[] = [firstPoint, secondPoint];

  const p1p2: ILine = { start: firstPoint, finish: secondPoint };

  while (phi <= 360) {
    const { point: newPoint, angle: newAngle } = generateNewPoint(
      sourcePoint,
      phi,
      minDistance,
      maxDistance,
      minAngle,
      maxAngle
    );

    const lastPoint = pointList[pointList.length - 1];

    const pnp1: ILine = {
      start: lastPoint,
      finish: firstPoint,
    };

    const firstPosition = getPointPositionRelativeLine(p1p2, newPoint);
    const secondPosition = getPointPositionRelativeLine(pnp1, newPoint);

    if (
      firstPosition !== PointPosition.Right ||
      secondPosition !== PointPosition.Left
    ) {
      if (pointList.length <= 3) {
        continue;
      }
      break;
    }

    phi = newAngle;
    pointList.push(newPoint);
  }

  return {
    id: 1,
    points: pointList,
  };
};
