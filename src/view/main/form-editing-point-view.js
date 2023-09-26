import { reformatDate } from '../../utils.js';
import { DATE_FORMAT } from '../../const.js';
import { createTypesEditingTemplate } from './template/type-editing-template.js';
import { createOffersEditFormTemplate } from './template/offers-edit-form-template.js';
import { createDistinationEditTemplate } from './template/destination-edit-template.js';
import { createDescriptionDestinationTemplate } from './template/description-destionation-template.js';
import { destinations } from '../../moks/destination.js';
import AbstractView from '../../framework/view/abstract-view.js';

function createFormEditingPointTemplate(point) {
  const { basePrice, dateFrom, dateTo, type, destination } = point;
  const date = {
    from: reformatDate(DATE_FORMAT.dateFormEditing, dateFrom),
    to: reformatDate(DATE_FORMAT.dateFormEditing, dateTo),
  };
  const destinationId = destinations.find((item) => item.id === destination);
  return `
  <li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${createTypesEditingTemplate()}
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationId.city}" list="destination-list-1">
      <datalist id="destination-list-1">
        ${createDistinationEditTemplate()}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${date.from}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${date.to}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </header>
  <section class="event__details">
    ${createOffersEditFormTemplate(point)}

    ${createDescriptionDestinationTemplate(point)}
  </section>
</form>
</li>
  `;
}

export default class FormEditingPointView extends AbstractView {
  #point = [];
  #handleSubmitFormEditing = null;
  #handleClickFormEditing = null;

  constructor({ point, onFormSubmit, onClickForm }) {
    super();
    this.#point = point;
    this.#handleSubmitFormEditing = onFormSubmit;
    this.#handleClickFormEditing = onClickForm;

    this.element.querySelector('form')
      .addEventListener('submit', this.#submitFormEditingHandler);

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#clickFormEditingHandler);
  }

  #submitFormEditingHandler = (evt) => {
    evt.preventDefault();
    this.#handleSubmitFormEditing();
  };

  #clickFormEditingHandler = (evt) => {
    evt.preventDefault();
    this.#handleClickFormEditing();
  };

  get template() {
    return createFormEditingPointTemplate(this.#point);
  }
}
