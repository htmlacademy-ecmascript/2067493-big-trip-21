import HeaderPresenter from './presenter/header-presenter.js';
import MainPresenter from './presenter/main-presenter.js';

const tripMain = document.querySelector('.trip-main');
const tripMainFilters = tripMain.querySelector('.trip-controls__filters');
const mainContainer = document.querySelector('.trip-events');

const headerPresenter = new HeaderPresenter(tripMain, tripMainFilters);

const mainPresenter = new MainPresenter (mainContainer);

headerPresenter.init();
mainPresenter.init();
