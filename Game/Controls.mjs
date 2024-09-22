const minSpeed = 1;
const maxSpeed = 1000;

export class Controls extends EventTarget {
  static speedChange = "speedChange";
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
    return maxSpeed - Number(this.#speedSlider.value);
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
    this.#speedSlider.min = String(minSpeed);
    this.#speedSlider.max = String(maxSpeed);
    this.#speedSlider.value = String(maxSpeed / 2);
    const labelSpeed = document.createElement("label");
    labelSpeed.textContent = "Speed";
    labelSpeed.appendChild(this.#speedSlider);

    this.#speedSlider.addEventListener("input", () => {
      this.dispatchEvent(new Event(Controls.speedChange));
    });

    this.#sizeSlider = document.createElement("input");
    this.#sizeSlider.type = "range";
    const labelSize = document.createElement("label");
    labelSize.textContent = "Size";
    labelSize.appendChild(this.#sizeSlider);

    parentContainer.appendChild(labelSpeed);
    parentContainer.appendChild(labelSize);

    this.#container.appendChild(parentContainer);
  }
}
