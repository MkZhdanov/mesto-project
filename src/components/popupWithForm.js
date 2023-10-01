import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._inputList = document.querySelectorAll(".popup__input");
    this.formElement = this._popupElement.querySelector(".popup__form");
    this._submitButton = this._popupElement.querySelector(".popup__submit");
    this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    this._inputs = {};
    this._inputList.forEach((item) => {
      this._inputs[item.name] = item.value;
    });
    return this._inputs;
  }

  setEventListeners() {
    super.setEventListeners();
    this.formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
    });
  }

  close() {
    super.close();
    this.formElement.reset();
  }

  loading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Сохранение...";
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}
