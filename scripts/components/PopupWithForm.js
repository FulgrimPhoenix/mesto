import { popupProfile } from "../pages/index.js";
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
  setEventListeners(){
    document.querySelector('.popup__exit').addEventListener('click', () => {
      this.close();
    });
    this._popup.addEventListener('submit', (evt) => {
    evt.preventDefault();
    this._submit();
  });
  }
}

export default PopupWithForm;



