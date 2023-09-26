import dayjs from 'dayjs';
import { FilterValue, today } from './const.js';

// Функция которая дает рандомное число из задаваемого отрезка
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// функция для поиска случайного элемента в массиве
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

//Переформатировать в нужный формат
const reformatDate = (format, date) => dayjs(date).format(format);
//
const filter = {
  [FilterValue.EVERYTHING]: (points) => points,
  [FilterValue.FUTURE]: (points) => points.filter((itemPoints) => itemPoints.dateFrom > today),
  [FilterValue.PRESENT]: (points) => points.filter((itemPoints) => itemPoints.dateFrom <= today && itemPoints.dateTo >= today),
  [FilterValue.PAST]: (points) => points.filter((itemPoints) => itemPoints.dateTo < today)
};
export {getRandomInteger, getRandomArrayElement, reformatDate, filter};

