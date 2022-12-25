export interface IRectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type TExpandedRectangle = IRectangle & {
  q?: number;
};
