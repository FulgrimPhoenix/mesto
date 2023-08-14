class UserInfo{
  constructor({ name, description}) {
    this._name = name;
    this._description = description;
  }
  getUserInfo(){
    this._userData ={
      currentName: this._name.textContent,
      currentAbout: this._description.textContent
    }
    return this._userData
  }
  setUserInfo(name, description){
    this._name.textContent = name;
    this._description.textContent = description;
  }
}

export default UserInfo;