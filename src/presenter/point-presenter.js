import FormEditingPointView from '../view/main/form-editing-point-view.js';
import PointView from '../view/main/point-view.js';
import { render, replace, remove } from '../framework/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};
export default class PointPresenter {
  #listPoint = null;

  #handleModeChange = null;
  #pointComponent = null;
  #pointEditingComponent = null;

  #handleDataChange = null;

  #point = [];
  #mode = Mode.DEFAULT;

  constructor({listPoint, onDataChange, onModeChange }) {
    this.#listPoint = listPoint;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init (point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditingComponent = this.#pointEditingComponent;

    this.#pointComponent = new PointView ({
      point: this.#point,
      onEditingClick: this.#handleEdithingClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#pointEditingComponent = new FormEditingPointView({
      point: this.#point,
      onFormSubmit: this.#handleFormSubmitAndClick,
      onClickForm: this.#handleFormSubmitAndClick,
    });

    if(prevPointComponent === null || prevPointEditingComponent === null){
      render(this.#pointComponent, this.#listPoint.element);
      return;
    }

    if (this.#mode === Mode.DEFAULT){
      replace(this.#pointComponent, prevPointComponent);
    }

    if(this.#mode === Mode.EDITING){
      replace(this.#pointEditingComponent, prevPointComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditingComponent);
  }

  //Метод удаляет элемент
  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditingComponent);
  }

  //Метод заменяет точку маршрута на форму редактирования
  #replacePointToFormEditing() {
    replace(this.#pointEditingComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#handleEscKeyDown);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  //Метод заменяет форму редактирования на точку
  #replaceFormEditingToPoint() {
    replace(this.#pointComponent, this.#pointEditingComponent);
    document.removeEventListener('keydown', this.#handleEscKeyDown);
    this.#mode = Mode.DEFAULT;
  }

  //Функция событие которая изменят значения Favorite
  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  //Функция события замены точки маршрута на форму редактирования
  #handleEdithingClick = () => {
    this.#replacePointToFormEditing();
  };

  //Функция события замены формы редактирования на точку маршрута
  #handleFormSubmitAndClick = () => {
    this.#replaceFormEditingToPoint();
  };

  //Функция события нажатия кнопки ESC в форме рдактирования (меняет форму редактирования на точку маршрута)
  #handleEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormEditingToPoint();
    }
  };

  resetView() {
    if(this.#mode !== Mode.DEFAULT){
      this.#replaceFormEditingToPoint();
    }
  }
}
