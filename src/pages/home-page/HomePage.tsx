import React, { memo, useState } from "react";
import styles from "./homePage.module.scss";
import CanvasLayer from "../../components/canvas-layer";
import Konva from "konva";
import { IPoint } from "../../domain/entities/point";
import Polygon from "../../components/polygon";
import Point from "../../components/point";
import {
  isPointBelongPolygon,
  isPointBelongPolygonAngularTest,
} from "../../utils/isPointBelongPolygon";
import { useLayerPolygon } from "../../hooks/useLayerPolygon";
import Button from "../../button";
import { IPolygon, TExpandedPolygon } from "../../domain/entities/polygon";

enum PageMode {
  CreatePolygon = "create_polygon",
  CreatePoints = "create_points",
}

type PointExpanded = IPoint & {
  isBelong?: boolean;
};

function squaredPolar(point: IPoint, center: IPoint): IPoint {
  return {
    x: Math.atan2(point.y - center.y, point.x - center.x),
    y: (point.x - center.x) ** 2 + (point.y - center.y) ** 2,
  };
}

function polySort(polygon: IPolygon): { points: IPoint[]; center: IPoint } {
  const { points } = polygon;
  let center = {
    x: points.reduce((sum, p) => sum + p.x, 0) / points.length,
    y: points.reduce((sum, p) => sum + p.y, 0) / points.length,
  };

  const result = [...points].sort((a, b) => {
    const firstPolar = squaredPolar(a, center);
    const secondPolar = squaredPolar(b, center);
    return firstPolar.x - secondPolar.x || firstPolar.y - secondPolar.y;
  });
  return {
    points: result,
    center,
  };
}

const HomePage: React.FC = () => {
  const { polygon, setPolygon, onLayerClick } =
    useLayerPolygon<TExpandedPolygon>();
  const [mode, setMode] = useState<PageMode>(PageMode.CreatePolygon);
  const [pointList, setPointList] = useState<PointExpanded[]>([]);

  const onLayerClickHandler = (event: Konva.KonvaEventObject<MouseEvent>) => {
    const point: IPoint = event.target.getRelativePointerPosition();
    if (mode === PageMode.CreatePolygon) {
      onLayerClick(event);
      return;
    }
    setPointList((prevState) => [...prevState, point]);
  };

  const onPointChangeHandler = (sourcePoint: IPoint, sourceIndex: number) => {
    setPointList((prevState) =>
      prevState.map((point, index) =>
        index === sourceIndex ? sourcePoint : point
      )
    );
  };

  const onCheckPointsHandler = () => {
    setPointList((prevState) =>
      prevState.map((point) => ({
        ...point,
        isBelong: isPointBelongPolygon(polygon, point),
      }))
    );
  };

  const onAngularTestHandler = () => {
    const { center, points: sortedPointsByPolar } = polySort(polygon);
    const currentPolygon: TExpandedPolygon = {
      ...polygon,
      polarCenter: center,
      sortedPointsByPolar,
    };
    setPolygon(currentPolygon);

    setPointList(
      pointList.map((point) => ({
        ...point,
        isBelong: isPointBelongPolygonAngularTest(polygon, point) ?? false,
      }))
    );
  };

  return (
    <main className={styles.container}>
      <div className={styles.actionWrapper}>
        {Object.values(PageMode).map((modeItem) => (
          <Button
            onClick={() => setMode(modeItem)}
            isActive={modeItem === mode}
          >
            {modeItem.split("_").join(" ")}
          </Button>
        ))}
        <Button onClick={onCheckPointsHandler} isActive>
          Check Points
        </Button>
        <Button onClick={onAngularTestHandler} isActive>
          Angular Test
        </Button>
      </div>
      <CanvasLayer onClick={onLayerClickHandler}>
        <Polygon onChange={setPolygon} {...polygon} />
        {polygon?.polarCenter && (
          <Point {...polygon.polarCenter} draggable={false} color="#00897b" />
        )}
        {pointList.map((point, index) => (
          <Point
            key={index.toString()}
            color={
              point.isBelong == null
                ? undefined
                : point.isBelong
                ? "#66bb6a"
                : "#4fc3f7"
            }
            {...point}
            onChange={(sourcePoint) => onPointChangeHandler(sourcePoint, index)}
          />
        ))}
      </CanvasLayer>
    </main>
  );
};

export default memo(HomePage);
