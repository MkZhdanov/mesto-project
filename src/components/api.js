export default class Api {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  // получаем массив с карточками с сервера
  _getInitialCards() {
    return this._request(`${this._url}/cards`, {
      headers: this._headers,
    });
  }

  // получаем массив с данными пользователя
  _getUserId() {
    return this._request(`${this._url}/users/me`, {
      headers: this._headers,
    });
  }

  // получаем данные пользователя и карточки
  getData() {
    return Promise.all([this._getUserId(), this._getInitialCards()]);
  }

  // обновляет name и about в массиве с данными пользователя на сервера
  patchUserId(inputName, inputBio) {
    return this._request(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: inputName.value,
        about: inputBio.value,
      }),
    });
  }

  //добавляет новую карточку на сервер
  addNewCard(titleValue, imgValue) {
    return this._request(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: titleValue,
        link: imgValue,
      }),
    });
  }

  //удаляет карточку с сервера
  deleteCard(cardId) {
    return this._request(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  // Смена аватара
  setAvatar(inputAvatar) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: inputAvatar,
      }),
    });
  }

  // Поставить лайк
  setLike(cardId) {
    return this._request(`${this._url}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  // Удалить лайк
  unsetLike(cardId) {
    return this._request(`${this._url}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
}
