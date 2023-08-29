import { createElement } from '../../render.js';

function createListpointTemplate () {
  return `
  <ul class="trip-events__list"></ul>
  `;
}

export default class ListPoint {
  getTemplate() {
    return createListpointTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
