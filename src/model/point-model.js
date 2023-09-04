import { createRoutePoint } from '../moks/route-point.js';

const POINT_COUNT = 6;

export default class PointsModel {
  points = Array.from({length: POINT_COUNT}, createRoutePoint);

  getPoints () {
    return this.points;
  }
}