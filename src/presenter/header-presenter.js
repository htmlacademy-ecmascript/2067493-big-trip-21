import ListFilterView from '../view/header/list-filter-view.js';
import TripInfoView from '../view/header/trip-info-view.js';
import { render, RenderPosition } from '../framework/render.js';

export default class HeaderPresenter {
  #tripInfo = new TripInfoView();
  #filters = null;
  #infoContainer = null;
  #filterContainer = null;
  constructor ({infoContainer, filterContainer, filters}) {
    this.#infoContainer = infoContainer;
    this.#filterContainer = filterContainer;
    this.#filters = filters;
  }

  init() {
    render (this.#tripInfo, this.#infoContainer, RenderPosition.AFTERBEGIN);
    render (new ListFilterView({filters: this.#filters}), this.#filterContainer);
  }
}
