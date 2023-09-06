import { offers } from '../../../moks/offers.js';
function createOffersEditFormTemplate(point) {
  const isTypeOffers = offers.find((item) => item.type === point.type);
  const arrayOffers = isTypeOffers.offers.map((itemOffers) => Object.values(itemOffers));
  function checked(id) {
    return point.offers.some((item) => id === item) ? 'checked' : '';
  }
  return arrayOffers.map(([id, title, price]) =>
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="${id}" type="checkbox" name="event-offer-luggage" ${checked(id, point.offers)}>
      <label class="event__offer-label" for="event-offer-luggage-1">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
      </label>
    </div>`).join(' ');
}

export { createOffersEditFormTemplate };
