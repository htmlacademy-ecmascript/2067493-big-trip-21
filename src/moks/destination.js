import { getRandomArrayElement, getRandomInteger} from '../utils.js';
import { nanoid } from 'nanoid';
import { CITIES, DESCRIPTION } from '../const.js';

const destinations = [];

const createPicture = (description) => ({
  src: `https://loremflickr.com/248/152?random=${getRandomInteger(0, 1000)}`,
  description
});

const createDestination = (city) => ({
  id: nanoid(),
  city,
  description: getRandomArrayElement(DESCRIPTION),
  picture: Array.from({length: getRandomInteger(0, 3)}, () => createPicture(getRandomArrayElement(DESCRIPTION)))
});

CITIES.forEach((city) => destinations.push(createDestination(city)));

export { destinations };
