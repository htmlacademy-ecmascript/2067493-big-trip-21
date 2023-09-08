import { render } from '../render.js';
import ListSortingView from '../view/main/list-sorting-view.js';
import ListPointView from '../view/main/list-point-view.js';
import NewFormPointView from '../view/main/new-form-point-view.js';
import FormEditingPointView from '../view/main/form-editing-point-view.js';
import PointView from '../view/main/point-view.js';
export default class MainPresenter {
  listSotring = new ListSortingView;
  listPoint = new ListPointView;
  newFormPoint = new NewFormPointView;

  constructor ({container, pointsModel}) {
    this.container = container;
    this.pointsModel = pointsModel;
  }

  init() {
    this.point = [...this.pointsModel.getPoints()];
    this.pointEdithing = this.pointsModel.getPointEdithing();

    render (this.listSotring, this.container);
    render (this.listPoint, this.container);
    render (this.newFormPoint, this.listPoint.getElement());
    render (new FormEditingPointView({pointEdithing: this.pointEdithing}), this.listPoint.getElement());

    for (let i = 0; i < this.point.length; i++){
      render (new PointView({point: this.point[i]}), this.listPoint.getElement());
    }
  }
}

