import React, { useEffect, useRef, useState } from "react";
import { Rect, Text, Transformer } from "react-konva";
import { IRectangle } from "../../domain/entities/rectangle";
import Konva from "konva";

type RectangleProps = IRectangle & {
  color?: string;
  text?: string;
  onChange?: (rectangle: IRectangle) => void;
};

const Rectangle: React.FC<RectangleProps> = ({
  x,
  y,
  width,
  height,
  color = "#e57373",
  text,
  onChange,
}) => {
  const rectangleRef = useRef<Konva.Rect | null>(null);
  const transformerRef = useRef<Konva.Transformer | null>(null);
  const [isSelected, setSelected] = useState<boolean>(false);

  const onTransformEndHandler = (event: Konva.KonvaEventObject<Event>) => {
    const rectangle = rectangleRef.current;
    if (!rectangle) {
      return;
    }

    const { x: newX, y: newY, scaleX, scaleY } = event.currentTarget.attrs;

    rectangle.scaleX(1);
    rectangle.scaleY(1);

    onChange?.({
      x: newX,
      y: newY,
      width: width * scaleX,
      height: height * scaleY,
    });
  };

  const onDragEndHandler = (event: Konva.KonvaEventObject<DragEvent>) => {
    const { x: newX, y: newY } = event.currentTarget.attrs;
    onChange?.({
      x: newX,
      y: newY,
      width,
      height,
    });
  };

  useEffect(() => {
    const rectangle = rectangleRef.current;
    const transformer = transformerRef.current;
    if (!isSelected || !rectangle || !transformer) {
      return;
    }
    transformer.nodes([rectangle]);
    transformer.getLayer()?.batchDraw();
  }, [isSelected, rectangleRef, transformerRef]);

  return (
    <>
      {!!text && (
        <Text
          fontStyle="bold"
          x={x + width / 2}
          y={y + height / 2}
          text={text}
          fill="black"
        />
      )}
      <Rect
        ref={rectangleRef}
        x={x}
        y={y}
        width={width}
        height={height}
        stroke={color}
        fill={`${color}40`}
        draggable
        onClick={() => setSelected(!isSelected)}
        onTransformEnd={onTransformEndHandler}
        onDragEnd={onDragEndHandler}
      />
      {isSelected && <Transformer ref={transformerRef} rotateEnabled={false} />}
    </>
  );
};

export default Rectangle;
