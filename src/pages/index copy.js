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
  setProfileInfo, //его небыло в импорте, добавил чтоб в ошибку не валился
} from "../components/modal.js";
//import { popupLocationAdd, handleFormSubmitCard } from "../components/card.js";   убрал метод handleFormSubmitCard теперь он в классе
//import { popupLocationAdd } from "../components/card.js";
import { enableValidation, validationConfig } from "../components/validate.js";
/////////////////////////////
import "./index.css";
import Api from "../components/api.js";
import Card from "../components/card.js";
import Popup from "../components/popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/section.js";
import { config } from "../utils/constants.js";

const profileEditButton = document.querySelector(".profile__edit");
const addCardButton = document.querySelector(".profile__add-card");
const avatarButton = document.querySelector(".profile__avatar-button");
const formElementProfile = document.forms["profile"];
const formElementCard = document.forms["form-add"];
const formElementAvatar = document.forms["avatar-edit"];
const popupLocationAdd = document.querySelector(".popup_type_add-card");

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
//formElementCard.addEventListener("submit", card.handleFormSubmitCard);

// Слушатель кнопки "Сохранить" в форме "Обновить аватар"
formElementAvatar.addEventListener("submit", handleFormSubmitAvatar);

///////////////////////////////////////////////////////////////////////////

const popupWithImage = new PopupWithImage(".popup_type_image");

function handleCardClick(data) {
  console.log(data._link);
  popupWithImage.open(data);
}

//инициализация api
const api = new Api(config);

//создание класса для рендера карточек
const cardSection = new Section(
  {
    renderer: (item) => {
      const newCard = renderCard(item);
      cardSection.addItem(newCard);
    },
  },
  ".elements"
);

let userId;
//предварительный шаблон для отрисовки карточек и тд, переношу сюда из api.js
api
  .getData()
  .then(([userData, cards]) => {
    console.log(userData);
    console.log(cards);
    setProfileInfo(
      //позже исправить
      userData.name,
      userData.about,
      userData.avatar,
      userData._id
    );
    userId = userData._id;
    cardSection.render(cards);
  })
  .catch((err) => {
    console.log(err);
  });

/////
function renderCard(data) {
  const card = new Card(
    data,
    userId,
    "#card-template",
    handleCardClick,
    handleDeleteClick,
    handleAddLike,
    handleRemoveLike
  );
  return card.createCard();
}

//function handleCardClick() {}

function handleDeleteClick() {}

function handleRemoveLike(card) {
  api
    .unsetLike(card.getId())
    .then((item) => {
      console.log(111);
      card.setLikes(item);
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleAddLike(card) {
  api
    .setLike(card.getId())
    .then((item) => {
      console.log(222);
      card.setLikes(item);
    })
    .catch((err) => {
      console.log(err);
    });
}
