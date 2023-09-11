import ListSortingView from '../view/main/list-sorting-view.js';
import ListPointView from '../view/main/list-point-view.js';
import NewFormPointView from '../view/main/new-form-point-view.js';
import FormEditingPointView from '../view/main/form-editing-point-view.js';
import PointView from '../view/main/point-view.js';
import { render } from '../framework/render.js';
export default class MainPresenter {
  #container = null;
  #pointsModel = null;

  #listSotring = new ListSortingView;
  #listPoint = new ListPointView;
  #newFormPoint = new NewFormPointView;

  #point = [];
  constructor ({container, pointsModel}) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  #renderPoint (point) {
    const pointComponent = new PointView({point});

    render (pointComponent, this.#listPoint.element);
  }

  init() {
    this.#point = [...this.#pointsModel.points];

    render (this.#listSotring, this.#container);
    render (this.#listPoint, this.#container);

    for (let i = 1; i < this.#point.length; i++){
      this.#renderPoint(this.#point[i]);
    }
  }


}

