import { offers } from '../../../moks/offers.js';

const createOffersListPointTemplate = (point) => {
  const isTypeOffers = offers.find((item) => item.type === point.type);
  const offersId = isTypeOffers.offers.filter((item) => point.offers.includes(item.id));
  return offersId.map((item) =>
    `
    <li class="event__offer">
    <span class="event__offer-title">${item.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${item.price}</span>
    </li>`).join(' ');
};

export { createOffersListPointTemplate };
