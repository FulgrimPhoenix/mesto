class Popup{
  constructor(selector){
    this._popup = selector;
  }

  open(){
    this._popup.classList.add('popup_opened');
  }

  close(){
    this._popup.classList.remove('popup_opened');
  }
}

export default Popup