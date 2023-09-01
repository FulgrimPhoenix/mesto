import Popup from "./Popup";

class PopupForDelete extends Popup{
  constructor(selector, { submit }){
    super()
    this._popup = selector;
    this._submit = submit;
    this._form = this._popup.querySelector('.form');

  }

  open(id, element){
    super.open();
    this._id = id;
    this._element = element;
  }

  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submit(this._id, this._element);
    });
  }
}

export default PopupForDelete;