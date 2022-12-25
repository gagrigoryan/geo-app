import React, { memo, useEffect, useState } from "react";
import styles from "./regionalSearch.module.scss";
import CanvasLayer from "../../components/canvas-layer";
import { useLayerPoints } from "../../hooks/useLayerPoints";
import Point from "../../components/point";
import Rectangle from "../../components/rectangle";
import Button from "../../button";
import Konva from "konva";
import { Line } from "react-konva";
import { ILine } from "../../domain/entities/line";
import { getPreparedPoints } from "../../utils/getPreparedPoints";
import { getRectanglesFromPoints } from "../../utils/getRectanglesFromPoints";
import {
  IRectangle,
  TExpandedRectangle,
} from "../../domain/entities/rectangle";
import { getRectanglePoints } from "../../utils/getRectanglePoints";
import { isPointBelongRectangle } from "../../utils/isPointBelongRectangle";
import { IPoint } from "../../domain/entities/point";

enum PageMode {
  CreatePoints = "create_points",
  CreateRectangle = "create_rectangle",
  CalculateRectangles = "calculate_rectangles",
}

const getBelongRectangleQ = (
  rectanglesList: TExpandedRectangle[],
  point: IPoint
): number => {
  const belongedRectangle = rectanglesList.find((rectangle) =>
    isPointBelongRectangle(rectangle, point)
  );
  return belongedRectangle?.q ?? 0;
};

const RegionalSearch: React.FC = () => {
  const [mode, setMode] = useState<PageMode>(PageMode.CreatePoints);
  const [lines, setLines] = useState<ILine[]>([]);
  const { pointList, onLayerClick, onPointChange } = useLayerPoints();
  const [rectangles, setRectangles] = useState<TExpandedRectangle[]>([]);
  const [localeRectangle, setLocaleRectangle] = useState<IRectangle>({
    x: 420,
    y: 320,
    width: 300,
    height: 160,
  });
  const [result, setResult] = useState<number | null>(null);

  const onLayerClickHandler = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (mode === PageMode.CreatePoints) {
      onLayerClick(event);
    }
  };

  const onResetClickHandler = () => {
    setLines([]);
    setRectangles([]);
  };

  const onLinesCreateHandler = () => {
    setMode(PageMode.CalculateRectangles);
    setLines([]);
    setRectangles([]);
    pointList.forEach((point) => {
      setLines((prevState) => [
        ...prevState,
        {
          start: { x: 0, y: point.y },
          finish: { x: window.innerWidth, y: point.y },
        },
        {
          start: { x: point.x, y: 0 },
          finish: { x: point.x, y: window.innerHeight },
        },
      ]);
    });
  };

  const onRectanglesCreateHandler = () => {
    setLines([]);
    setRectangles(getRectanglesFromPoints(pointList));
  };

  const onCalculateClick = () => {
    const [P2, P1, P4, P3] = getRectanglePoints(localeRectangle);
    const Q1 = getBelongRectangleQ(rectangles, P1);
    const Q2 = getBelongRectangleQ(rectangles, P2);
    const Q3 = getBelongRectangleQ(rectangles, P3);
    const Q4 = getBelongRectangleQ(rectangles, P4);
    setResult(Math.abs(Q1 - Q2 - Q4 + Q3));
  };

  useEffect(() => {
    if (result != null) {
      alert(`Result: ${result}`);
    }
  }, [result]);

  return (
    <main className={styles.container}>
      <div className={styles.actionWrapper}>
        {Object.values(PageMode).map((modeItem) => (
          <>
            {modeItem !== PageMode.CalculateRectangles && (
              <Button
                onClick={() => setMode(modeItem)}
                isActive={modeItem === mode}
              >
                {modeItem.split("_").join(" ")}
              </Button>
            )}
          </>
        ))}
        <Button onClick={onLinesCreateHandler} isActive>
          Create Lines
        </Button>
        <Button onClick={onRectanglesCreateHandler} isActive>
          Create Rectangles
        </Button>
        <Button onClick={onResetClickHandler} isActive>
          Reset
        </Button>
        <Button onClick={onCalculateClick} isActive>
          Calculate
        </Button>
      </div>
      <CanvasLayer onClick={onLayerClickHandler}>
        {pointList.map((point, index) => (
          <Point
            draggable={mode === PageMode.CreatePoints}
            onChange={(sourcePoint) => onPointChange(sourcePoint, index)}
            key={index.toString()}
            {...point}
          />
        ))}
        {rectangles.map((rectangle, index) => (
          <Rectangle
            color="#4fc3f7"
            key={index.toString()}
            {...rectangle}
            text={rectangle?.q != null ? `Q = ${rectangle.q}` : undefined}
          />
        ))}
        {mode === PageMode.CreateRectangle && (
          <Rectangle {...localeRectangle} onChange={setLocaleRectangle} />
        )}
        {lines.map((line, index) => (
          <Line
            key={index.toString()}
            points={getPreparedPoints([line.start, line.finish])}
            stroke="#e57373"
          />
        ))}
      </CanvasLayer>
    </main>
  );
};

export default memo(RegionalSearch);
