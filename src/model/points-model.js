import { createRoutePoint } from '../moks/route-point.js';

const POINT_COUNT = 12;

export default class PointsModel {
  #points = Array.from({length: POINT_COUNT}, createRoutePoint).sort((a, b) => a.dateFrom - b.dateFrom);

  get points () {
    return this.#points;
  }
}
