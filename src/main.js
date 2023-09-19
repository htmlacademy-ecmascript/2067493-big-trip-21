import HeaderPresenter from './presenter/header-presenter.js';
import MainPresenter from './presenter/main-presenter.js';
import PointsModel from './model/points-model.js';
import { createFilter } from './moks/filter.js';
const tripMain = document.querySelector('.trip-main');
const tripMainFilters = tripMain.querySelector('.trip-controls__filters');
const mainContainer = document.querySelector('.trip-events');

const pointsModel = new PointsModel();

const filters = createFilter(pointsModel.points);

const headerPresenter = new HeaderPresenter({
  infoContainer :tripMain,
  filterContainer: tripMainFilters,
  filters
});

const mainPresenter = new MainPresenter ({
  container:mainContainer,
  pointsModel
});

headerPresenter.init();
mainPresenter.init();
