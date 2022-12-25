import React from "react";
import { IPolygon } from "../../domain/entities/polygon";
import { Line } from "react-konva";
import { getPreparedPoints } from "../../utils/getPreparedPoints";
import Point from "../point";
import { IPoint } from "../../domain/entities/point";

type PolygonProps = IPolygon & {
  onChange?: (polygon: IPolygon) => void;
};

const Polygon: React.FC<PolygonProps> = ({ id, points, onChange }) => {
  const onPointChangeHandler = (sourcePoint: IPoint, sourceIndex: number) => {
    onChange?.({
      id,
      points: points.map((point, index) =>
        index === sourceIndex ? sourcePoint : point
      ),
    });
  };

  return (
    <>
      <Line
        points={getPreparedPoints(points)}
        closed
        stroke="#e57373"
        fill="#c3c7cc40"
      />
      {points.map((point, index) => (
        <Point
          onChange={(sourcePoint) => onPointChangeHandler(sourcePoint, index)}
          key={index.toString()}
          {...point}
        />
      ))}
    </>
  );
};

export default Polygon;
