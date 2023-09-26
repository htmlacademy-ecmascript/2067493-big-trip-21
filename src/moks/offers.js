import { getRandomInteger} from '../utils.js';
import { nanoid } from 'nanoid';
import { TYPES } from '../const.js';

const offers = [];

const generateOffer = (type) => ({
  id: nanoid(),
  title: `Опции ${type}`,
  price: getRandomInteger(50, 500)
});

const createOffers = (type) => ({
  type,
  offers: Array.from({length: getRandomInteger(0, 6)}, () => generateOffer(type))
});

TYPES.forEach((type) => offers.push(createOffers(type)));

export {offers};
