import { getRandomArrayElement, getRandomInteger, getDate} from '../utils.js';
import { nanoid } from 'nanoid';
import { TYPES } from '../const.js';
import { offers } from './offers.js';
import { destinations } from './destination.js';

const createRoutePoint = () => {
  const type = getRandomArrayElement(TYPES);
  const destination = getRandomArrayElement(destinations);
  const offersType = offers.find((itemOffers) => itemOffers.type === type);
  const offerID = getRandomInteger(0, 1)
    ? offersType.offers.slice(0, getRandomInteger(0, offersType.offers.length))
      .map((item) => item.id) : [];
  return {
    id: nanoid(),
    basePrice: getRandomInteger(50, 500),
    dateFrom: getDate({next: false}),
    dateTo: getDate({next: true}),
    destination: destination.id,
    isFavorite: !!getRandomInteger(0, 1),
    offers: offerID,
    type
  };
};

export { createRoutePoint };
