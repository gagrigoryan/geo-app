import { IPoint } from "./point";

export interface IPolygon {
  id: string | number;
  points: IPoint[];
}

export type TExpandedPolygon = IPolygon & {
  polarCenter?: IPoint;
  sortedPointsByPolar?: IPoint[];
};
