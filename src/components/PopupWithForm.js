import Popup from "./Popup.js";

class PopupWithForm extends Popup{
  constructor(selector, { popupForm, submit }) {
    super();
    this._popup = selector;
    this._submit = submit;
    this._popupForm = popupForm;
    this._form = this._popup.querySelector('.form');
    this._inputList = this._popup.querySelectorAll('.form__input');
  }
  _getInputValues(){
    this._inputData = {};
    this._inputList.forEach(item => {
      this._inputData[item.id] = item.value;
    })
    return this._inputData
  }

  close(){
    this._form.reset();
    super.close()
  }

  setEventListeners(){
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    this._submit(this._getInputValues());
  });
  }
}

export default PopupWithForm;



