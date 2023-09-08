import { TYPES } from '../../../moks/const.js';

function createTypesEditingTemplate() {
  return TYPES.map((item) =>
    `
  <div class="event__type-item">
    <input id="event-type-${item}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item}">
    <label class="event__type-label  event__type-label--${item}" for="event-type-${item}-1">${item}</label>
  </div>
  `
  ).join(' ');
}

export {createTypesEditingTemplate};
