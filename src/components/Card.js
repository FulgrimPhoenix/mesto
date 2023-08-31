class Card {
  constructor(templateSelector, data, likeData, { handleCardClick, deleteCardPopup, likeThisCard } ){
    this._templateSelector = templateSelector;
    this._cardName = data.name;
    this._cardLink = data.link;
    this._likeNumber = likeData.number;
    this._likeStatus = likeData.status;
    this._handleCardClick = handleCardClick;
    this._deleteCardPopup = deleteCardPopup;
    this._likeThisCard = likeThisCard;
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
    this._likeCounter = this._element.querySelector('.photo-grid__like-counter');
  }

  _toggleLikeStatus(){
    this._cardLikeButton.classList.toggle('photo-grid__like-button-image_active');
    }
  editLikeCounter(likeNumber){
    this._likeCounter.textContent = likeNumber;
  }
  _setLikeStatus(){
    if(this._likeStatus){
      this._cardLikeButton.classList.add('photo-grid__like-button-image_active');
    }
    this._likeCounter.textContent = this._likeNumber;
  }

  deleteCard(){
    this._element.remove();
  }

  _setEventListeners(){
    this._cardLikeButton.addEventListener('click', () => this._likeThisCard());
    this._element.querySelector('.photo-grid__delete-button').addEventListener('click', () => this._deleteCardPopup());
    this._cardImage.addEventListener('click', () => this._handleCardClick())
  }

  generateCard(){
    this._element = this._getTemplate();
    this._setCardParametres();
    this._setEventListeners();
    this._setLikeStatus();

    this._cardImage.src = this._cardLink;
    this._cardImage.alt = this._cardName;
    this._cardTitle.textContent = this._cardName;

    return this._element
  }
}

export default Card;