import { Controls } from "./Controls.mjs";
import { Point } from "../Models/Point.mjs";
import { RenderingEngine } from "./RenderingEngine.mjs";

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
    this.#tickTimeoutId = setInterval(
      this.#tick.bind(this),
      this.#controls.speed
    );
  }

  #onWindowResize() {
    this.#renderEngine.setSize(window.innerWidth, window.innerHeight);
  }

  #tick() {
    for (const point of this.#points) {
      point.x += point.velX;
      point.y += point.velY;
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
