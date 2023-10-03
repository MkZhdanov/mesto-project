import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._img = document.querySelector(".image-popup__image");
    this._imgCaption = document.querySelector(".image-popup__title");
  }

  open(link, title) {
    super.open();

    this._img.src = link;
    this._img.alt = title;
    this._imgCaption.textContent = title;
  }
}
