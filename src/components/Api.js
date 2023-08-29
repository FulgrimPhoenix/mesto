class Api{
  constructor({baseUrl, authorization}){
    this._url = baseUrl;
    this._authorization = authorization;
  }

  getCardsInfo(){
    return fetch(this._url + 'cards', {
        headers: this._authorization
        })
        .then((res) => res.json())
  }

  getMyUserInfo(){
    return fetch(this._url + 'users/me', {
      method: 'GET',
      headers: this._authorization
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  editProfileInfo(name, about){
    return fetch(this._url + 'users/me', {
      method: 'PATCH',
      headers: this._authorization,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  addNewCard(name, link){
    return fetch(this._url + 'cards',{
      method: 'POST',
      headers: this._authorization,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deleteCard(id){
    return fetch(this._url + 'cards/' + id,{
      method: 'DELETE',
      headers: this._authorization
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  likeThisCard(id){
    return fetch(this._url + 'cards/' + id + '/likes',{
      method: 'PUT',
      headers: this._authorization
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  unLikeThisCard(id){
    return fetch(this._url + 'cards/' + id + '/likes',{
      method: 'DELETE',
      headers: this._authorization
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  updateAvatar(link){
    return fetch (this._url + 'users/me/avatar',{
      method: 'PATCH',
      headers: this._authorization,
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}

export default Api