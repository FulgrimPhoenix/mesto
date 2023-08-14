import '../../pages/index.css'
import initialCards from '../utils/initialCards.js';
import Card from '../components/Card.js';
import FormValidator from '../FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { parametres, popups, popupProfile, popupAddCard, popupPicture, editProfileButtonOpenPopup,
addCardButtonOpenPopup, forms, formAddCard, formProfileName,
formProfileSpeciality, profileName, profileSpeciality, spaceForCards,
formValidators, popupList } from '../utils/constants.js'
//ФУНКЦИОНАЛ
//открытие попапа профиля
editProfileButtonOpenPopup.addEventListener('click', () => {
  popupList['popup-profile'].open();
  popupList['popup-profile'].setEventListeners();
  const userInfo = new UserInfo({name: profileName, description: profileSpeciality});
  const profileData = userInfo.getUserInfo();
  formProfileName.value = profileData['currentName'];
  formProfileSpeciality.value = profileData['currentAbout'];
  formValidators['popup__profile'].resetValidation();
});
//открытие попапа добавления карточек
addCardButtonOpenPopup.addEventListener('click', () => {
  popupList['popup-add-card'].open();
  popupList['popup-add-card'].setEventListeners();
  formAddCard.reset();
  formValidators['popup__add-card-form'].resetValidation()
});
//инициализация блока карточек
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
//функция добавления карточки
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
//активация валидации форм
forms.forEach((form) => {
  const validator = new FormValidator(parametres, form);
  validator.enableValidation()

  formValidators[form.name] = validator 
})
//функциональность реадктирования профиля
const profileForm = new PopupWithForm(popupProfile, {
  submit: () => {
    const formData =  profileForm._getInputValues();
    const userInfo = new UserInfo({name: profileName, description: profileSpeciality});
    userInfo.setUserInfo(formData['field-name'], formData['field-speciality'])
    profileForm.close();
  }
})
profileForm.setEventListeners();
//базовая функциональность попапов
popups.forEach((item) => {
  const popup = new Popup(item);
  popupList[item.id] = popup;
})