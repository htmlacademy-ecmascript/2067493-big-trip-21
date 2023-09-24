import FormEditingPointView from '../view/main/form-editing-point-view.js';
import PointView from '../view/main/point-view.js';
import { render, replace } from '../framework/render.js';

export default class PointPresenter {
  #listPoint = null;

  #pointComponent = null;
  #pointEditingComponent = null;

  #point = [];

  constructor({listPoint}) {
    this.#listPoint = listPoint;
  }

  init (point) {
    this.#point = point;

    this.#pointComponent = new PointView ({
      point: this.#point,
      onEditingClick: this.#handleEdithingClick,
    });

    this.#pointEditingComponent = new FormEditingPointView({
      point: this.#point,
      onFormSubmit: this.#handleFormSubmitAndClick,
      onClickForm: this.#handleFormSubmitAndClick,
    });

    render(this.#pointComponent, this.#listPoint.element);
  }

  #replacePointToFormEditing() {
    replace(this.#pointEditingComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#handleEscKeyDown);
  }

  #replaceFormEditingToPoint() {
    replace(this.#pointComponent, this.#pointEditingComponent);
    document.removeEventListener('keydown', this.#handleEscKeyDown);
  }

  #handleEdithingClick = () => {
    this.#replacePointToFormEditing();
  };

  #handleFormSubmitAndClick = () => {
    this.#replaceFormEditingToPoint();
  };

  #handleEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormEditingToPoint();
    }
  };
}
