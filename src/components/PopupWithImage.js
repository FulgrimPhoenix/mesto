import Popup from "./Popup.js";

class PopupWithImage extends Popup{
  constructor(selector, popupPicpureImage, popupPicpureTitle){
    super();
    this._popupPicpureImage = popupPicpureImage;
    this._popupPicpureTitle = popupPicpureTitle;
    this._popup = selector;
  }
  open(image, title){
    super.open()
    this._popupPicpureImage.src = image;
    this._popupPicpureImage.alt = title;
    this._popupPicpureTitle.textContent = title;
  }
}

export default PopupWithImage;