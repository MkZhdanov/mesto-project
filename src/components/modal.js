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
const closeButtons = document.querySelectorAll(".popup__close");
const inputName = document.querySelector(".popup__item_type_name");
const inputBio = document.querySelector(".popup__item_type_bio");
const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__bio");

// функция, которая открывает popup
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

// Закрытие попап по клику на overlay
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("popup")) {
    closePopup(event.target);
  }
});

// Закрывает любую форму
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});
