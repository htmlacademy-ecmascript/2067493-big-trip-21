import { createElement } from '../../render.js';
import { reformatDate } from '../../moks/utils.js';
import { DATE_FORMAT } from '../../moks/const.js';
import { destinations } from '../../moks/destination.js';

function createPointTemplate(point) {
  const { basePrice, dateFrom, dateTo, isFavorite, destination, type } = point;

  const date = {
    class: reformatDate(DATE_FORMAT.dateClass, dateFrom),
    value: reformatDate(DATE_FORMAT.dateValue, dateFrom),
    fromTimeClass: reformatDate(DATE_FORMAT.dateTimeClass, dateFrom),
    toTimeClass: reformatDate(DATE_FORMAT.dateTimeClass, dateTo),
    fromTimeValue: reformatDate(DATE_FORMAT.timeValue, dateFrom),
    toTimeValue: reformatDate(DATE_FORMAT.timeValue, dateTo),
  };

  const getClassFavorite = () => {
    if (isFavorite) {
      return 'event__favorite-btn--active';
    }
    return '';
  };

  const classFavorite = getClassFavorite();

  const isDestination = destinations.find((item) => item.id === destination);

  return `
  <li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${date.class}">${date.value}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${isDestination.city}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${date.fromTimeClass}">${date.fromTimeValue}</time>
        &mdash;
        <time class="event__end-time" datetime="${date.toTimeClass}">${date.toTimeValue}</time>
      </p>
      <p class="event__duration">30M</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
    </ul>
    <button class="event__favorite-btn ${classFavorite}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
  </li>
  `;
}

export default class PointView {
  constructor ({point}) {
    this.point = point;
  }


  getTemplate() {
    return createPointTemplate(this.point);
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
