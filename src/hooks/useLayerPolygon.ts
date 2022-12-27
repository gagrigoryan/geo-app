import React from "react";
import { IPolygon } from "../domain/entities/polygon";
import { useState } from "react";
import Konva from "konva";
import { IPoint } from "../domain/entities/point";

type LayerPolygonHook<T extends IPolygon> = {
  polygon: T;
  setPolygon: React.Dispatch<React.SetStateAction<T>>;
  onLayerClick: (event: Konva.KonvaEventObject<MouseEvent>) => void;
};

export const useLayerPolygon = <T extends IPolygon>(): LayerPolygonHook<T> => {
  const [polygon, setPolygon] = useState<T>({
    // @ts-ignore
    id: 1,
    points: [],
  });

  const onLayerClick = (event: Konva.KonvaEventObject<MouseEvent>) => {
    const point: IPoint = event.target.getRelativePointerPosition();
    setPolygon((prevState) => ({
      ...prevState,
      points: [...prevState.points, point],
    }));
  };

  return {
    polygon,
    setPolygon,
    onLayerClick,
  };
};
