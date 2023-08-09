import {popupPicture, popupPicpureImage, popupPicpureTitle, openPopup, popupList} from '../pages/index.js';

class Card {
  constructor(templateSelector, data){
    this._templateSelector = templateSelector;
    this._cardName = data.name;
    this._cardLink = data.link;
  }

  _getTemplate(){
    const cardTemplate = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.photo-grid__cell')
    .cloneNode(true);

    return cardTemplate
  }

  _setCardParametres(){
    this._cardImage = this._element.querySelector('.photo-grid__photo');
    this._cardTitle = this._element.querySelector('.photo-grid__title');
    this._cardLikeButton = this._element.querySelector('.photo-grid__like-button-image');
  }

  _toggleLikeStatus(){
    this._cardLikeButton.classList.toggle('photo-grid__like-button-image_active')
    }

  _deleteCard(){
    this._element.remove();
  }

  _openPopup(){
    openPopup(popupPicture);
    popupPicpureImage.src = this._cardLink;
    popupPicpureImage.alt = this._cardName;
    popupPicpureTitle.textContent = this._cardName;
  }

  _setEventListeners(){
    this._cardLikeButton.addEventListener('click', () => this._toggleLikeStatus());
    this._element.querySelector('.photo-grid__delete-button').addEventListener('click', () => this._deleteCard());
    this._cardImage.addEventListener('click', () => this._openPopup())
  }

  generateCard(){
    this._element = this._getTemplate();
    this._setCardParametres();
    this._setEventListeners();

    this._cardImage.src = this._cardLink;
    this._cardImage.alt = this._cardName;
    this._cardTitle.textContent = this._cardName;

    return this._element
  }
}

export default Card;