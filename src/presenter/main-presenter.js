import { render } from '../render.js';
import ListSorting from '../view/main/list-sorting-view.js';
import ListPoint from '../view/main/list-point-view.js';
import FormNewPoint from '../view/main/new-form-point-view.js';
import FormEditingPoint from '../view/main/form-editing-point-view.js';
import Point from '../view/main/point-view.js';

export default class MainPresenter {
  listSotring = new ListSorting;
  listPoint = new ListPoint;
  newFormPoint = new FormNewPoint;
  formEditingPoint = new FormEditingPoint;

  constructor (container) {
    this.container = container;
  }

  init() {
    render (this.listSotring, this.container);
    render (this.listPoint, this.container);
    render (this.newFormPoint, this.listPoint.getElement());
    render (this.formEditingPoint, this.listPoint.getElement());

    for (let i = 0; i < 3; i++){
      render (new Point, this.listPoint.getElement());
    }
  }
}

