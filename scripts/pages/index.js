import initialCards from '../utils/initialCards.js';
import Card from '../components/Card.js';
import FormValidator from '../FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
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
const popupProfile = document.querySelector('.popup-profile');
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
//карточки
const spaceForCards = document.querySelector('.photo-grid');
//ФУНКЦИОНАЛ

editProfileButtonOpenPopup.addEventListener('click', () => {
  popupList['popup-profile'].open();
  popupList['popup-profile'].setEventListeners();
  const userInfo = new UserInfo({name: profileName, description: profileSpeciality});
  const profileData = userInfo.getUserInfo();
  formProfileName.value = profileData['currentName'];
  formProfileSpeciality.value = profileData['currentAbout'];
  formValidators['popup__profile'].resetValidation();
});

addCardButtonOpenPopup.addEventListener('click', () => {
  popupList['popup-add-card'].open();
  popupList['popup-add-card'].setEventListeners();
  formAddCard.reset();
  formValidators['popup__add-card-form'].resetValidation()
});

const cardList = new Section ({
  items: initialCards, 
  renederer: (item) => {
    const card = new Card('#photo-grid__cell', item, {
      handleCardClick: () => {
        const cardPopup = new PopupWithImage( popupPicture, item);
        cardPopup.open();
        cardPopup.setEventListeners();
      }
    });
    const cardElement = card.generateCard();
    cardList._setItem(cardElement);
}
}, spaceForCards);

cardList.renderItems();

const newCard = new PopupWithForm(popupAddCard, { 
  submit: () => {
    const itemData = newCard._getInputValues();
    const data = {
      name: itemData['field-title'],
      link: itemData['field-url']
    };
    const card = new Card('#photo-grid__cell', data,{
      handleCardClick: () => {
        const cardPopup = new PopupWithImage( popupPicture, data);
        cardPopup.open();
        cardPopup.setEventListeners();
      }
    });
    const cardElement = card.generateCard()
    cardList.addItem(cardElement);
    newCard.close()
  }
})
newCard.setEventListeners()

const formValidators = {}
const popupList = {}

forms.forEach((form) => {
  const validator = new FormValidator(parametres, form);
  validator.enableValidation()

  formValidators[form.name] = validator 
})

const profileForm = new PopupWithForm(popupProfile, {
  submit: () => {
    const formData =  profileForm._getInputValues();
    const userInfo = new UserInfo({name: profileName, description: profileSpeciality});
    userInfo.setUserInfo(formData['field-name'], formData['field-speciality'])
    profileForm.close();
  }
})
profileForm.setEventListeners();

popups.forEach((item) => {
  const popup = new Popup(item);
  popupList[item.id] = popup;
})

export { popupPicture, popupPicpureImage, popupPicpureTitle, popupList, popupProfile }