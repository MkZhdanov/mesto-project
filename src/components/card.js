import { openPopup, closePopup } from "./modal.js";
export { popupLocationAdd, handleFormSubmitCard };

// Массив с фотографиями и названиями для карточек «из коробки»
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const cardsContainer = document.querySelector(".elements");
const title = document.querySelector(".popup__item_type_location");
const img = document.querySelector(".popup__item_type_link");
const imgBig = document.querySelector(".image-popup__image");
const imgBigCaption = document.querySelector(".image-popup__title");
const popupLocationAdd = document.querySelector(".popup_type_add-card");
const popupImage = document.querySelector(".popup_type_image");

// Функция, которая создает карточку на странице со значениями инпутов формы "Новое место" закрывает попап и очишает значения инпутов
function handleFormSubmitCard(evt) {
  evt.preventDefault(); // Предотвращает событие по умолчанию (перезагрузку страницы)
  addCard(title.value, img.value);
  closePopup(popupLocationAdd);
  evt.target.reset();
}

// Функция, которая создает карточку
function createCard(titleValue, imgValue) {
  // тут создаете карточку и возвращаете ее
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__img");

  cardElement.querySelector(".card__title").textContent = titleValue;
  cardImage.setAttribute("src", imgValue);
  cardImage.setAttribute("alt", titleValue);
  // Добавляет/Удаляет лайки
  cardElement
    .querySelector(".card__like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__like_active");
    });
  // Удаляет карточку
  cardElement
    .querySelector(".card__delete")
    .addEventListener("click", function () {
      cardElement.remove();
    });
  // Открывает попап с изображением и подписью
  cardImage.addEventListener("click", function () {
    openPopup(popupImage);
    imgBig.setAttribute("src", imgValue);
    imgBig.setAttribute("alt", titleValue);
    imgBigCaption.textContent = titleValue;
  });
  return cardElement;
}

// Функция, которая добавляет карточку
function addCard(titleValue, imgValue) {
  const cardElement = createCard(titleValue, imgValue);
  // Добавляет элемент в начало контейнера
  cardsContainer.prepend(cardElement);
}

// Добавляет элементы из массива в секцию elements
initialCards.forEach(function (element) {
  const titleValue = element.name;
  const imgValue = element.link;
  addCard(titleValue, imgValue);
});
