import "./index.css";
import Api from "../components/api.js";
import Card from "../components/card.js";
import Popup from "../components/popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/popupWithForm";
import Section from "../components/section.js";
import UserInfo from "../components/UserInfo";
import FormValidator from "../components/formValidator";
import { config, validationConfig } from "../utils/constants.js";

///////////////////////////////////////////////////////////////////////////
const profileEditButton = document.querySelector(".profile__edit");
const addCardButton = document.querySelector(".profile__add-card");
const avatarButton = document.querySelector(".profile__avatar-button");
const avatar = document.querySelector(".profile__avatar");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__bio");
const inputName = document.querySelector(".popup__item_type_name");
const inputAbout = document.querySelector(".popup__item_type_bio");
const AvatarLink = document.querySelector(".profile__avatar");
//////////////////////////////////////////////////////////////////////////

const userInfo = new UserInfo({
  userNameSelector: profileName,
  userAboutSelector: profileAbout,
});

const popupWithImage = new PopupWithImage(".popup_type_image");

const popupWithFormAvatar = new PopupWithForm(
  ".popup_type_edit-avatar",
  (data) => {
    popupWithFormAvatar.loading(true);
    api
      .setAvatar(data.avatar)
      .then((data) => {
        avatar.src = data.avatar;
        popupWithFormAvatar.close();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupWithFormAvatar.loading(false);
      });
  }
);

const popupWithFormEdit = new PopupWithForm(
  ".popup_type_edit-profile",
  (data) => {
    popupWithFormEdit.loading(true);
    api
      .patchUserId(data.name, data.bio)
      .then((data) => {
        console.log(data);
        userInfo.setUserInfo(data);
        popupWithFormEdit.close();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupWithFormEdit.loading(false);
      });
  }
);

const popupWithFormAdd = new PopupWithForm(".popup_type_add-card", (data) => {
  popupWithFormAdd.loading(true);
  api
    .addNewCard(data.location, data.link)
    .then((data) => {
      const newCard = renderCard(data);
      cardSection.addItem(newCard);
      popupWithFormAdd.close();
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupWithFormAdd.loading(false);
    });
});

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

// объявляем айди пользователя
let userId;

// шаблон для отрисовки карточек и тд
api
  .getData()
  .then(([userData, cards]) => {
    AvatarLink.src = userData.avatar;
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cardSection.render(cards);
  })
  .catch((err) => {
    console.log(err);
  });

//функция создания карточки
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

function handleCardClick(data) {
  popupWithImage.open(data._link, data._name);
}

function handleDeleteClick(card) {
  api
    .deleteCard(card.getId())
    .then(() => {
      card.remove();
    })
    .catch((err) => console.log(err));
}

function handleRemoveLike(card) {
  api
    .unsetLike(card.getId())
    .then((item) => {
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
      card.setLikes(item);
    })
    .catch((err) => {
      console.log(err);
    });
}

function openEditForm() {
  popupWithFormEdit.open();
  editProfileValidator.resetFormValidity();
  const userData = userInfo.getUserInfo();
  inputName.value = userData.name;
  inputAbout.value = userData.about;
}

function openAddForm() {
  popupWithFormAdd.open();
  addCardValidator.resetFormValidity();
}

function openAvatarForm() {
  popupWithFormAvatar.open();
  editAvatarValidator.resetFormValidity();
}

//
avatarButton.addEventListener("click", openAvatarForm);
addCardButton.addEventListener("click", openAddForm);
profileEditButton.addEventListener("click", openEditForm);
// добавляем листенеры
popupWithImage.setEventListeners();
popupWithFormEdit.setEventListeners();
popupWithFormAdd.setEventListeners();
popupWithFormAvatar.setEventListeners();

const editProfileValidator = new FormValidator(
  popupWithFormEdit._formElement,
  validationConfig
);
editProfileValidator.enableValidation();

const addCardValidator = new FormValidator(
  popupWithFormAdd._formElement,
  validationConfig
);
addCardValidator.enableValidation();

const editAvatarValidator = new FormValidator(
  popupWithFormAvatar._formElement,
  validationConfig
);
editAvatarValidator.enableValidation();
