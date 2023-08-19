//ПЕРЕМЕННЫЕ
export const parametres = {
    formSelector: 'form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_disabled',
    inputErrorClass: 'form__input-error_active',
    errorClass: 'form__input_validation_error'
  }
//попапы
export const popups = document.querySelectorAll('.popup');
export const popupProfile = document.querySelector('.popup-profile');
export const popupAddCard = document.querySelector('.popup-add-card');
export const popupPicture = document.querySelector('.popup-picture');
export const popupPicpureImage = popupPicture.querySelector('.popup-picture__photo');
export const popupPicpureTitle = popupPicture.querySelector('.popup-picture__title');
//кнопки
export const editProfileButtonOpenPopup = document.querySelector('.profile__button-image');
export const addCardButtonOpenPopup = document.querySelector('.profile__add-button-image');
//формы
export const forms = document.querySelectorAll('.form')
export const formAddCard = document.querySelector('.popup__add-card');
export const formProfileName = document.querySelector('.form__input_field_name');
export const formProfileSpeciality = document.querySelector('.form__input_field_speciality');
//поля профиля
export const profileName = document.querySelector('.profile__name');
export const profileSpeciality = document.querySelector('.profile__info');
//карточки
export const spaceForCards = document.querySelector('.photo-grid');
//
export const formValidators = {}
export const popupList = {}
