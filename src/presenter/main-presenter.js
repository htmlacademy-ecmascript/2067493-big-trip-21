import ListSortingView from '../view/main/list-sorting-view.js';
import ListPointView from '../view/main/list-point-view.js';
import LisrEmptyView from '../view/main/list-empty-view.js';
import { render, RenderPosition } from '../framework/render.js';
import PointPresenter from './point-presenter.js';
export default class MainPresenter {
  #container = null;
  #pointsModel = null;
  #listSorting = null;
  #listPoint = new ListPointView();
  #listEmpty = new LisrEmptyView();

  #points = [];
  #pointPresenter = new Map();
  #currenttSortingValue = 'sort-day';

  constructor({ container, pointsModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#renderListSorting();
    this.#renderListPoint();
  }

  #clearListPoint () {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((itemPresenter) => itemPresenter.resetView());
  };

  // Метод создает пустой лист(точки маршрута отсутвуют)
  #renderEmpty () {
    render(this.#listEmpty, this.#container);
  }

  //Метод создает меню сортировки точек маршрута
  #renderListSorting () {
    this.#listSorting = new ListSortingView ({
      onClickSorting: this.#handlerClickSorting
    });

    render(this.#listSorting, this.#container, RenderPosition.AFTERBEGIN);
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

    this.#renderListContainer();
    this.#points.forEach((point) => this.#renderPoint(point));
  }

  #handleDataChange = (newItem) => {
    this.#points = this.#points.map((itemPoint) => itemPoint.id === newItem.id ? newItem : itemPoint);
    this.#pointPresenter.get(newItem.id).init(newItem);

  };

  // Метод создает точку маршрута
  #renderPoint(point) {
    const pointPresenter = new PointPresenter ({
      listPoint: this.#listPoint,
      onDataChange: this.#handleDataChange,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #sortPoints = (value) => {
    switch (value) {
      case 'sort-time':
        this.#points.sort((a, b) => (b.dateTo - b.dateFrom) - (a.dateTo - a.dateFrom));
        break;
      case 'sort-price':
        this.#points.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case 'sort-day':
        this.#points.sort((a, b) => a.dateFrom - b.dateFrom);
        break;
    }
    this.#currenttSortingValue = value;
  };

  #handlerClickSorting = (value) => {
    if(this.#currenttSortingValue === value){
      return;
    }

    this.#sortPoints(value);
    this.#clearListPoint();
    this.#renderListPoint();
  };
}
