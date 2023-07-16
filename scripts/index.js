import Card from './card.js'
import FormValidator from './validate.js'

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
//кнопки
const exitButtons = document.querySelectorAll('.popup__exit');
const editProfileButtonOpenPopup = profile.querySelector('.profile__button-image');
const addCardButtonOpenPopup = profile.querySelector('.profile__add-button-image');
const saveProfileChandesButton = document.querySelector('.form__submit_save-button')
//формы
const forms = document.querySelectorAll('.form')
const formAddCard = document.querySelector('.form__add-card');
const formEditProfile = document.querySelector('.popup__profile');
const formProfileName = document.querySelector('.form__input_field_name');
const formProfileSpeciality = document.querySelector('.form__input_field_speciality');
//поля профиля
const profileName = profile.querySelector('.profile__name');
const profileSpeciality = profile.querySelector('.profile__info');
formProfileName.value = profileName.textContent;
formProfileSpeciality.value = profileSpeciality.textContent;
//карточки
const spaceForCards = document.querySelector('.photo-grid');
//начальные карточки
const initialCards = [
  {
    name: 'Хобби',
    link: 'https://sun9-39.userapi.com/impg/F5uBeuRTa4sM2bXcMwPy_UcWya-2gfkkwDMtxA/E3qWJ8c1FNA.jpg?size=1080x703&quality=96&sign=65fcfa629d491703b34c356bd242639a&type=album'
  },
  {
    name: 'Meme',
    link: 'https://sun9-37.userapi.com/impg/g9rioXRJgbI4-GHOw_bQHnBYWn6rYcXNDu8Qvg/rniLcSmXfo8.jpg?size=1500x1500&quality=95&sign=ee43bbe862665114551d77be471f8beb&type=album'
  },
  {
    name: 'Красотка',
    link: 'https://sun1-24.userapi.com/impg/ICULICkIU9DbsLlR9cB5YeadF3hpE07EIiLSRQ/aIoKut2hddk.jpg?size=1074x1073&quality=96&sign=8b5c3658e4367c75409bde24ace24542&type=album'
  },
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
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
//состояние сабмита. Я пытался импортировать эту функцию из validate, но если я правильно понял - бразер отказывается ссылаться на скрипты без http/https, так что импорты нге работают.
function switchingOffButton(currentButton, errorMarker){
  currentButton.classList.add(errorMarker);
  currentButton.setAttribute("disabled", "disabled");
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
  openPopup(popupProfile);
  formProfileName.value = profileName.textContent;
  formProfileSpeciality.value = profileSpeciality.textContent;
});

formEditProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  saveProfileChandes();
  hideClosestPopup (evt);

});

addCardButtonOpenPopup.addEventListener('click', () => {
  openPopup(popupAddCard);
  formCardName.value = '';
  formCardReference.value = '';
});

exitButtons.forEach(item => {item.addEventListener('click', (event) => hideClosestPopup (event));})

initialCards.forEach(item => {
  const CardCreater = new Card('#photo-grid__cell', item);
  const newCardElement = CardCreater.generateCard();

  spaceForCards.append(newCardElement)
})

document.querySelector('.popup__add-card').addEventListener('submit', evt => {
  evt.preventDefault();
  const formCardName = formAddCard.querySelector('.popup__input_field_title');
  const formCardReference = formAddCard.querySelector('.popup__input_field_link');
  const data = {
    name: `${formCardName.value}`,
    link: `${formCardReference.value}`
  };

  const CardCreater = new Card('#photo-grid__cell', data);
  const newCardElement = CardCreater.generateCard();

  formCardName.value = '';
  formCardReference.value = '';

  spaceForCards.prepend(newCardElement);
  hideClosestPopup (evt);
});


forms.forEach(item => {
  const currentForm = new FormValidator(parametres, item)
  currentForm.enableValidation()
})



