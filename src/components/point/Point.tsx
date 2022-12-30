import Konva from "konva";
import React, { useState } from "react";
import { Circle, Text } from "react-konva";
import { IPoint } from "../../domain/entities/point";
import { getFormattedNumber } from "../../utils/getFormattedNumber";

type PointProps = IPoint & {
  onChange?: (point: IPoint) => void;
  draggable?: boolean;
  color?: string;
};

const Point: React.FC<PointProps> = ({
  x,
  y,
  onChange,
  draggable = true,
  color = "#e57373",
}) => {
  const [isHovered, setHovered] = useState<boolean>(false);

  const onDragMoveHandler = (event: Konva.KonvaEventObject<DragEvent>) => {
    const { x, y } = event.target.attrs;
    onChange?.({ x, y });
  };

  return (
    <>
      {isHovered && (
        <Text
          fontStyle="bold"
          x={x}
          y={y}
          offsetX={28}
          offsetY={24}
          text={`(${getFormattedNumber(x)}, ${getFormattedNumber(y)})`}
          fill={color}
        />
      )}
      <Circle
        x={x}
        y={y}
        stroke={color}
        fill={!isHovered ? color : undefined}
        radius={isHovered ? 6 : 4}
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
        draggable={draggable}
        onDragMove={onDragMoveHandler}
      />
    </>
  );
};

export default Point;
