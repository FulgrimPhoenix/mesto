import Popup from "./Popup.js";
import {popupPicpureImage, popupPicpureTitle} from '../utils/constants.js';

class PopupWithImage extends Popup{
  constructor(selector, item){
    super();
    this._popup = selector;
    this._image = item.link;
    this._title = item.name;
  }
  open(){
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', () => super._handleEscClose())
    super._closeByMissclick();
    popupPicpureImage.src = this._image;
    popupPicpureImage.alt = this._title;
    popupPicpureTitle.textContent = this._title;
  }
}

export default PopupWithImage;