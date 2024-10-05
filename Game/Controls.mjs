import { createControlLabel } from "../utils/components.mjs";

const minSpeed = 0;
const maxSpeed = 100;
const modes = ["limited", "infinity"];

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
   * @type {"infinity" | "limited"}
   */
  #moveMode = "limited";

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

  get moveMode() {
    return this.#moveMode;
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

    const title = document.createElement("h3");
    title.textContent = "Settings:";
    title.className = "title";

    this.#speedSlider = document.createElement("input");
    this.#speedSlider.type = "range";
    this.#speedSlider.min = minSpeed;
    this.#speedSlider.max = maxSpeed;
    this.#speedSlider.value = maxSpeed / 2;
    const labelSpeed = createControlLabel();
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
    const labelSize = createControlLabel();
    labelSize.textContent = "Size";
    labelSize.appendChild(this.#sizeSlider);

    this.#sizeSlider.addEventListener("input", () => {
      this.dispatchEvent(new Event(Controls.sizeChange));
    });

    const modesContainer = document.createElement("div");
    modesContainer.className = "modes-wrapper";

    modes.forEach((mode) => {
      const modeToggle = document.createElement("input");
      modeToggle.type = "radio";

      modeToggle.value = mode;
      modeToggle.name = "canvasMode";
      modeToggle.checked = mode === this.#moveMode;
      const toggleModeLabel = createControlLabel();
      toggleModeLabel.textContent = `Mode: ${mode} `;
      toggleModeLabel.appendChild(modeToggle);

      modesContainer.appendChild(toggleModeLabel);

      modeToggle.addEventListener("input", (e) => {
        this.#moveMode = e.target.value;
      });
    });

    parentContainer.appendChild(title);
    parentContainer.appendChild(labelSpeed);
    parentContainer.appendChild(labelSize);
    parentContainer.appendChild(modesContainer);

    this.#container.appendChild(parentContainer);
  }
}
