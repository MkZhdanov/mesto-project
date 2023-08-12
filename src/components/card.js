import { openPopup, closePopup, handleSubmit, userId } from "./modal.js";
import { setLike, unsetLike, addNewCard, deleteCard } from "./api.js";
export { popupLocationAdd, handleFormSubmitCard, renderCards };

const cardsContainer = document.querySelector(".elements");
const title = document.querySelector(".popup__item_type_location");
const img = document.querySelector(".popup__item_type_link");
const imgBig = document.querySelector(".image-popup__image");
const imgBigCaption = document.querySelector(".image-popup__title");
const popupLocationAdd = document.querySelector(".popup_type_add-card");
const popupImage = document.querySelector(".popup_type_image");

// Функция, которая создает карточку на странице со значениями инпутов формы "Новое место" закрывает попап и очишает значения инпутов
function handleFormSubmitCard(evt) {
  function makeRequest() {
    return addNewCard(title.value, img.value) // Отправляет данные на сервер
      .then((data) => {
        addCard(data);
        closePopup(popupLocationAdd);
      })
  }
  handleSubmit(makeRequest, evt);
}

// Функция, которая создает карточку
function createCard(element) {
  // тут создаете карточку и возвращаете ее
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__img");
  const cardDeleteButton = cardElement.querySelector(".card__delete");
  const likesCount = cardElement.querySelector(".card__like-counter");
  const likeButton = cardElement.querySelector(".card__like");

  likesCount.textContent = element.likes.length;
  cardElement.querySelector(".card__title").textContent = element.name;
  cardImage.setAttribute("src", element.link);
  cardImage.setAttribute("alt", element.name);

  element.likes.forEach((i) => {
    if (i._id === userId) {
      likeButton.classList.add("card__like_active");
    }
  });
  // Добавляет/Удаляет лайки
  cardElement
    .querySelector(".card__like")
    .addEventListener("click", function (evt) {
      toggleLikeButton(evt.target, likesCount, element._id);
    });
  // Проверяет соответствие id пользователя
  if (element.owner._id != userId)
    cardDeleteButton.classList.add("card__delete_hide");
  // Удаляет карточку
  cardDeleteButton.addEventListener("click", function () {
    deleteCard(element._id);
    cardElement.remove();
  });
  // Открывает попап с изображением и подписью
  cardImage.addEventListener("click", function () {
    openPopup(popupImage);
    imgBig.setAttribute("src", element.link);
    imgBig.setAttribute("alt", element.name);
    imgBigCaption.textContent = element.name;
  });
  return cardElement;
}

// Функция, которая добавляет карточку
function addCard(data) {
  const cardElement = createCard(data);
  // Добавляет элемент в начало контейнера
  cardsContainer.prepend(cardElement);
}

function renderCards(cards) {
  cards.forEach((element) => {
    cardsContainer.prepend(createCard(element));
  });
}

function toggleLikeButton(target, count, id) {
  if (target.classList.contains("card__like_active")) {
    unsetLike(id, count)
      .then((item) => {
        console.log(item.likes.length);
        count.textContent = item.likes.length;
        target.classList.remove("card__like_active");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    setLike(id, count)
      .then((item) => {
        console.log(item.likes.length);
        count.textContent = item.likes.length;
        target.classList.add("card__like_active");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
