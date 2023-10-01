export const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-28",
  headers: {
    authorization: "57c50817-5faf-4479-94fc-07447a268e09",
    "Content-Type": "application/json",
  },
};

export const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
