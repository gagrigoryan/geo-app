import { IPoint } from "./point";

export interface IPolygon {
  id: string | number;
  points: IPoint[];
  isConvex?: boolean;
}

export type TExpandedPolygon = IPolygon & {
  polarCenter?: IPoint;
  sortedPointsByPolar?: IPoint[];
};
