//ПЕРЕМЕННЫЕ
const profile = document.querySelector('.profile');
//попапы
const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup-prifile');
const popupaddCard = document.querySelector('.popup-add-card');
const popupPicture = document.querySelector('.popup-picture');
//кнопки
const exitButtons = document.querySelectorAll('.popup__exit');
const editProfileButtonOpenPopup = profile.querySelector('.profile__button-image');
const addCardButtonOpenPopup = profile.querySelector('.profile__add-button-image');
const createCardButton = document.querySelector('.form__submit_create-button');
const inactiveButtonClass = 'form__submit_disabled';
//формы
const formAddCard = document.querySelector('.popup__add-card');
const formCardName = formAddCard.querySelector('.form__input_field_title');
const formCardReference = formAddCard.querySelector('.form__input_field_link');
const formEditProfile = document.querySelector('.popup__profile');
const formProfileName = formEditProfile.querySelector('.form__input_field_name');
const formProfileSpeciality = formEditProfile.querySelector('.form__input_field_speciality');
//поля профиля
const profileName = profile.querySelector('.profile__name');
const profileSpeciality = profile.querySelector('.profile__info');
formProfileName.value = profileName.textContent;
formProfileSpeciality.value = profileSpeciality.textContent;
//карточки
const spaceForCards = document.querySelector('.photo-grid');
const cardTamplate = document.querySelector('#photo-grid__cell').content;
const cardElements = cardTamplate.querySelector('.photo-grid__cell');
const fullScreenCardPhoto = popupPicture.querySelector('.popup-picture__photo');
const fullScreenCardTitle = popupPicture.querySelector('.popup-picture__title');
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
//лайк каточки
function changeLikeStatus (event) {
  event.target.closest('.photo-grid__like-button-image').classList.toggle('photo-grid__like-button-image_active');
}
//удаление карточки
function deleteCard (event) {
  event.target.closest('.photo-grid__cell').remove();
}
//открытие полноэкранки
function transformToFullscreenCard (photoLink, photoTitle){
  fullScreenCardPhoto.src = photoLink;
  fullScreenCardPhoto.alt = photoTitle;
  fullScreenCardTitle.textContent = photoTitle;
}
//создание карточки
function createCard (elem) {
  const newCard = cardElements.cloneNode(true);
  const newCardPhoto = newCard.querySelector('.photo-grid__photo');
  const newCardTitle = newCard.querySelector('.photo-grid__title');
  const newCardLikeButton = newCard.querySelector('.photo-grid__like-button-image');
  const newCardDeleteButton = newCard.querySelector('.photo-grid__delete-button');
  newCardPhoto.src = elem.link;
  newCardPhoto.alt = elem.name;
  newCardTitle.textContent = elem.name;
  newCardLikeButton.addEventListener('click', (event) => changeLikeStatus(event));
  newCardDeleteButton.addEventListener('click', (event) => deleteCard(event));
  newCardPhoto.addEventListener('click', () => {
    const popup = popupPicture;
    openPopup(popup);
    transformToFullscreenCard(elem.link, elem.name);
  })
  return newCard
  }


//внешнее добавление карточек
function createCardData(cardName, cardLink) {
  return { name: cardName, link: cardLink }
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
addCardButtonOpenPopup.addEventListener('click', () => {
  openPopup(popupaddCard);
  formCardName.value = '';
  formCardReference.value = '';
});
exitButtons.forEach(item => {item.addEventListener('click', (event) => hideClosestPopup (event));})
initialCards.forEach(item => spaceForCards.append(createCard(item)))
formEditProfile.addEventListener('submit', (event) => {
  event.preventDefault();
  saveProfileChandes();
  hideClosestPopup (event);
});
formAddCard.addEventListener('submit', event => {
  event.preventDefault();
  spaceForCards.prepend(createCard(createCardData(formCardName.value, formCardReference.value)));
  switchingOffButton(createCardButton, inactiveButtonClass);
  hideClosestPopup (event);
});