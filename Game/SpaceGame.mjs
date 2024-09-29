import { Controls } from "./Controls.mjs";
import { Point } from "../Models/Point.mjs";
import { RenderingEngine } from "./RenderingEngine.mjs";
import { overflowPointHandler } from "../utils/index.mjs";

export class SpaceGame {
  #container;
  #renderEngine;
  #controls;
  #tickTimeoutId;
  /**
   * @type {Point[]}
   */
  #points = [];

  /**
   * @param {HTMLElement} container
   */
  constructor(container) {
    this.#container = container;
    this.#renderEngine = new RenderingEngine(
      container,
      window.innerWidth,
      window.innerHeight
    );
    this.#controls = new Controls(container);

    this.#controls.addEventListener(
      Controls.speedChange,
      this.#scheduleTick.bind(this)
    );

    this.#controls.addEventListener(
      Controls.sizeChange,
      this.#changeSizePoints.bind(this)
    );

    window.addEventListener("resize", this.#onWindowResize.bind(this));
    this.#scheduleTick();
    window.addPoint = this.#addPoint.bind(this);

    Array.from({ length: 100 }).forEach(() => {
      this.#addPoint(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        this.#controls.size
      );
    });
  }

  #scheduleTick() {
    clearInterval(this.#tickTimeoutId);

    const minSpeed = 10;
    const maxSpeed = 1000;
    const speedPercent = this.#controls.speed;
    const currentSpeed =
      maxSpeed - ((maxSpeed - minSpeed) * speedPercent) / 100;

    this.#tickTimeoutId = setInterval(this.#tick.bind(this), currentSpeed);
  }

  #onWindowResize() {
    this.#renderEngine.setSize(window.innerWidth, window.innerHeight);
  }

  #tick() {
    const minX = 0;
    const maxX = window.innerWidth;
    const minY = 0;
    const maxY = window.innerHeight;

    for (const point of this.#points) {
      point.x = overflowPointHandler(point.x, point.velX, minX, maxX);
      point.y = overflowPointHandler(point.y, point.velY, minY, maxY);
    }

    this.#renderEngine.render(this.#points);
  }

  #addPoint(x, y, velX, velY, size) {
    this.#points.push(new Point(x, y, velX, velY, size));
  }

  #changeSizePoints() {
    for (const point of this.#points) {
      point.size = this.#controls.size;
    }
  }
}
