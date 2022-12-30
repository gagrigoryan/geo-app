import React, { memo, useState } from "react";
import styles from "./generatePolygon.module.scss";
import CanvasLayer from "../../components/canvas-layer";
import Button from "../../button";
import { generatePolygon } from "../../utils/generatePolygon";
import { IPolygon } from "../../domain/entities/polygon";
import Polygon from "../../components/polygon";
import { IPoint } from "../../domain/entities/point";
import Konva from "konva";
import Point from "../../components/point";

const GeneratePolygon: React.FC = () => {
  const [minAngle, setMinAngle] = useState<number>(10);
  const [maxAngle, setMaxAngle] = useState<number>(100);
  const [minDistance, setMinDistance] = useState<number>(10);
  const [maxDistance, setMaxDistance] = useState<number>(180);
  const [polygon, setPolygon] = useState<IPolygon | null>(null);
  const [centerPoint, setCenterPoint] = useState<IPoint | null>(null);

  const onGenerateClick = () => {
    const generatedPolygon = generatePolygon(
      centerPoint!,
      minDistance,
      maxDistance,
      minAngle,
      maxAngle
    );
    setPolygon(generatedPolygon);
  };

  const onLayerClick = (event: Konva.KonvaEventObject<MouseEvent>) => {
    setCenterPoint(event.target.getRelativePointerPosition());
  };

  return (
    <main className={styles.container}>
      <div className={styles.actionWrapper}>
        <div className={styles.rangeWrapper}>
          <label className={styles.inputContainer}>
            Distance Min ({minDistance})
            <input
              className={styles.input}
              min={10}
              max={300}
              type="range"
              value={minDistance}
              onChange={({ target }) => setMinDistance(target.valueAsNumber)}
            />
          </label>
          <label className={styles.inputContainer}>
            Distance Max ({maxDistance})
            <input
              className={styles.input}
              min={10}
              max={300}
              type="range"
              value={maxDistance}
              onChange={({ target }) => setMaxDistance(target.valueAsNumber)}
            />
          </label>
        </div>

        <div className={styles.rangeWrapper}>
          <label className={styles.inputContainer}>
            Angle min ({minAngle}&deg;)
            <input
              className={styles.input}
              min={1}
              max={360}
              type="range"
              value={minAngle}
              onChange={({ target }) => setMinAngle(target.valueAsNumber)}
            />
          </label>
          <label className={styles.inputContainer}>
            Angle max ({maxAngle}&deg;)
            <input
              className={styles.input}
              min={1}
              max={360}
              type="range"
              value={maxAngle}
              onChange={({ target }) => setMaxAngle(target.valueAsNumber)}
            />
          </label>
        </div>
        <Button
          disabled={centerPoint == null}
          onClick={onGenerateClick}
          isActive
        >
          Generate
        </Button>
      </div>
      <CanvasLayer onClick={onLayerClick}>
        {polygon != null && <Polygon {...polygon} onChange={setPolygon} />}
        {centerPoint != null && (
          <Point {...centerPoint} color="#78909c" onChange={setCenterPoint} />
        )}
      </CanvasLayer>
    </main>
  );
};

export default memo(GeneratePolygon);
