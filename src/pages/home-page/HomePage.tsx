import React, { memo, useState } from "react";
import styles from "./homePage.module.scss";
import CanvasLayer from "../../components/canvas-layer";
import Konva from "konva";
import { IPoint } from "../../domain/entities/point";
import Polygon from "../../components/polygon";
import Point from "../../components/point";
import clsx from "clsx";
import { isPointBelongPolygon } from "../../utils/isPointBelongPolygon";
import { useLayerPolygon } from "../../hooks/useLayerPolygon";

enum PageMode {
  CreatePolygon = "create_polygon",
  CreatePoints = "create_points",
}

type PointExpanded = IPoint & {
  isBelong?: boolean;
};

const HomePage: React.FC = () => {
  const { polygon, setPolygon, onLayerClick } = useLayerPolygon();
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

  return (
    <main className={styles.container}>
      <div className={styles.actionWrapper}>
        {Object.values(PageMode).map((modeItem) => (
          <button
            onClick={() => setMode(modeItem)}
            className={clsx(
              styles.button,
              modeItem === mode && styles.buttonActive
            )}
          >
            {modeItem.split("_").join(" ")}
          </button>
        ))}
        <button
          onClick={onCheckPointsHandler}
          className={clsx(styles.button, styles.buttonActive)}
        >
          Check Points
        </button>
      </div>
      <CanvasLayer onClick={onLayerClickHandler}>
        <Polygon onChange={setPolygon} {...polygon} />
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