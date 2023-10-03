export {
  getInitialCards,
  getUserId,
  patchUserId,
  addNewCard,
  setAvatar,
  deleteCard,
  setLike,
  unsetLike,
};
import { renderCards } from "./card.js";
import { setProfileInfo } from "./modal.js";

const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-27",
  headers: {
    authorization: "ddcd4d44-122e-4e36-92c8-1de7daa6b3f7",
    "Content-Type": "application/json",
  },
};

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

// получаем массив с карточками с сервера
function getInitialCards() {
  return request(`${config.baseUrl}/cards`, {
    headers: config.headers,
  });
}

//получаем массив с данными пользователя
function getUserId() {
  return request(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  });
}

// обновляет name и about в массиве с данными пользователя на сервера
function patchUserId(inputName, inputBio) {
  return request(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: inputName.value,
      about: inputBio.value,
    }),
  });
}

//добавляет новую карточку на сервер
function addNewCard(titleValue, imgValue) {
  return request(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: titleValue,
      link: imgValue,
    }),
  });
}

//удаляет карточку с сервера
function deleteCard(cardId) {
  return request(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
}

// Смена аватара
function setAvatar(inputAvatar) {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: inputAvatar,
    }),
  });
}

// Поставить лайк
function setLike(cardId) {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  });
}

// Удалить лайк
function unsetLike(cardId) {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
}

Promise.all([getUserId(), getInitialCards()])
  .then(([userData, cards]) => {
    setProfileInfo(
      userData.name,
      userData.about,
      userData.avatar,
      userData._id
    );
    renderCards(cards);
  })
  .catch((err) => {
    console.log(err);
  });
