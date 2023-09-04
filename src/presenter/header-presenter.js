import ListFilter from '../view/header/list-filter-view.js';
import TripInfo from '../view/header/trip-info-view.js';
import { render, RenderPosition } from '../render.js';

export default class HeaderPresenter {
  tripInfo = new TripInfo();
  listFilter = new ListFilter();

  constructor ({infoContainer, filterContainer}) {
    this.infoContainer = infoContainer;
    this.filterContainer = filterContainer;
  }

  init() {
    render (this.tripInfo, this.infoContainer, RenderPosition.AFTERBEGIN);
    render (this.listFilter, this.filterContainer);
  }
}
