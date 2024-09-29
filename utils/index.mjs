/**
 *
 * @param {number} x
 * @param {number} dx
 * @param {number} min
 * @param {number} max
 * @returns
 */
export function overflowPointHandler(x, dx, min, max) {
  x += dx;

  const size = max - min;

  if (x >= max) {
    x = min + ((x - max) % size);
  } else if (x <= min) {
    x = max + ((x - min) % size);
  }

  return x;
}

console.log(overflowPointHandler(11, -2, 10, 20));
