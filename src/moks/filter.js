import { filter } from '../utils.js';

function createFilter(points) {
  return Object.entries(filter)
    .map(([filterValue, filterPoints]) => ({
      value: filterValue,
      count: filterPoints(points).length,
    }));
}


export { createFilter };
