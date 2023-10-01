export default class Card {
  constructor(
    data,
    userId,
    templateSelector,
    handleCardClick,
    handleDeleteClick,
    handleAddLike,
    handleRemoveLike
  ) {
    this._data = data;
    this._cardId = data._id;
    this._name = data.name;
    this._link = data.link;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleAddLike = handleAddLike;
    this._handleRemoveLike = handleRemoveLike;
  }

  // копируем выбранный template
  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setButtonDel() {
    if (this._ownerId != this._userId)
      this._deleteButtonElement.classList.add("card__delete_hide");
  }

  _setButtonLike() {
    if (this._data.likes.some((like) => like._id === this._userId)) {
      this._likeButtonElement.classList.add("card__like_active");
    }
  }

  _setEventListeners() {
    this._likeButtonElement.addEventListener("click", () => {
      if (this._likeButtonElement.classList.contains("card__like_active")) {
        this._handleRemoveLike(this);
      } else {
        this._handleAddLike(this);
      }
    });
    this._deleteButtonElement.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });
    this._imageElement.addEventListener("click", () => {
      this._handleCardClick(this);
    });
  }

  //передает Id карточки
  getId() {
    return this._cardId;
  }

  createCard() {
    this._element = this._getTemplate();

    this._imageElement = this._element.querySelector(".card__img");
    this._deleteButtonElement = this._element.querySelector(".card__delete");
    this._likeButtonElement = this._element.querySelector(".card__like");
    this._likesCounterElement = this._element.querySelector(
      ".card__like-counter"
    );

    this._element.querySelector(".card__title").textContent = this._name;
    this._imageElement.setAttribute("src", this._link);
    this._imageElement.setAttribute("alt", this._name);
    this._likesCounterElement.textContent = this._data.likes.length;

    this._setButtonDel();
    this._setButtonLike();
    this._setEventListeners();

    return this._element;
  }

  remove() {
    this._element.remove();
  }

  setLikes(item) {
    this._likesCounterElement.textContent = item.likes.length;
    if (this._likeButtonElement.classList.contains("card__like_active")) {
      this._likeButtonElement.classList.remove("card__like_active");
    } else {
      this._likeButtonElement.classList.add("card__like_active");
    }
  }
}
