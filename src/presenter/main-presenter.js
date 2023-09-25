import ListSortingView from '../view/main/list-sorting-view.js';
import ListPointView from '../view/main/list-point-view.js';
import LisrEmptyView from '../view/main/list-empty-view.js';
import { render } from '../framework/render.js';
import PointPresenter from './point-presenter.js';
export default class MainPresenter {
  #container = null;
  #pointsModel = null;

  #listSorting = new ListSortingView();
  #listPoint = new ListPointView();
  #listEmpty = new LisrEmptyView();

  #points = [];
  #pointPresenter = new Map();

  constructor({ container, pointsModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];

    this.#renderListPoint();
  }

  #clearListPoint () {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  // Метод создает пустой лист(точки маршрута отсутвуют)
  #renderEmpty () {
    render(this.#listEmpty, this.#container);
  }

  //Метод создает меню сортировки точек маршрута
  #renderListSorting () {
    render(this.#listSorting, this.#container);
  }

  //Метод создает контейнер в котором будут хранится точки маршрута
  #renderListContainer () {
    render(this.#listPoint, this.#container);
  }

  //Метод создает список точек маршрута
  #renderListPoint () {
    if(this.#points.length === 0) {
      this.#renderEmpty();
      return;
    }

    this.#renderListSorting();
    this.#renderListContainer();
    this.#points.forEach((point) => this.#renderPoint(point));
  }

  // Метод создает точку маршрута
  #renderPoint(point) {
    const pointPresenter = new PointPresenter ({
      listPoint: this.#listPoint
    });
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }
}
