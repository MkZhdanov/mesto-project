import {
  popupEditProfile,
  popupAvatarChange,
  inputName,
  inputBio,
  profileName,
  profileBio,
  openPopup,
  handleProfileFormSubmit,
  handleFormSubmitAvatar,
} from "./components/modal.js";
import { popupLocationAdd, handleFormSubmitCard } from "./components/card.js";
import { enableValidation, validationConfig } from "./components/validate.js";
import "./pages/index.css";

const profileEditButton = document.querySelector(".profile__edit");
const addCardButton = document.querySelector(".profile__add-card");
const avatarButton = document.querySelector(".profile__avatar-button");
const formElementProfile = document.forms["profile"];
const formElementCard = document.forms["form-add"];
const formElementAvatar = document.forms["avatar-edit"];

enableValidation(validationConfig);

// открывает форму "Редактировать профиль" и подтягивает значения инпутов из профайла на странице
profileEditButton.addEventListener("click", function () {
  openPopup(popupEditProfile);
  inputName.value = profileName.textContent;
  inputBio.value = profileBio.textContent;
});

// Открывает форму "Новое место"
addCardButton.addEventListener("click", function () {
  openPopup(popupLocationAdd);
});

// Открывает форму смены аватара
avatarButton.addEventListener("click", function () {
  openPopup(popupAvatarChange);
});

// Слушатель кнопки "Сохранить" в форме "Редактировать профиль"
formElementProfile.addEventListener("submit", handleProfileFormSubmit);

// Слушатель кнопки "Создать" в форме "Новое место"
formElementCard.addEventListener("submit", handleFormSubmitCard);

// Слушатель кнопки "Сохранить" в форме "Обновить аватар"
formElementAvatar.addEventListener("submit", handleFormSubmitAvatar);
