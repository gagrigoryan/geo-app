import React from "react";
import { IPolygon } from "../domain/entities/polygon";
import { useState } from "react";
import Konva from "konva";
import { IPoint } from "../domain/entities/point";

type LayerPolygonHook = {
  polygon: IPolygon;
  setPolygon: React.Dispatch<React.SetStateAction<IPolygon>>;
  onLayerClick: (event: Konva.KonvaEventObject<MouseEvent>) => void;
};

export const useLayerPolygon = (): LayerPolygonHook => {
  const [polygon, setPolygon] = useState<IPolygon>({
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
