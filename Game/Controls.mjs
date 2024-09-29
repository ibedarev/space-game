const minSpeed = 0;
const maxSpeed = 100;

export class Controls extends EventTarget {
  static speedChange = "speedChange";
  static sizeChange = "sizeChange";
  #container;

  /**
   * @type {HTMLInputElement}
   */
  #speedSlider;

  /**
   * @type {HTMLInputElement}
   */
  #sizeSlider;

  /**
   * @param {HTMLElement} container
   */
  constructor(container) {
    super();
    this.#container = container;

    this.#initialControls();
  }

  get size() {
    return Number(this.#sizeSlider.value);
  }

  get speed() {
    return Number(this.#speedSlider.value);
  }

  /**
   * @param {number} size
   */
  setSize(size) {
    this.#sizeSlider.value = String(size);
  }

  /**
   * @param {number} speed
   */
  setSpeed(speed) {
    this.#speedSlider.value = String(speed);
  }

  #initialControls() {
    const parentContainer = document.createElement("div");
    parentContainer.className = "controls-wrapper";

    this.#speedSlider = document.createElement("input");
    this.#speedSlider.type = "range";
    this.#speedSlider.min = minSpeed;
    this.#speedSlider.max = maxSpeed;
    this.#speedSlider.value = maxSpeed / 2;
    const labelSpeed = document.createElement("label");
    labelSpeed.textContent = "Speed";
    labelSpeed.appendChild(this.#speedSlider);

    this.#speedSlider.addEventListener("input", () => {
      this.dispatchEvent(new Event(Controls.speedChange));
    });

    this.#sizeSlider = document.createElement("input");
    this.#sizeSlider.type = "range";
    this.#sizeSlider.min = 1;
    this.#sizeSlider.max = 10;
    this.#sizeSlider.value = 5;
    const labelSize = document.createElement("label");
    labelSize.textContent = "Size";
    labelSize.appendChild(this.#sizeSlider);

    this.#sizeSlider.addEventListener("input", () => {
      this.dispatchEvent(new Event(Controls.sizeChange));
    });

    parentContainer.appendChild(labelSpeed);
    parentContainer.appendChild(labelSize);

    this.#container.appendChild(parentContainer);
  }
}
