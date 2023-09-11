import ListSortingView from '../view/main/list-sorting-view.js';
import ListPointView from '../view/main/list-point-view.js';
import NewFormPointView from '../view/main/new-form-point-view.js';
import FormEditingPointView from '../view/main/form-editing-point-view.js';
import PointView from '../view/main/point-view.js';
import { render, replace } from '../framework/render.js';
export default class MainPresenter {
  #container = null;
  #pointsModel = null;

  #listSotring = new ListSortingView;
  #listPoint = new ListPointView;
  #newFormPoint = new NewFormPointView;

  #point = [];
  constructor({ container, pointsModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormEditingToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point,
      onEditingClick: () => {
        replacePointToFormEditing();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointFormEditingComponent = new FormEditingPointView({
      point,
      onFormSubmit: () => {
        replaceFormEditingToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onClickForm: () => {
        replaceFormEditingToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToFormEditing() {
      replace(pointFormEditingComponent, pointComponent);
    }

    function replaceFormEditingToPoint() {
      replace(pointComponent, pointFormEditingComponent);
    }

    render(pointComponent, this.#listPoint.element);
  }

  init() {
    this.#point = [...this.#pointsModel.points];

    render(this.#listSotring, this.#container);
    render(this.#listPoint, this.#container);

    for (let i = 1; i < this.#point.length; i++) {
      this.#renderPoint(this.#point[i]);
    }
  }


}

