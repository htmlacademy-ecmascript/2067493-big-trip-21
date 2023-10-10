import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

import { FilterValue, DAY, HOUR, MINUTE } from './const.js';

const today = () => dayjs();

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
const reformatDate = (format, dateToFormat) => dayjs(dateToFormat).format(format);
//
const filter = {
  [FilterValue.EVERYTHING]: (points) => points,
  [FilterValue.FUTURE]: (points) => points.filter((itemPoints) => itemPoints.dateFrom > today()),
  [FilterValue.PRESENT]: (points) => points.filter((itemPoints) => itemPoints.dateFrom <= today() && itemPoints.dateTo >= today()),
  [FilterValue.PAST]: (points) => points.filter((itemPoints) => itemPoints.dateTo < today())
};

let date = dayjs().subtract(getRandomInteger(0, 7), 'day').toDate();

const getDate = ({next}) => {
  if(next) {
    date = dayjs(date).add(getRandomInteger(0, 1), 'day')
      .add(getRandomInteger(0, 5), 'hour')
      .add(getRandomInteger(0, 30), 'minute')
      .toDate();
  }
  return date;
};

const getDifferenseDate = (startDate, finishDate, dateFormat) => {
  const differenseDate = dayjs(finishDate).diff(dayjs(startDate));

  switch(true) {
    case (differenseDate >= DAY):
      return dayjs.duration(differenseDate).format(dateFormat.dateDifferenceDay);
    case (differenseDate >= HOUR):
      return dayjs.duration(differenseDate).format(dateFormat.dateDifferenceHour);
    case (differenseDate >= MINUTE):
      return dayjs.duration(differenseDate).format(dateFormat.dateDifferenceMinute);
  }

};

export {getRandomInteger, getRandomArrayElement, reformatDate, filter, getDate, getDifferenseDate};

