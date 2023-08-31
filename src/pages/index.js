import '../index.css'
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { parametres, popupPicpureImage, popupPicpureTitle } from '../utils/constants.js';
import Api from '../components/Api';
import Popup from '../components/Popup';
import PopupForDelete from '../components/PopupForDelete';
//попапы
const popupProfile = document.querySelector('.popup-profile');
const popupAddCard = document.querySelector('.popup-add-card');
const popupPicture = document.querySelector('.popup-picture');
const popupDeleteCard = document.querySelector('.popup-delete-card');
const popupEditProfileAvatar = document.querySelector('.popup-avatar')
//кнопки
const editProfileButtonOpenPopup = document.querySelector('.profile__button-image');
const editAvatarButton = document.querySelector('.profile__avatar-cage')
const addCardButtonOpenPopup = document.querySelector('.profile__add-button-image');
const AddCardSubmit = document.querySelector('.form__submit_create-button')
//формы
const forms = document.querySelectorAll('.form');
const popupEditProfile = document.querySelector('.popup__profile')
const formAddCard = document.querySelector('.popup__add-card');
const formProfileName = document.querySelector('.form__input_field_name');
const formProfileSpeciality = document.querySelector('.form__input_field_speciality');
const formEditAvatar = document.querySelector('.popup__avatar');
const profileSubmit = popupEditProfile.querySelector('.form__submit');
//поля профиля
const profileName = document.querySelector('.profile__name');
const profileSpeciality = document.querySelector('.profile__info');
//карточки
const avatar = document.querySelector('.profile__avatar')
const spaceForCards = document.querySelector('.photo-grid');
//
const formValidators = {}
const formList = {}
//ФУНКЦИОНАЛ
const userInfo = new UserInfo({name: profileName, description: profileSpeciality, avatar: avatar});

function renderAllCards (host, myId){
    host.getCardsInfo()
    .then((cardsData) => {
      cardsData.forEach((id) => {
        if(id.owner._id === myId){
          cardList.renderMyItems(id);
        }else{
          cardList.renderOwnItems(id);
        }})
    })
    .catch((err) => {
      console.log(err);
    })
}
//инициализация страницы
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-73/',
  authorization: {
    authorization: 'aeff4cf2-7ae0-4790-a6f0-e4391c199a3c',
    'Content-Type': 'application/json'
  }});

//обновление информации в профиле
const myUserInfo = await api.getMyUserInfo()
  .catch((err) => {
    console.log(err);
  })

const serverCards = await api.getCardsInfo()
renderAllCards(api, myUserInfo._id);
//логика лайка
//проверка содержания айди
function checkForCount(massiv, neededId){
  const a = massiv.likes.some(item => {
    if(item._id === neededId){
      return true
    }
  })
  return a
}
//
function createCard (dataList, likeData){
  const newCard = new Card('#photo-grid__cell', dataList, likeData, {
    handleCardClick: () => {
      cardPopup.open( dataList.link, dataList.name);
    },
    deleteCardPopup: (newCard) => {
      console.log(newCard);
      deletePopup.open(dataList._id);
    },
    likeThisCard: () => {
      api.getCardsInfo()
        .then((res) => {
          res.forEach((el) => {
            if (el._id === dataList._id){
              if (!checkForCount(el, myUserInfo._id)){
                api.likeThisCard(el._id)
                .then((data) => {
                  newCard._toggleLikeStatus();
                  newCard.editLikeCounter(data.likes.length)
                })
                .catch((err) => {
                  console.log(err);
                })
              }else{
                api.unLikeThisCard(el._id)
                .then((data) => {
                  newCard._toggleLikeStatus();
                  newCard.editLikeCounter(data.likes.length);
                })
                .catch((err) => {
                  console.log(err);
                })
              }
            }
          })
        })
        .catch((err) => {
          console.log(err);
        })
    }})
  return newCard
}
///

function likeStatus(item, cardList, likeInfo){
  cardList.forEach((el) => {  
        if(item._id === el._id){
        likeInfo['number'] = item.likes.length;
          if (checkForCount(el, myUserInfo._id)){
            likeInfo['status'] = true;
          }else{
            likeInfo['status'] = false;
          }
        }
      }
    )
  }
////////
userInfo.setUserInfo(myUserInfo.name, myUserInfo.about, myUserInfo.avatar)
//функциональность реадктирования профиля
const profileForm = new PopupWithForm(popupProfile, {
  popupForm: popupEditProfile,
  submit: (data) => {
    api.editProfileInfo(data['field-name'], data['field-speciality'])
    .then((data) => {
      profileSubmit.textContent = 'Сохранение...'
      userInfo.setUserInfo(data.name, data.about, data.avatar)
    })
    .then(() => {
      profileForm.close()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {profileSubmit.textContent = 'Сохранить'})
  }
})
//функция добавления карточки
const newCard = new PopupWithForm(popupAddCard, { 
  popupForm: formAddCard,
  submit: (data) => {
    const dataList = {
      name: data['field-title'],
      link: data['field-url']
    };    
    api.addNewCard(dataList.name, dataList.link)
    .then((data) => {
      AddCardSubmit.textContent = 'Создание...'
      const likeInfo = {}
      likeStatus(data, serverCards, likeInfo);
      const card = createCard(data, likeInfo);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    })
    .then(() => {
      newCard.close()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {AddCardSubmit.textContent = 'Создать'})
  }
})

const cardPopup = new PopupWithImage( popupPicture, popupPicpureImage, popupPicpureTitle );
const deletePopup = new PopupForDelete(popupDeleteCard, {
  submit: (currentId) => {
    api.deleteCard(currentId)
      .then(()=> { deletePopup.close()})
      .then(()=> {location.reload()})
      .catch((err) => {
        console.log(err);
      })
  }
});
const editAvatarPopup = new PopupWithForm (popupEditProfileAvatar, {
  popupForm: formEditAvatar,
  submit: (data) => {
    const dataList = {
      link: data['field-url-avatar']
    };
    api.updateAvatar(dataList.link)
      .then((data) => avatar.src = data.avatar)
      .then(() => {editAvatarPopup.close()})
      .catch((err) => {
        console.log(err);
      });
    editAvatarPopup.close()
  }
})

cardPopup.setEventListeners();
profileForm.setEventListeners();
newCard.setEventListeners();
editAvatarPopup.setEventListeners();
deletePopup.setEventListeners();



//открытие редактирования аватвра
editAvatarButton.addEventListener('click', () => {
  editAvatarPopup.open();
  formValidators['popup__avatar'].resetValidation();
})

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
    const likeInfo = {}
    likeStatus(item, serverCards, likeInfo);
    const card = createCard(item, likeInfo);
    const cardElement = card.generateCard();
    cardList.setItem(cardElement);
  }, 
  rendererOwnItems: (item) => {
    const likeInfo = {}
    likeStatus(item, serverCards, likeInfo);
    const card = createCard(item, likeInfo);
    const cardElement = card.generateCard();
    cardElement.querySelector('.photo-grid__delete-button').classList.add('photo-grid__delete-button_disabled');
    cardList.setItem(cardElement);
  }
}, spaceForCards);

//активация валидации форм
forms.forEach((form) => {
  const validator = new FormValidator(parametres, form);
  validator.enableValidation()
  formList[form.name] = form;
  formValidators[form.name] = validator 
})
