import AbstractView from '../../framework/view/abstract-view.js';

function disabled(value, count) {
  if(value === 'everything') {
    return '';
  }
  return count === 0 ? 'disabled' : '';
}

function createItemFilterTemplate (filter, isChecked) {
  const {value, count} = filter;

  return `
  <div class="trip-filters__filter">
    <input
    id="filter-${value}"
    class="trip-filters__filter-input  visually-hidden"
    type="radio"
    name="trip-filter"+
    value="${value}"
    ${isChecked ? 'checked' : ''}
    ${disabled(value, count)}>

    <label
    class="trip-filters__filter-label"
    for="filter-${value}">
    ${value.charAt(0).toUpperCase() + value.slice(1)}
    </label>
  </div>`;
}

function createListFilterTemplate (filterItems) {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createItemFilterTemplate(filter, index === 0))
    .join(' ');

  return `
  <form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
  `;
}

export default class ListFilterView extends AbstractView {
  #filter = null;

  constructor ({filters}) {
    super();
    this.#filter = filters;
  }

  get template() {
    return createListFilterTemplate(this.#filter);
  }
}
