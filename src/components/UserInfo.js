class UserInfo{
  constructor({ name, description, avatar}) {
    this._name = name;
    this._description = description;
    this._avatar = avatar;
  }
  getUserInfo(){
    this._userData ={
      currentName: this._name.textContent,
      currentAbout: this._description.textContent,
      currentAvatar: this._avatar
    }
    return this._userData
  }
  setUserInfo(name, description, avatar){
    this._name.textContent = name;
    this._description.textContent = description;
    this._avatar.src = avatar;
  }
}

export default UserInfo;