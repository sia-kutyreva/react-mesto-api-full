class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(result) {
    if (result.ok) {
      return result.json();
    }
    return Promise.reject(`Ошибка: ${result.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(res => this._getResponseData(res))
  };

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(res => this._getResponseData(res))
  };
  
  updateUserInfo(item) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        about: item.about
      })
    })
      .then(res => this._getResponseData(res))
  };

  addNewCard(item) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        link: item.link
      })
    })
      .then(res => this._getResponseData(res))
  };

  deleteCard(data) {
    return fetch(`${this._baseUrl}/cards/${data._id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => this._getResponseData(res)) 
  };

  updateAvatar(item) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: item.avatar
      })
    })
      .then(res => this._getResponseData(res))
  };

  likeCard(item) {
    return fetch(`${this._baseUrl}/cards/likes/${item._id}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(res => this._getResponseData(res))
    };

  delLikeCard(item) {
    return fetch(`${this._baseUrl}/cards/likes/${item._id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => this._getResponseData(res))
  };

  changeLikeCardStatus(cardId, isLiked) {
    if (!isLiked) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: this._headers
      })
        .then(res => this._getResponseData(res))
    } else {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: this._headers,
      })
        .then(res => this._getResponseData(res))
    }
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19',
  headers: {
    authorization: '2c549586-52b7-4f7d-b209-4e4d6520fcf2',
    'Content-Type': 'application/json'
  }
});

export default api;