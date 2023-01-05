import { ILine } from "../domain/entities/line";
import { isPointBelongLine } from "./isPointBelongLine";

export const isLinesIntersected = (
  firstLine: ILine,
  secondLine: ILine
): boolean => {
  const { x: AX, y: AY } = firstLine.start;
  const { x: BX, y: BY } = firstLine.finish;
  const { x: CX, y: CY } = secondLine.start;
  const { x: DX, y: DY } = secondLine.finish;

  const determinate = (BX - AX) * (CY - DY) - (BY - AY) * (CX - DX);
  const determinate1 = (CX - AX) * (CY - DY) - (CY - AY) * (CX - DX);
  const determinate2 = (BX - AX) * (CY - AY) - (BY - AY) * (CX - AX);

  if (determinate === 0) {
    const firstStartBelong = isPointBelongLine(secondLine, firstLine.start);
    const firstFinishBelong = isPointBelongLine(secondLine, firstLine.finish);
    const secondStartBelong = isPointBelongLine(firstLine, secondLine.start);
    const secondFinishBelong = isPointBelongLine(firstLine, secondLine.finish);
    return (
      firstStartBelong ||
      firstFinishBelong ||
      secondStartBelong ||
      secondFinishBelong
    );
  }

  const t = determinate1 / determinate;
  const r = determinate2 / determinate;

  return 0 <= t && t <= 1 && 0 <= r && r <= 1;
};
