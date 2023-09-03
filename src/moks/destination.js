import { getRandomArrayElement, getRandomInteger, getRandomId } from './utils.js';
import { CITIES, DESCRIPTION } from './const.js';

const destinations = [];

const createDestination = (city) => ({
  id: getRandomId(),
  city,
  description: getRandomArrayElement(DESCRIPTION),
  picture: ` https://loremflickr.com/248/152?random=${getRandomInteger(0, 1000)}`
});

CITIES.forEach((city) => destinations.push(createDestination(city)));

export { destinations };
