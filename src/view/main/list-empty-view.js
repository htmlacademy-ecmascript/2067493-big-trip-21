import AbstractView from '../../framework/view/abstract-view.js';

function creteListEmptyTemplate () {
  return `
  <p class="trip-events__msg">Click New Event to create your first point</p>
  `;
}

export default class LisrEmptyView extends AbstractView {
  get template() {
    return creteListEmptyTemplate();
  }
}
