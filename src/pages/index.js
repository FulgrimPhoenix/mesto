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
const popupDeleteCard = document.querySelector('.popup-delete-card');
const popupEditProfileAvatar = document.querySelector('.popup-avatar')
//кнопки
const editProfileButtonOpenPopup = document.querySelector('.profile__button-image');
const editAvatarButton = document.querySelector('.profile__avatar-cage')
const addCardButtonOpenPopup = document.querySelector('.profile__add-button-image');
const popupDeleteCardButton = popupDeleteCard.querySelector('.form__submit_delete-button')
const likeCounter = document.querySelector('.photo-grid__like-counter')
//формы
const forms = document.querySelectorAll('.form');
const popupDeleteCardForm = document.querySelector('.popup__delete-card')
const popupEditProfile = document.querySelector('.popup__profile')
const formAddCard = document.querySelector('.popup__add-card');
const formProfileName = document.querySelector('.form__input_field_name');
const formProfileSpeciality = document.querySelector('.form__input_field_speciality');
const formEditAvatar = document.querySelector('.popup__avatar')
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
function createCard (dataList){
  const newCard = new Card('#photo-grid__cell', dataList,{
    handleCardClick: () => {
      cardPopup.open( dataList.link, dataList.name);
    },
    deleteCardPopup: () => {
      const id = dataList._id;
      deletePopup.open();
      deletePopup.setEventListeners();
      popupDeleteCardForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
        newCard.deleteCard();
        api.deleteCard(id)
          .then((res) => res.json())
          .then((data) => console.log(data))
      deletePopup.close();
      });
    }
  });
  return newCard
}

function renderAllCards (host){
  host.getMyUserInfo()
  .then((data) => {
    const myId = data._id
    host.getCardsInfo()
    .then((cardsData) => {
      cardsData.forEach((id) => {
        if(id.owner._id === myId){
          cardList.renderMyItems(id);
        }else{
          cardList.renderOwnItems(id);
        }})
    })
  })
}
//установка числа лайков на каждую картинку
function setLikeNumber(item, currentCard) {
  currentCard.querySelector('.photo-grid__like-counter').textContent = item.likes.length;
}
function likeThis(item, currentCard){
  api.likeThisCard(item._id)
    .then((data) => {currentCard.querySelector('.photo-grid__like-counter').textContent = data.likes.length})
}
function unLikeThis(item, currentCard){
  api.unLikeThisCard(item._id)
    .then((data) => currentCard.querySelector('.photo-grid__like-counter').textContent = data.likes.length)
}

//инициализация страницы
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-73/',
  authorization: {
    authorization: 'aeff4cf2-7ae0-4790-a6f0-e4391c199a3c',
    'Content-Type': 'application/json'
  }});
//обновление информации в профиле
function initializationProfile(){
  api.getMyUserInfo()
    .then((data) => {
      profileName.textContent = data.name;
      profileSpeciality.textContent = data.about;
      avatar.src = data.avatar;
    })
    .catch((err) => {
      console.log(err);
    }); 
}
initializationProfile();
//функциональность реадктирования профиля
const profileForm = new PopupWithForm(popupProfile, {
  popupForm: popupEditProfile,
  submit: (data) => {
    api.editProfileInfo(data['field-name'], data['field-speciality'])
    .then((data) => {
      popupEditProfile.querySelector('.form__submit').textContent = 'Сохранение...'
      profileName.textContent = data.name;
      profileSpeciality.textContent = data.about;
    })
    .catch((err) => {
      console.log(err);
    });;
    api.getMyUserInfo()
      .then((userData) => {
        userInfo.setUserInfo(userData.name, userData.about);
        popupEditProfile.querySelector('.form__submit').textContent = 'Сохранить';
      })
      .catch((err) => {
        console.log(err);
      });
    profileForm.close();
  }
})
//функция лайка
function toggleLikeStatus(item, cardElement){
  api.getMyUserInfo()
    .then((data) => {
      const myId = data._id
      const currentId = item._id;
      api.getCardsInfo()
        .then((data) => {
          data.forEach((el) => {
            if (el._id === currentId){
              const a = el.likes.some(item => {
                if(item._id === myId){
                  return true
                }
              })
              if (a){
                return unLikeThis(item, cardElement)
              }else{
                return likeThis(item, cardElement)
              }
            }
          })
        })
      })
      .catch((err) => {
        console.log(err);
      });
}
//статус лайка при инициализации
function currentLikedList(){
  const likedCards = []
  api.getMyUserInfo()
    .then((data) => {
      const myId = data._id
      api.getCardsInfo()
        .then((data) => {
          data.forEach((el) => {
             const a = el.likes.some(item => {
              if(item._id === myId){
                return true
              }
            })
          if(a){likedCards.push(el._id)}
          })
        })
        .catch((err) => {
          console.log(err);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  return likedCards
}

//рендеринг лайков
const LikedList = currentLikedList()

function changeLikeStatus(item, cardElement){
  LikedList.forEach((el) => {
    if(item._id === el){
      cardElement.querySelector('.photo-grid__like-button-image').classList.add('photo-grid__like-button-image_active')
    }
  }
  )
}

//функция добавления карточки
const newCard = new PopupWithForm(popupAddCard, { 
  popupForm: formAddCard,
  submit: (data) => {
    const dataList = {
      name: data['field-title'],
      link: data['field-url']
    };
    const card = createCard(dataList);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
    api.addNewCard(dataList.name, dataList.link)
    .catch((err) => {
      console.log(err);
    });
    newCard.close()
  }
})

const cardPopup = new PopupWithImage( popupPicture );
const deletePopup = new Popup(popupDeleteCard);
const editAvatarPopup = new PopupWithForm (popupEditProfileAvatar, {
  popupForm: formEditAvatar,
  submit: (data) => {
    const dataList = {
      link: data['field-url']
    };
    api.updateAvatar(dataList.link)
      .then((data) => avatar.src = data.avatar)
      .catch((err) => {
        console.log(err);
      });
    editAvatarPopup.close()
  }
})
const userInfo = new UserInfo({name: profileName, description: profileSpeciality});

cardPopup.setEventListeners();
profileForm.setEventListeners();
newCard.setEventListeners();
editAvatarPopup.setEventListeners();

renderAllCards(api);

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
    const card = createCard(item);
    const cardElement = card.generateCard();
    setLikeNumber(item, cardElement);
    changeLikeStatus(item, cardElement);
    cardElement.querySelector('.photo-grid__like-button-image').addEventListener('click', () => toggleLikeStatus(item, cardElement))
    cardList.setItem(cardElement); 
  }, 
  rendererOwnItems: (item) => {
    const card = createCard(item);
    const cardElement = card.generateCard();
    cardElement.querySelector('.photo-grid__delete-button').classList.add('photo-grid__delete-button_disabled');
    setLikeNumber(item, cardElement);
    changeLikeStatus(item, cardElement);
    cardElement.querySelector('.photo-grid__like-button-image').addEventListener('click', () => toggleLikeStatus(item, cardElement))
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
