import dayjs from 'dayjs';
import { FILTER_VALUE, TODAY } from './const.js';

// Функция которая дает рандомное число из задаваемого отрезка
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// функция для поиска случайного элемента в массиве
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

//Создание рандомного ID
const getRandomId = (length = 5) => Math.random().toString(36).substring(2, length + 2);
//Переформатировать в нужный формат
const reformatDate = (format, date) => dayjs(date).format(format);
//
const filter = {
  [FILTER_VALUE.EVERYTHING]: (points) => points,
  [FILTER_VALUE.FUTURE]: (points) => points.filter((itemPoints) => itemPoints.dateFrom > TODAY),
  [FILTER_VALUE.PRESENT]: (points) => points.filter((itemPoints) => itemPoints.dateFrom <= TODAY && itemPoints.dateTo >= TODAY),
  [FILTER_VALUE.PAST]: (points) => points.filter((itemPoints) => itemPoints.dateTo < TODAY)
};
export {getRandomInteger, getRandomArrayElement, getRandomId, reformatDate, filter};

