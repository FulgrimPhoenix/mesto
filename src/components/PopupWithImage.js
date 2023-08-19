import Popup from "./Popup.js";
import {popupPicpureImage, popupPicpureTitle} from '../utils/constants.js';

class PopupWithImage extends Popup{
  constructor(selector){
    super();
    this._popup = selector;
  }
  open(image, title){
    super.open()
    popupPicpureImage.src = image;
    popupPicpureImage.alt = title;
    popupPicpureTitle.textContent = title;
  }
}

export default PopupWithImage;