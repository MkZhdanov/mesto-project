import { openPopup, closePopup, handleSubmit, userId } from "./modal.js";
//import { setLike, unsetLike, addNewCard, deleteCard } from "./api.js";   //валится в ошибку
import Api from "./api.js";

//export { popupLocationAdd, handleFormSubmitCard };
export { popupLocationAdd };

const cardsContainer = document.querySelector(".elements");
const title = document.querySelector(".popup__item_type_location");
const img = document.querySelector(".popup__item_type_link");
const imgBig = document.querySelector(".image-popup__image");
const imgBigCaption = document.querySelector(".image-popup__title");
const popupLocationAdd = document.querySelector(".popup_type_add-card");
const popupImage = document.querySelector(".popup_type_image");




export default class Card {
  constructor() {
    //const cardTemplate = document.querySelector("#card-template").content;    //эта переменная одна в коде перетащил ее содержимое ниже
    this._cardElement = document.querySelector("#card-template").content
      .querySelector(".card").cloneNode(true);
    this._cardImage = this._cardElement.querySelector(".card__img");
    this._cardDeleteButton = this._cardElement.querySelector(".card__delete");
    this._likesCount = this._cardElement.querySelector(".card__like-counter");
    this._likeButton = this._cardElement.querySelector(".card__like");
  }
  //------------------------------------------
  renderCards(cards) {                                                          //публичная метод. получаем массив карточек
    cards.forEach((element) => {                                                //обходит его
      cardsContainer.prepend(this._createCard(element));                              //куда-то добавляет !!!!!!!!
    });
  }
  //---------------------------------------------
  addCard(data) {                                                               // Функция, которая добавляет карточку
    //const cardElement = createCard(data);          !!! зачем объявлять переменную ?
    // Добавляет элемент в начало контейнера
    //cardsContainer.prepend(cardElement);
    cardsContainer.prepend(this._createCard(data));        //сюда можно сразу функицю запихать
  }
  //------------------------------------------------
  handleFormSubmitCard(evt) {                                                    // Функция, которая создает карточку на странице со значениями инпутов формы "Новое место" закрывает попап и очишает значения инпутов
    function makeRequest() {
      return addNewCard(title.value, img.value) // Отправляет данные на сервер
        .then((data) => {
          addCard(data);
          closePopup(popupLocationAdd);
        })
    }
    handleSubmit(makeRequest, evt);
  }
  //------------------------------------
  _createCard(element) {                                                        // Функция, которая создает карточку
    // тут создаете карточку и возвращаете ее
    this._likesCount.textContent = element.likes.length;
    this._cardElement.querySelector(".card__title").textContent = element.name;
    this._cardImage.setAttribute("src", element.link);
    this._cardImage.setAttribute("alt", element.name);

    element.likes.forEach((i) => {
      if (i._id === userId) {
        this._likeButton.classList.add("card__like_active");
      }
    });

    //---------------------тут есть проблемы
    // Добавляет/Удаляет лайки
    this._cardElement.querySelector(".card__like").addEventListener("click", function (evt) {
        this._toggleLikeButton(evt.target, this._likesCount, element._id);                       //тут у меня в ошибку валится is not function
      });
    //----------------------------------------

    // Проверяет соответствие id пользователя
    if (element.owner._id != userId)
      this._cardDeleteButton.classList.add("card__delete_hide");
    // Удаляет карточку
    this._cardDeleteButton.addEventListener("click", function () {
      deleteCard(element._id);
      this._cardElement.remove();
    });
    // Открывает попап с изображением и подписью
    this._cardImage.addEventListener("click", function () {
      openPopup(popupImage);
      imgBig.setAttribute("src", element.link);
      imgBig.setAttribute("alt", element.name);
      imgBigCaption.textContent = element.name;
    });
    return this._cardElement;
  }

  _toggleLikeButton (target, count, id) {
    if (target.classList.contains("card__like_active")) {
      Api.unsetLike(id, count)                                                // Api.unsetLike Это наверное будет жесткой привязкой ?
        .then((item) => {
          console.log(item.likes.length);
          count.textContent = item.likes.length;
          target.classList.remove("card__like_active");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Api.setLike(id, count)                                                //Api.setLike Это наверное будет жесткой привязкой ?
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



}
