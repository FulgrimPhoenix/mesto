import Popup from "./Popup.js";

class PopupWithForm extends Popup{
  constructor(selector, { submit }) {
    super();
    this._popup = selector;
    this._submit = submit;
  }
  _getInputValues(){
    this._inputData = {};

    const inputList = this._popup.querySelectorAll('.form__input');

    inputList.forEach(item => {
      this._inputData[item.id] = item.value;
    })
    return this._inputData
  }

  resetValue(){
    const inputList = this._popup.querySelectorAll('.form__input');
    inputList.forEach(item => {
      item.value = '';
    })
  }
  setEventListeners(){
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
    evt.preventDefault();
    this._submit(this._getInputValues());
  });
  }
}

export default PopupWithForm;



