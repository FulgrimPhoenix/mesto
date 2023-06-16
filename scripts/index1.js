const profile = document.querySelector('.profile');
//попапы
const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup-prifile');
const popupAddCard = document.querySelector('.popup-add-card');
const popupPicture = document.querySelector('.popup-picture');
//кнопки
const exitButtons = document.querySelectorAll('.popup__exit');
const editProfileButton = profile.querySelector('.profile__button-image');
const addCardButton = profile.querySelector('.profile__add-button-image');
//карточки
const cardTamplate = document.querySelector('#photo-grid__cell').content;
const cardElements = cardTamplate.querySelector('.photo-grid__cell').cloneNode(true);


function openPopup (a) {
  a.classList.add('popup_opened');
}

function closePopup () {
  const el = event.target.closest('.popup');

  setTimeout (() => {el.classList.remove('popup_opened', 'popup-picture_closed')}, 300)
}

function addCard () {

}


editProfileButton.addEventListener('click', () => openPopup(popupProfile));
addCardButton.addEventListener('click', () => openPopup(popupAddCard));

exitButtons.forEach((item) => {item.addEventListener('click', () => closePopup());})
