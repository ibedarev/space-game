import { Point } from "../Models/Point.mjs";

export class RenderingEngine {
  #container;
  #width;
  #height;
  #canvas;
  #ctx;

  /**
   * @param {HTMLElement} container
   */
  constructor(container, width, height) {
    this.#container = container;
    this.#width = width;
    this.#height = height;

    this.#canvas = document.createElement("canvas");
    this.#ctx = this.#canvas.getContext("2d");
    this.#canvas.classList.add("render-engine-canvas");
    this.#container.appendChild(this.#canvas);
  }

  /**
   *
   * @param {number} width
   * @param {number} height
   */
  setSize(width, height) {
    this.#width = width;
    this.#height = height;
  }

  /**
   *
   * @param {Point[]} data
   */
  render(data) {
    this.#canvas.width = this.#width;
    this.#canvas.height = this.#height;

    for (const point of data) {
      this.#ctx.fillRect(point.x, point.y, point.size, point.size);
    }
    // ...
  }
}
