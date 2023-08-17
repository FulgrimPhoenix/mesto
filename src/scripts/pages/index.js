import '../../pages/index.css'
import initialCards from '../utils/initialCards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { parametres } from '../utils/constants.js'
//попапы
const popupProfile = document.querySelector('.popup-profile');
const popupAddCard = document.querySelector('.popup-add-card');
const popupPicture = document.querySelector('.popup-picture');
//кнопки
const editProfileButtonOpenPopup = document.querySelector('.profile__button-image');
const addCardButtonOpenPopup = document.querySelector('.profile__add-button-image');
//формы
const forms = document.querySelectorAll('.form')
const formAddCard = document.querySelector('.popup__add-card');
const formProfileName = document.querySelector('.form__input_field_name');
const formProfileSpeciality = document.querySelector('.form__input_field_speciality');
//поля профиля
const profileName = document.querySelector('.profile__name');
const profileSpeciality = document.querySelector('.profile__info');
//карточки
const spaceForCards = document.querySelector('.photo-grid');
//
const formValidators = {}

//ФУНКЦИОНАЛ
function test (dataList){
  const newCard = new Card('#photo-grid__cell', dataList,{
    handleCardClick: () => {
      cardPopup.open( dataList.link, dataList.name);
    }
  });
  return newCard
}
//открытие попапа профиля
editProfileButtonOpenPopup.addEventListener('click', () => {
  profileForm.open();
  const profileData = userInfo.getUserInfo();
  formProfileName.value = profileData['currentName'];
  formProfileSpeciality.value = profileData['currentAbout'];
  formValidators['popup__profile'].resetValidation();
});
//открытие попапа добавления карточек
addCardButtonOpenPopup.addEventListener('click', () => {
  newCard.open();
  newCard.resetValue()
  formValidators['popup__add-card-form'].resetValidation()
});
//инициализация блока карточек
const cardList = new Section ({
  items: initialCards, 
  renederer: (item) => {
    const card = new Card('#photo-grid__cell', item, {
      handleCardClick: () => {
        cardPopup.open(item.link, item.name);
      }
    });
    const cardElement = card.generateCard();
    cardList.setItem(cardElement);
}
}, spaceForCards);

cardList.renderItems();
//функция добавления карточки
const newCard = new PopupWithForm(popupAddCard, { 
  submit: (data) => {
    const dataList = {
      name: data['field-title'],
      link: data['field-url']
    };
    const card = test(dataList);
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
  submit: (data) => {
    console.log(data['field-name'])
    userInfo.setUserInfo(data['field-name'], data['field-speciality'])
    profileForm.close();
  }
})
profileForm.setEventListeners();

const cardPopup = new PopupWithImage( popupPicture );
const userInfo = new UserInfo({name: profileName, description: profileSpeciality});

cardPopup.setEventListeners();
profileForm.setEventListeners();
newCard.setEventListeners();