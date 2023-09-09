import ListSortingView from '../view/main/list-sorting-view.js';
import ListPointView from '../view/main/list-point-view.js';
import NewFormPointView from '../view/main/new-form-point-view.js';
import FormEditingPointView from '../view/main/form-editing-point-view.js';
import PointView from '../view/main/point-view.js';
import { render } from '../framework/render.js';
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

    render (this.listSotring, this.container);
    render (this.listPoint, this.container);
    render (this.newFormPoint, this.listPoint.element);
    render (new FormEditingPointView({point: this.point[0]}), this.listPoint.element);

    for (let i = 1; i < this.point.length; i++){
      render (new PointView({point: this.point[i]}), this.listPoint.element);
    }
  }
}

