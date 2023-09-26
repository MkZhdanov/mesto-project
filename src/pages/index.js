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
  setProfileInfo                    //его небыло в импорте, добавил чтоб в ошибку не валился
} from "../components/modal.js";
//import { popupLocationAdd, handleFormSubmitCard } from "../components/card.js";   убрал метод handleFormSubmitCard теперь он в классе
import { popupLocationAdd } from "../components/card.js";
import { enableValidation, validationConfig } from "../components/validate.js";
import "./index.css";
import Api from "../components/api.js";
import Card from "../components/card.js";
import { config } from "../utils/constants.js";

/////////////////////////////////
//инициализация классов
const card = new Card();


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
formElementCard.addEventListener("submit", card.handleFormSubmitCard);

// Слушатель кнопки "Сохранить" в форме "Обновить аватар"
formElementAvatar.addEventListener("submit", handleFormSubmitAvatar);

/////////////////////////////////
//инициализация api
const api = new Api(config);

//предварительный шаблон для отрисовки карточек и тд, переношу сюда из api.js
api
  .getData()
  .then(([userData, cards]) => {
    setProfileInfo(
      userData.name,
      userData.about,
      userData.avatar,
      userData._id
    );
    card.renderCards(cards);
  })
  .catch((err) => {
    console.log(err);
  });
