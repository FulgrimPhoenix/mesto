//ПЕРЕМЕННЫЕ
const profile = document.querySelector('.profile');
//попапы
const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup-prifile');
const popupAddCard = document.querySelector('.popup-add-card');
const popupPicture = document.querySelector('.popup-picture');
//кнопки
const exitButtons = document.querySelectorAll('.popup__exit');
const editProfileButtonOpenPopup = profile.querySelector('.profile__button-image');
const addCardButtonOpenPopup = profile.querySelector('.profile__add-button-image');
const createCardButton = document.querySelector('.popup__create-button');
//формы
const formAddCard = document.querySelector('.popup__add-card-form');
const formCardName = formAddCard.querySelector('.popup__input_field_title');
const formCardReference = formAddCard.querySelector('.popup__input_field_link');
const formEditProfile = document.querySelector('.popup__form');
const formProfileName = formEditProfile.querySelector('.popup__input_field_name');
const formProfileSpeciality = formEditProfile.querySelector('.popup__input_field_speciality');
//поля профиля
const profileName = profile.querySelector('.profile__name');
const ProfileSpeciality = profile.querySelector('.profile__info');
//карточки
let spaceForCards = document.querySelector('.photo-grid');
const cardTamplate = document.querySelector('#photo-grid__cell').content;
const cardElements = cardTamplate.querySelector('.photo-grid__cell');
//начальные карточки
const initialCards = [
  {
    name: 'Хобби',
    link: 'https://sun9-39.userapi.com/impg/F5uBeuRTa4sM2bXcMwPy_UcWya-2gfkkwDMtxA/E3qWJ8c1FNA.jpg?size=1080x703&quality=96&sign=65fcfa629d491703b34c356bd242639a&type=album'
  },
  {
    name: 'Meme',
    link: 'https://sun9-45.userapi.com/impg/6Es7L-JNXZsPKdlw-OtzChWoWge1jTckBKR8fg/ycv-Z_Bjl1Y.jpg?size=1280x809&quality=95&sign=d49090423d1ab93a22afeda8ed5d4af7&type=album'
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
function openPopup (a) {
  formProfileName.value = profileName.textContent;
  formProfileSpeciality.value = ProfileSpeciality.textContent;
  a.classList.add('popup_opened');
}
//Закрытие попапа
function closePopup () {
  event.target.closest('.popup').classList.remove('popup_opened');
}
//лайк каточки
function changeLikeStatus () {
  event.target.closest('.photo-grid__like-button-image').classList.toggle('photo-grid__like-button-image_active');
}
//удаление карточки
function deleteCard () {
  event.target.closest('.photo-grid__cell').remove();
}
//создание карточки
function createCard (elem) {
  const newCard = cardElements.cloneNode(true);
  const newCardPhoto = newCard.querySelector('.photo-grid__photo');
  const newCardTitle = newCard.querySelector('.photo-grid__title');
  newCardPhoto.src = elem.link;
  newCardPhoto.alt = elem.name;
  newCardTitle.textContent = elem.name;
  newCard.querySelector('.photo-grid__like-button-image').addEventListener('click', () => changeLikeStatus());
  newCard.querySelector('.photo-grid__delete-button').addEventListener('click', () => deleteCard())
  return newCard
}
//внешнее добавление карточек
function addCard (cardName, cardLink) {
  let el = {}
  el.name = cardName;
  el.link = cardLink;
  return el
}
//редактирование профиля
function saveProfileChandes (){
  profileName.textContent = formProfileName.value;
  ProfileSpeciality.textContent = formProfileSpeciality.value;
}
//ФУНКЦИОНАЛ
editProfileButtonOpenPopup.addEventListener('click', () => openPopup(popupProfile));
addCardButtonOpenPopup.addEventListener('click', () => openPopup(popupAddCard));
exitButtons.forEach(item => {item.addEventListener('click', () => closePopup());})
initialCards.forEach(item => spaceForCards.append(createCard(item)))
formEditProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  saveProfileChandes();
  closePopup();
});
formAddCard.addEventListener('submit', evt => {
  evt.preventDefault();
  spaceForCards.prepend(createCard(addCard(formCardName.value, formCardReference.value)));
  closePopup();
});