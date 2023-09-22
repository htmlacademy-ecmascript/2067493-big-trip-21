import ListSortingView from '../view/main/list-sorting-view.js';
import ListPointView from '../view/main/list-point-view.js';
import NewFormPointView from '../view/main/new-form-point-view.js';
import FormEditingPointView from '../view/main/form-editing-point-view.js';
import PointView from '../view/main/point-view.js';
import LisrEmptyView from '../view/main/list-empty-view.js';
import { render, replace } from '../framework/render.js';
export default class MainPresenter {
  #container = null;
  #pointsModel = null;

  #listSorting = new ListSortingView();
  #listPoint = new ListPointView();
  #newFormPoint = new NewFormPointView();
  #listEmpty = new LisrEmptyView();

  #points = [];
  constructor({ container, pointsModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];

    this.#renderListPoint();
  }

  #renderEmpty () {
    render(this.#listEmpty, this.#container);
  }

  #renderListSorting () {
    render(this.#listSorting, this.#container);
  }

  #renderListContainer () {
    render(this.#listPoint, this.#container);
  }

  #renderListPoint () {
    if(this.#points.length === 0) {
      this.#renderEmpty();
      return;
    }

    this.#renderListSorting();
    this.#renderListContainer();
    this.#points.forEach((point) => this.#renderPoint(point));
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

}
