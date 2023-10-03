export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  render(elements) {
    elements.forEach((element) => {
      this._renderer(element);
    });
  }

  addItem(item) {
    this._container.prepend(item);
  }
}
