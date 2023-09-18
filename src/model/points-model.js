import { createRoutePoint } from '../moks/route-point.js';

const POINT_COUNT = 12;

export default class PointsModel {
  #points = Array.from({length: POINT_COUNT}, createRoutePoint);

  get points () {
    return this.#points;
  }
}
