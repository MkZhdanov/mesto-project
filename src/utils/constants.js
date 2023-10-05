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

export const profileEditButton = document.querySelector(".profile__edit");
export const addCardButton = document.querySelector(".profile__add-card");
export const avatarButton = document.querySelector(".profile__avatar-button");
export const avatar = document.querySelector(".profile__avatar");
export const profileName = document.querySelector(".profile__name");
export const profileAbout = document.querySelector(".profile__bio");
export const inputName = document.querySelector(".popup__item_type_name");
export const inputAbout = document.querySelector(".popup__item_type_bio");
export const AvatarLink = document.querySelector(".profile__avatar");
