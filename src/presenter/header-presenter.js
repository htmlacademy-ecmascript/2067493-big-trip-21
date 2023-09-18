import ListFilterView from '../view/header/list-filter-view.js';
import TripInfoView from '../view/header/trip-info-view.js';
import { render, RenderPosition } from '../framework/render.js';

export default class HeaderPresenter {
  #tripInfo = new TripInfoView();
  #listFilter = new ListFilterView();

  #infoContainer = null;
  #filterContainer = null;
  constructor ({infoContainer, filterContainer}) {
    this.#infoContainer = infoContainer;
    this.#filterContainer = filterContainer;
  }

  init() {
    render (this.#tripInfo, this.#infoContainer, RenderPosition.AFTERBEGIN);
    render (this.#listFilter, this.#filterContainer);
  }
}
