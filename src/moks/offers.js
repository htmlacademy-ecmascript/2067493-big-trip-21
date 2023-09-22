import { getRandomInteger, getRandomId } from '../utils.js';
import { TYPES } from '../const.js';

const offers = [];

const generateOffer = (type) => ({
  id: getRandomId(4),
  title: `Опции ${type}`,
  price: getRandomInteger(50, 500)
});

const createOffers = (type) => ({
  type,
  offers: Array.from({length: getRandomInteger(0, 6)}, () => generateOffer(type))
});

TYPES.forEach((type) => offers.push(createOffers(type)));

export {offers};
