import { getRandomArrayElement, getRandomInteger} from '../utils.js';
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
  const month = getRandomInteger(1, 12);
  const day = getRandomInteger(1, 31);
  return {
    id: nanoid(),
    basePrice: getRandomInteger(50, 500),
    dateFrom: new Date(new Date(`2023-${month}-${day}`).getTime() + getRandomInteger(1000, 5000) * getRandomInteger(60, 3600)),
    dateTo: new Date(new Date(`2023-${month}-${day}`).getTime() + getRandomInteger(5000, 10000) * getRandomInteger(60, 3600)),
    destination: destination.id,
    isFavorite: !!getRandomInteger(0, 1),
    offers: offerID,
    type
  };
};

export { createRoutePoint };
