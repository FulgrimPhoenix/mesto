class Api{
  constructor({baseUrl, authorization}){
    this._url = baseUrl;
    this._authorization = authorization;
  }

  renderer(){
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
    .then((res) => res.json())
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
    .then(this.getMyUserInfo().then((data) => console.log(data)))
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
    .then((res) => res.json())
  }

  deleteCard(id){
    return fetch(this._url + 'cards/' + id,{
      method: 'DELETE',
      headers: this._authorization
    })
  }
}

export default Api