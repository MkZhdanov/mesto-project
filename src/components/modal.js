export {
  popupEditProfile,
  popupAvatarChange,
  inputName,
  inputBio,
  profileName,
  profileBio,
  openPopup,
  closePopup,
  handleProfileFormSubmit,
  handleFormSubmitAvatar,
  setProfileInfo,
  renderLoading,
};
import { patchUserId, setAvatar } from "./api.js"

const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAvatarChange = document.querySelector(".popup_type_edit-avatar");
const inputAvatar = document.querySelector("#avatar");
const AvatarLink = document.querySelector(".profile__avatar")
const inputName = document.querySelector(".popup__item_type_name");
const inputBio = document.querySelector(".popup__item_type_bio");
const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__bio");
const popups = document.querySelectorAll(".popup");

// функция, которая открывает popup и убирает ошибки валидации
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEsc);
}

// функция, которая закрывает popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEsc);
}

// Функция, которая сохраняет значения инпутов попапа "Редактировать профиль" в профайл на странице и закрывает попап
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Предотвращает событие по умолчанию (перезагрузку страницы)
  renderLoading(evt.submitter, true);
  profileName.textContent = inputName.value;
  profileBio.textContent = inputBio.value;
  patchUserId(profileName, profileBio)
  .then((data) => {
    closePopup(popupEditProfile);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(evt.submitter, false);
  })
}
// функция меняющая аватар
function handleFormSubmitAvatar(evt) {
  evt.preventDefault();
  renderLoading(evt.submitter, true);
  AvatarLink.setAttribute("src", inputAvatar.value);
  setAvatar(inputAvatar.value)
    .then((data) => {
      evt.target.reset();
      closePopup(popupAvatarChange);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(evt.submitter, false);
    })
}

// Закрытие попап по нажатию Esc
const closePopupByEsc = (event) => {
  if (event.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
};

// Закрытие попап по клику на крестик или overlay
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (event.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});


  function setProfileInfo(name, about, url) {
    profileName.textContent = name;
    profileBio.textContent = about;
    AvatarLink.src = url;
  }

  function renderLoading(button, isLoading) {
    if(isLoading) {
      button.textContent = "Сохранение...";
    }
    else {
      button.textContent = "Сохранить";
    }
  }
