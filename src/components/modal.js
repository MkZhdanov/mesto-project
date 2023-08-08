export {
  popupEditProfile,
  inputName,
  inputBio,
  profileName,
  profileBio,
  openPopup,
  closePopup,
  handleProfileFormSubmit,
};

const popupEditProfile = document.querySelector(".popup_type_edit-profile");
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
  profileName.textContent = inputName.value;
  profileBio.textContent = inputBio.value;
  closePopup(popupEditProfile);
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
