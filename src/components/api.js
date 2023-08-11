export { getInitialCards, getUserId, patchUserId, addNewCard, setAvatar, deleteCard, setLike, unsetLike };
import { renderCards } from "./card.js"
import { setProfileInfo } from "./modal.js"

const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-27",
  headers: {
    authorization: "ddcd4d44-122e-4e36-92c8-1de7daa6b3f7",
    "Content-Type": "application/json",
  },
};

const checkResponse = res => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

// получаем массив с карточками с сервера
function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
  headers: config.headers
})
  .then(checkResponse)
}

//получаем массив с данными пользователя
function getUserId() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(checkResponse)
}

// обновляет name и about в массиве с данными пользователя на сервера
function patchUserId(profileName, profileBio) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: profileName.textContent,
      about: profileBio.textContent
    })
  })
  .then(checkResponse)
}

//добавляет новую карточку на сервер
function addNewCard(titleValue, imgValue) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: titleValue,
      link: imgValue,
    })
  })
  .then(checkResponse)
}

//удаляет карточку с сервера
function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(checkResponse)
}

// Смена аватара
function setAvatar(inputAvatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: inputAvatar,
    })
  })
  .then(checkResponse)
}

// Поставить лайк
function setLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then(checkResponse)
}

// Удалить лайк
function unsetLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(checkResponse)
}

Promise.all([getUserId(), getInitialCards()])
  .then(([userData, cards]) => {
    setProfileInfo(userData.name, userData.about, userData.avatar);
    renderCards(cards);
  })
  .catch(err => {
    console.log(err);
  });



