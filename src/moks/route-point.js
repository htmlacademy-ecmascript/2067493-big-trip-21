import { getRandomArrayElement, getRandomInteger, getRandomId } from './utils.js';
import { TYPES } from './const.js';
import { offers } from './offers.js';
import { destinations } from './destination.js';

const createRoutePoint = () => {
  const type = getRandomArrayElement(TYPES);
  const destination = getRandomArrayElement(destinations);
  const offersType = offers.find((itemOffers) => itemOffers.type === type);
  const offerID = !getRandomInteger(0, 1)
    ? offersType.offers.slice(0, getRandomInteger(0, offersType.offers.length))
      .map((item) => item.id) : [];

  return {
    id: getRandomId(6),
    basePrice: getRandomInteger(50, 5000),
    dateFrom: new Date(),
    dateTo: new Date(new Date().getTime() + getRandomInteger(1000, 5000) * getRandomInteger(60, 3600)),
    distination: destination.id,
    isFavorite: !!getRandomInteger(0, 1),
    offers: offerID,
    type
  };
};

export { createRoutePoint };
