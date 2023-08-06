import {
  popupEditProfile,
  inputName,
  inputBio,
  profileName,
  profileBio,
  openPopup,
  handleProfileFormSubmit,
} from "./components/modal.js";
import { popupLocationAdd, handleFormSubmitCard } from "./components/card.js";
import { validationConfig, enableValidation } from "./components/validate.js";
import './pages/index.css';

const profileEditButton = document.querySelector(".profile__edit");
const addCardButton = document.querySelector(".profile__add-card");
const formElementProfile = document.querySelector(".popup__form-profile");
const formElementCard = document.querySelector(".popup__form-card");

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

// Слушатель кнопки "Сохранить" в форме "Редактировать профиль"
formElementProfile.addEventListener("submit", handleProfileFormSubmit);

// Слушатель кнопки "Создать" в форме "Новое место"
formElementCard.addEventListener("submit", handleFormSubmitCard);
