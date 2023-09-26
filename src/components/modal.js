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
  handleSubmit,
  userId,
};
//import { patchUserId, setAvatar } from "./api.js";              //валится в ошибку


const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAvatarChange = document.querySelector(".popup_type_edit-avatar");
const inputAvatar = document.querySelector("#avatar");
const AvatarLink = document.querySelector(".profile__avatar");
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

// пример оптимизации обработчика сабмита формы профиля
function handleProfileFormSubmit(evt) {
  // создаем функцию, которая возвращает промис, так как любой запрос возвращает его
  function makeRequest() {
    // вот это позволяет потом дальше продолжать цепочку `then, catch, finally`
    return patchUserId(inputName, inputBio).then(
      (userData) => {
        profileName.textContent = userData.name;
        profileBio.textContent = userData.about;
        closePopup(popupEditProfile);
      }
    );
  }
  // вызываем универсальную функцию, передавая в нее запрос, событие и текст изменения кнопки (если нужен другой, а не `"Сохранение..."`)
  handleSubmit(makeRequest, evt);
}

// функция меняющая аватар
function handleFormSubmitAvatar(evt) {
  function makeRequest() {
    AvatarLink.setAttribute("src", inputAvatar.value);
    return setAvatar(inputAvatar.value)
      .then((data) => {
        closePopup(popupAvatarChange);
      });
  }
    handleSubmit(makeRequest, evt);
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

function setProfileInfo(name, about, url, id) {
  profileName.textContent = name;
  profileBio.textContent = about;
  AvatarLink.src = url;
  userId = id;
}

let userId;

// можно сделать универсальную функцию управления текстом кнопки с 3 и 4 необязательными аргументами
function renderLoading(
  isLoading,
  button,
  buttonText = "Сохранить",
  loadingText = "Сохранение..."
) {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
}

// можно сделать универсальную функцию, которая принимает функцию запроса, объект события и текст во время загрузки
function handleSubmit(request, evt, loadingText = "Сохранение...") {
  // всегда нужно предотвращать перезагрузку формы при сабмите
  evt.preventDefault();

  // универсально получаем кнопку сабмита из `evt`
  const submitButton = evt.submitter;
  // записываем начальный текст кнопки до вызова запроса
  const initialText = submitButton.textContent;
  // изменяем текст кнопки до вызова запроса
  renderLoading(true, submitButton, initialText, loadingText);
  request()
    .then(() => {
      // любую форму нужно очищать после успешного ответа от сервера
      // а так же `reset` может запустить деактивацию кнопки сабмита (смотрите в `validate.js`)
      evt.target.reset();
    })
    .catch((err) => {
      // в каждом запросе нужно ловить ошибку
      console.error(`Ошибка: ${err}`);
    })
    // в каждом запросе в `finally` нужно возвращать обратно начальный текст кнопки
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    });
}
