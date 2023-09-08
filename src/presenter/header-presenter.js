import ListFilterView from '../view/header/list-filter-view.js';
import TripInfoView from '../view/header/trip-info-view.js';
import { render, RenderPosition } from '../render.js';

export default class HeaderPresenter {
  tripInfo = new TripInfoView();
  listFilter = new ListFilterView();

  constructor ({infoContainer, filterContainer}) {
    this.infoContainer = infoContainer;
    this.filterContainer = filterContainer;
  }

  init() {
    render (this.tripInfo, this.infoContainer, RenderPosition.AFTERBEGIN);
    render (this.listFilter, this.filterContainer);
  }
}
