class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _getResponseData(result) {
    if (result.ok) {
      return result.json();
    }
    return Promise.reject(`Ошибка: ${result.status}`);
  }

  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json'
      }
    })
      .then(res => this._getResponseData(res))
  };

  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json'
      }
    })
      .then(res => this._getResponseData(res))
  };
  
  updateUserInfo(item, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: item.name,
        about: item.about
      })
    })
      .then(res => this._getResponseData(res))
  };

  addNewCard(item, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: item.name,
        link: item.link
      })
    })
      .then(res => this._getResponseData(res))
  };

  deleteCard(data, token) {
    return fetch(`${this._baseUrl}/cards/${data._id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json'
      },
    })
      .then(res => this._getResponseData(res)) 
  };

  updateAvatar(item, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        avatar: item.avatar
      })
    })
      .then(res => this._getResponseData(res))
  };

  likeCard(item, token) {
    return fetch(`${this._baseUrl}/cards/likes/${item._id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json'
      }
    })
      .then(res => this._getResponseData(res))
    };

  delLikeCard(item, token) {
    return fetch(`${this._baseUrl}/cards/likes/${item._id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json'
      },
    })
      .then(res => this._getResponseData(res))
  };

  changeLikeCardStatus(cardId, isLiked, token) {
    if (!isLiked) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-type': 'application/json'
        }
      })
        .then(res => this._getResponseData(res))
    } else {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-type': 'application/json'
        },
      })
        .then(res => this._getResponseData(res))
    }
  }
}

const api = new Api({
  baseUrl: 'https://api.mesto.master.nomoredomains.icu'
});

export default api;