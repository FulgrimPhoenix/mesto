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

  _toggleLikeStatus(){
    this._element.querySelector('.photo-grid__like-button-image').addEventListener('click', evt => {
      evt.target.closest('.photo-grid__like-button-image').classList.toggle('photo-grid__like-button-image_active')
    })
  }

  _deleteCard(){
    this._element.querySelector('.photo-grid__delete-button').addEventListener('click', evt => {
      evt.target.closest('.photo-grid__cell').remove();
    })
  }

  _openPopup(){
    const popupPicture = document.querySelector('.popup-picture');

    this._element.querySelector('.photo-grid__photo').addEventListener('click', () => {
    popupPicture.classList.add('popup_opened');
    document.addEventListener('keydown', event => this._addKeyboardListener(event));
    popupPicture.querySelector('.popup-picture__photo').src = this._cardLink;
    popupPicture.querySelector('.popup-picture__photo').alt = this._cardName;
    popupPicture.querySelector('.popup-picture__title').textContent = this._cardName;
    })
  }

  _addKeyboardListener(event){
    if (event.key === 'Escape'){
      const popupPicture = document.querySelector('.popup-picture');
      popupPicture.classList.remove('popup_opened');
      document.removeEventListener('keydown', event => this._addKeyboardListener(event));
    }
  }

  _setEventListeners(){
    this._deleteCard();//логика удаления
    this._toggleLikeStatus();//логика лайка
    this._openPopup()//открытие полноэкранной картинки
  }

  generateCard(){
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.photo-grid__photo').src = this._cardLink;
    this._element.querySelector('.photo-grid__photo').alt = this._cardName;
    this._element.querySelector('.photo-grid__title').textContent = this._cardName;

    return this._element
  }
}

export default Card;