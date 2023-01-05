import React, { memo, useEffect, useState } from "react";
import styles from "./segmentIntersection.module.scss";
import CanvasLayer from "../../components/canvas-layer";
import VectorLine from "../../components/vector-line";
import { ILine } from "../../domain/entities/line";
import { isLinesIntersected } from "../../utils/isLinesIntersected";
import clsx from "clsx";

const firstLineData: ILine = {
  start: { x: 420, y: 320 },
  finish: { x: 260, y: 468 },
};

const secondLineData: ILine = {
  start: { x: 520, y: 140 },
  finish: { x: 680, y: 380 },
};

const SegmentIntersection: React.FC = () => {
  const [firstLine, setFirstLine] = useState<ILine>(firstLineData);
  const [secondLine, setSecondLine] = useState<ILine>(secondLineData);
  const [isIntersected, setIntersected] = useState<boolean>(false);

  useEffect(() => {
    setIntersected(isLinesIntersected(firstLine, secondLine));
  }, [firstLine, secondLine]);

  return (
    <main
      className={clsx(
        styles.container,
        isIntersected && styles.containerSuccess
      )}
    >
      <div className={styles.actionWrapper}>
        <div className={styles.inputWrapper}>
          <label className={styles.inputContainer}>
            Ax
            <input
              className={styles.input}
              type="number"
              min={0}
              value={firstLine.start.x}
              onChange={({ target }) =>
                setFirstLine({
                  ...firstLine,
                  start: { ...firstLine.start, x: target.valueAsNumber },
                })
              }
            />
          </label>
          <label className={styles.inputContainer}>
            Ay
            <input
              className={styles.input}
              type="number"
              min={0}
              value={firstLine.start.y}
              onChange={({ target }) =>
                setFirstLine({
                  ...firstLine,
                  start: { ...firstLine.start, y: target.valueAsNumber },
                })
              }
            />
          </label>
          <label className={styles.inputContainer}>
            Bx
            <input
              className={styles.input}
              type="number"
              min={0}
              value={firstLine.finish.x}
              onChange={({ target }) =>
                setFirstLine({
                  ...firstLine,
                  finish: { ...firstLine.finish, x: target.valueAsNumber },
                })
              }
            />
          </label>
          <label className={styles.inputContainer}>
            By
            <input
              className={styles.input}
              type="number"
              min={0}
              value={firstLine.finish.y}
              onChange={({ target }) =>
                setFirstLine({
                  ...firstLine,
                  finish: { ...firstLine.finish, y: target.valueAsNumber },
                })
              }
            />
          </label>
        </div>
        <div className={styles.inputWrapper}>
          <label className={styles.inputContainer}>
            Cx
            <input
              className={styles.input}
              type="number"
              min={0}
              value={secondLine.start.x}
              onChange={({ target }) =>
                setSecondLine({
                  ...secondLine,
                  start: { ...secondLine.start, x: target.valueAsNumber },
                })
              }
            />
          </label>
          <label className={styles.inputContainer}>
            Cy
            <input
              className={styles.input}
              type="number"
              min={0}
              value={secondLine.start.y}
              onChange={({ target }) =>
                setSecondLine({
                  ...secondLine,
                  start: { ...secondLine.start, y: target.valueAsNumber },
                })
              }
            />
          </label>
          <label className={styles.inputContainer}>
            Dx
            <input
              className={styles.input}
              type="number"
              min={0}
              value={secondLine.finish.x}
              onChange={({ target }) =>
                setSecondLine({
                  ...secondLine,
                  finish: { ...secondLine.finish, x: target.valueAsNumber },
                })
              }
            />
          </label>
          <label className={styles.inputContainer}>
            Dy
            <input
              className={styles.input}
              type="number"
              min={0}
              value={secondLine.finish.y}
              onChange={({ target }) =>
                setSecondLine({
                  ...secondLine,
                  finish: { ...secondLine.finish, y: target.valueAsNumber },
                })
              }
            />
          </label>
        </div>
      </div>
      <CanvasLayer>
        <VectorLine {...firstLine} onChange={setFirstLine} />
        <VectorLine {...secondLine} onChange={setSecondLine} color="#1565c0" />
      </CanvasLayer>
    </main>
  );
};

export default memo(SegmentIntersection);
