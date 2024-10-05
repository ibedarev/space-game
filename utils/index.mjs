import { Point } from "../Models/Point.mjs";

/**
 *
 * @param {number} x
 * @param {number} dx
 * @param {number} min
 * @param {number} max
 * @returns
 */
export function infinityOverflowPointHandler(x, dx, min, max) {
  x += dx;

  const size = max - min;

  if (x >= max) {
    x = min + ((x - max) % size);
  } else if (x <= min) {
    x = max + ((x - min) % size);
  }

  return x;
}

/**
 *
 * @param {Point} point
 * @param {"x" | "y"} axis
 * @param {number} min
 * @param {number} max
 */
export function limitedOverflowPointHandler(point, axis, min, max) {
  point[axis] += point[`vel${axis.toUpperCase()}`];

  if (point[axis] + point.size >= max) {
    point[axis] = max - point.size;
    point[`vel${axis.toUpperCase()}`] = -point[`vel${axis.toUpperCase()}`];
  } else if (point[axis] - point.size <= min) {
    point[axis] = min + point.size;
    point[`vel${axis.toUpperCase()}`] = -point[`vel${axis.toUpperCase()}`];
  }
}
