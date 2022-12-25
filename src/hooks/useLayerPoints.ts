import React from "react";
import { useState } from "react";
import Konva from "konva";
import { IPoint } from "../domain/entities/point";

type LayerPointsHook = {
  pointList: IPoint[];
  setPointList: React.Dispatch<React.SetStateAction<IPoint[]>>;
  onLayerClick: (event: Konva.KonvaEventObject<MouseEvent>) => void;
  onPointChange: (sourcePoint: IPoint, sourceIndex: number) => void;
};

export const useLayerPoints = (): LayerPointsHook => {
  const [pointList, setPointList] = useState<IPoint[]>([]);

  const onLayerClick = (event: Konva.KonvaEventObject<MouseEvent>) => {
    const point: IPoint = event.target.getRelativePointerPosition();
    setPointList((prevState) => [...prevState, point]);
  };

  const onPointChange = (sourcePoint: IPoint, sourceIndex: number) => {
    setPointList((prevState) =>
      prevState.map((point, index) =>
        index === sourceIndex ? sourcePoint : point
      )
    );
  };

  return {
    pointList,
    setPointList,
    onLayerClick,
    onPointChange,
  };
};
