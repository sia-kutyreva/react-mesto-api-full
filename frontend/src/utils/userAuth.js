export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (data) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      password: data.userPassword, 
      email: data.userEmail 
    })
  })
  .then((response) => {
    if (!response.ok){
      return Promise.reject(`${response.status} - некорректно заполнено одно из полей`);
    }
    return response.json();
  })
}

export const authorization = (data) => {
  console.log(data)
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ 
      password: data.userPassword, 
      email: data.userEmail  
    })
  })
  .then((response) => {
    if (!response.ok){
      return Promise.reject(`${response.status} - некорректно заполнено одно из полей`);
    }
    return response.json();
  })
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then((response) => {
    if (!response.ok){
      return Promise.reject(`${response.status} - некорректно заполнено одно из полей`);
    }
    return response.json();
  })
} 