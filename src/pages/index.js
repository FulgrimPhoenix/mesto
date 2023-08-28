import '../index.css'
import initialCards from '../utils/initialCards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { parametres } from '../utils/constants.js';
import Api from '../components/Api';
import Popup from '../components/Popup';
//попапы
const popupProfile = document.querySelector('.popup-profile');
const popupAddCard = document.querySelector('.popup-add-card');
const popupPicture = document.querySelector('.popup-picture');
const popupDeleteCard = document.querySelector('.popup-delete-card')
//кнопки
const editProfileButtonOpenPopup = document.querySelector('.profile__button-image');
const addCardButtonOpenPopup = document.querySelector('.profile__add-button-image');
const popupDeleteCardButton = popupDeleteCard.querySelector('.form__submit_delete-button')
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
const formList = {}

//ФУНКЦИОНАЛ
function createCard (dataList){
  const newCard = new Card('#photo-grid__cell', dataList,{
    handleCardClick: () => {
      cardPopup.open( dataList.link, dataList.name);
    },
    deleteCardPopup: () => {
      const id = dataList._id;
      deletePopup.open();
      deletePopup.setEventListeners();
      popupDeleteCardButton.addEventListener('click', (evt) => {
        evt.preventDefault();
        newCard.deleteCard();
        api.deleteCard(id)
          .then((res) => res.json())
          .then((dataa) => console.log(dataa))
      deletePopup.close();
      });
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
  formValidators['popup__add-card-form'].resetValidation()
});
//функциональность блока карточек
const cardList = new Section ({
  renedererMyItems: (item) => {
    const card = createCard(item);
    const cardElement = card.generateCard();
    cardList.setItem(cardElement);
  }, 
  rendererOwnItems: (item) => {
    const card = createCard(item);
    const cardElement = card.generateCard();
    cardElement.querySelector('.photo-grid__delete-button').classList.add('photo-grid__delete-button_disabled')
    cardList.setItem(cardElement);
  }
}, spaceForCards);


//функция добавления карточки
const newCard = new PopupWithForm(popupAddCard, { 
  submit: (data) => {
    const dataList = {
      name: data['field-title'],
      link: data['field-url']
    };
    api.addNewCard(dataList.name, dataList.link)
    // api.renderer()
    //   .then((data) => {
    //     cardList.renderItems(data);
    //   })
    newCard.close()
  }
})

//активация валидации форм
forms.forEach((form) => {
  const validator = new FormValidator(parametres, form);
  validator.enableValidation()
  formList[form.name] = form;
  formValidators[form.name] = validator 
})
//функциональность реадктирования профиля
const profileForm = new PopupWithForm(popupProfile, {
  submit: (data) => {
    api.editProfileInfo(data['field-name'], data['field-speciality']);
    api.getMyUserInfo()
      .then((userData) => {
        userInfo.setUserInfo(userData.name, userData.about)
      })
    profileForm.close();
  }
})
//
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-73/',
  authorization: {
    authorization: 'aeff4cf2-7ae0-4790-a6f0-e4391c199a3c',
    'Content-Type': 'application/json'
  }});

//добавление карточек с сервера
api.getMyUserInfo()
  .then((data) => {
    const myId = data._id
    api.renderer()
    .then((data) => {
      data.forEach((id) => {
        if(id.owner._id === myId){
          cardList.renderMyItems(id);
        }else{
          cardList.renderOwnItems(id);
        }})
    })
  })


const cardPopup = new PopupWithImage( popupPicture );
const deletePopup = new Popup(popupDeleteCard)
const userInfo = new UserInfo({name: profileName, description: profileSpeciality});

cardPopup.setEventListeners();
profileForm.setEventListeners();
newCard.setEventListeners();