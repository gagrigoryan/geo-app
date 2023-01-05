import React from "react";
import { Line } from "react-konva";
import { ILine } from "../../domain/entities/line";
import Point from "../point";
import { IPoint } from "../../domain/entities/point";

type VectorLineProps = ILine & {
  onChange?: (line: ILine) => void;
  color?: string;
};

const VectorLine: React.FC<VectorLineProps> = ({
  start,
  finish,
  onChange,
  color = "#e57373",
}) => {
  const onChangeHandler = (newPoint: IPoint, isFinish: boolean = false) => {
    if (isFinish) {
      onChange?.({
        start,
        finish: newPoint,
      });
      return;
    }
    onChange?.({
      start: newPoint,
      finish,
    });
  };

  return (
    <>
      <Line
        points={[start.x, start.y, finish.x, finish.y]}
        stroke={`${color}88`}
        strokeWidth={3}
      />
      <Point
        {...start}
        color={color}
        draggable={!!onChange}
        onChange={onChangeHandler}
      />
      <Point
        {...finish}
        color={color}
        draggable={!!onChange}
        onChange={(point) => onChangeHandler(point, true)}
      />
    </>
  );
};

export default VectorLine;
