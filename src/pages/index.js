import "./index.css";
import Api from "../components/api.js";
import Card from "../components/card.js";
import PopupWithImage from "../components/popupWithImage.js";
import PopupWithForm from "../components/popupWithForm";
import Section from "../components/section.js";
import UserInfo from "../components/userInfo";
import FormValidator from "../components/formValidator";
import {
  config,
  validationConfig,
  profileEditButton,
  addCardButton,
  avatarButton,
  avatar,
  profileName,
  profileAbout,
  inputName,
  inputAbout,
  AvatarLink,
} from "../utils/constants.js";

////////////////////////////////////////////////////////////////////////////

const userInfo = new UserInfo({
  userNameSelector: profileName,
  userAboutSelector: profileAbout,
  userAvatarSelector: avatar,
});

const popupWithImage = new PopupWithImage(".popup_type_image");

// создание класса для попапа смены аватара
const popupWithFormAvatar = new PopupWithForm(
  ".popup_type_edit-avatar",
  (data) => {
    popupWithFormAvatar.loading(true);
    api
      .setAvatar(data.avatar)
      .then((data) => {
        userInfo.setUserInfo(data);
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

// создание класса для попапа редактирования профиля
const popupWithFormEdit = new PopupWithForm(
  ".popup_type_edit-profile",
  (data) => {
    popupWithFormEdit.loading(true);
    api
      .patchUserId(data.name, data.bio)
      .then((data) => {
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

// создание класса для попапа добаления карточки
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

//инициализация api
const api = new Api(config);

// получем данные пользователя и объект с карточками => рендерим карточки и устананавливает инфо о пользователе
api
  .getData()
  .then(([userData, cards]) => {
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

// обработчики событий для кнопок открытия попапов
avatarButton.addEventListener("click", openAvatarForm);
addCardButton.addEventListener("click", openAddForm);
profileEditButton.addEventListener("click", openEditForm);

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

// добавляем листенеры
popupWithImage.setEventListeners();
popupWithFormEdit.setEventListeners();
popupWithFormAdd.setEventListeners();
popupWithFormAvatar.setEventListeners();

// подключаем и включаем валидаторы
const editProfileValidator = new FormValidator(
  popupWithFormEdit.formElement,
  validationConfig
);
editProfileValidator.enableValidation();

const addCardValidator = new FormValidator(
  popupWithFormAdd.formElement,
  validationConfig
);
addCardValidator.enableValidation();

const editAvatarValidator = new FormValidator(
  popupWithFormAvatar.formElement,
  validationConfig
);
editAvatarValidator.enableValidation();
