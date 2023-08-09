import initialCards from '../utils/initialCards.js';
import Card from '../components/Card.js';
import FormValidator from '../FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/popup.js';
//ПЕРЕМЕННЫЕ
const parametres = {
  formSelector: 'form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input-error_active',
  errorClass: 'form__input_validation_error'
}
const profile = document.querySelector('.profile');
//попапы
const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup-prifile');
const popupAddCard = document.querySelector('.popup-add-card');
const popupPicture = document.querySelector('.popup-picture');
const popupPicpureImage = popupPicture.querySelector('.popup-picture__photo');
const popupPicpureTitle = popupPicture.querySelector('.popup-picture__title');
//кнопки
const exitButtons = document.querySelectorAll('.popup__exit');
const editProfileButtonOpenPopup = profile.querySelector('.profile__button-image');
const addCardButtonOpenPopup = profile.querySelector('.profile__add-button-image');
//формы
const forms = document.querySelectorAll('.form')
const formAddCard = document.querySelector('.popup__add-card');
const formEditProfile = document.querySelector('.popup__profile');
const formProfileName = document.querySelector('.form__input_field_name');
const formProfileSpeciality = document.querySelector('.form__input_field_speciality');
const formCardName = formAddCard.querySelector('.popup__input_field_title');
const formCardReference = formAddCard.querySelector('.popup__input_field_link');
//поля профиля
const profileName = profile.querySelector('.profile__name');
const profileSpeciality = profile.querySelector('.profile__info');
formProfileName.value = profileName.textContent;
formProfileSpeciality.value = profileSpeciality.textContent;
//карточки
const spaceForCards = document.querySelector('.photo-grid');
//ФУНКЦИИ
//откарытие попапа
function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}
//Закрытие попапа
function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}
//скрытие текущего попапа
function hideClosestPopup (event) {
  closePopup(event.target.closest('.popup'));
}

//редактирование профиля
function saveProfileChandes (){
  profileName.textContent = formProfileName.value;
  profileSpeciality.textContent = formProfileSpeciality.value;
}
//добавление слушателя escape
function closePopupByEsc(event){
    if (event.key === 'Escape'){
      closePopup(document.querySelector('.popup_opened'));
}}
function createCard(item){
  const cardCreater = new Card('#photo-grid__cell', item);
  const newCardElement = cardCreater.generateCard();
  return newCardElement
}
function fillProfileInputs(){
  formProfileName.value = profileName.textContent;
  formProfileSpeciality.value = profileSpeciality.textContent;
}
//ФУНКЦИОНАЛ
popups.forEach((item) => {
  item.addEventListener('click', (event)=>{
    if (event.target.classList.contains('popup')){
      closePopup(item);
    }
  });
})
editProfileButtonOpenPopup.addEventListener('click', () => {
  popupList['popup-prifile'].open();
  fillProfileInputs();
  formValidators['popup__profile'].resetValidation()
});

formEditProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  saveProfileChandes();
  hideClosestPopup (evt);
});

addCardButtonOpenPopup.addEventListener('click', () => {
  popupList['popup-add-card'].open();
  formAddCard.reset();
  formValidators['popup__add-card-form'].resetValidation()
});

exitButtons.forEach(item => {item.addEventListener('click', (event) => hideClosestPopup (event));})

const cardList = new Section ({
  items: initialCards, 
  renederer: (item) => {
    const card = new Card('#photo-grid__cell', item);
    const cardElement = card.generateCard();
    cardList._setItem(cardElement);
}
}, spaceForCards);
cardList.renderItems()

formAddCard.addEventListener('submit', evt => {
  evt.preventDefault();
  const data = {
    name: `${formCardName.value}`,
    link: `${formCardReference.value}`
  };
  spaceForCards.prepend(createCard(data));
  hideClosestPopup (evt);
});

const formValidators = {}
const popupList = {}

forms.forEach((form) => {
  const validator = new FormValidator(parametres, form);
  validator.enableValidation()

  formValidators[form.name] = validator 
})

popups.forEach((item) => {
  const popup = new Popup(item);

  popupList[item.id] = popup;
})

console.log(formValidators)
console.log(popupList)

export { popupPicture, popupPicpureImage, popupPicpureTitle, openPopup, popupList }