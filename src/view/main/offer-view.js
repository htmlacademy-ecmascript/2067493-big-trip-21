import { createElement } from '../../render.js';
import { offers } from '../../moks/offers.js';

const createOfferItemTemplate = (pointOffer, pointType) => {
  const isTypeOffers = offers.find((item) => item.type === pointType);
  const offerId = isTypeOffers.offers.find((item) => item.id === pointOffer);
  return `<li class="event__offer">
  <span class="event__offer-title">${offerId.title}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${offerId.price}</span>
</li>`;
};

export default class OffersItem {
  constructor ({pointOfferId, pointOfferType}) {
    this.pointOfferId = pointOfferId;
    this.pointOfferType = pointOfferType;
  }

  getTemplate() {
    return createOfferItemTemplate(this.pointOfferId, this.pointOfferType);
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
