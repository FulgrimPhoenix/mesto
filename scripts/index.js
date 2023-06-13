const editBottom = document.querySelector('.profile__button-image');
const addImage = document.querySelector('.profile__add-button-image');
let popup = document.querySelector('.popup');
const exitButton = document.querySelector('.popup__exit');
let profileInfo = document.querySelector('.profile__cell');
let saveButton = document.querySelector('.popup__save-button');
let Name = document.querySelector('.profile__name');
let Speciality = document.querySelector('.profile__info');
let likeButton = document.querySelectorAll('.photo-grid__like-button-image');
let form = popup.querySelector('.popup__form');
let inputFormName = document.querySelector('.popup__input_field_name');
let inputFormSpeciality = document.querySelector('.popup__input_field_speciality');
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


initialCards.forEach((item) => {
const cardTamplate = document.querySelector('#photo-grid__cell').content;
const card = document.querySelector('.photo-grid');
const cardElements = cardTamplate.querySelector('.photo-grid__cell').cloneNode(true);

  cardElements.querySelector('.photo-grid__photo').src = item.link;
  cardElements.querySelector('.photo-grid__photo').alt = item.name;
  cardElements.querySelector('.photo-grid__title').textContent = item.name;

  cardElements.querySelector('.photo-grid__like-button-image').addEventListener('click', () => {
  cardElements.querySelector('.photo-grid__like-button-image').classList.toggle('photo-grid__like-button-image_active')})
  cardElements.querySelector('.photo-grid__delete-button').addEventListener('click', () => {
  const deleteButton = cardElements.querySelector('.photo-grid__delete-button').closest('.photo-grid__cell')
  deleteButton.remove();});
  cardElements.querySelector('.photo-grid__photo').addEventListener('click', () => {
  const popupPictureOpened = document.querySelector('.popup-picture');
  popupPictureOpened.classList.add('popup-picture_opened');
  popupPictureOpened.querySelector('.popup-picture__photo').src = item.link;
  popupPictureOpened.querySelector('.popup-picture__photo').alt = item.name;
  popupPictureOpened.querySelector('.popup-picture__title').textContent = item.name;

  popupPictureOpened.querySelector('.popup-picture__exit').addEventListener('click', () => {
  popupPictureOpened.classList.add('popup-picture_closed');  
  setTimeout( function () {popupPictureOpened.classList.remove('popup-picture_opened', 'popup-picture_closed')}, 300)});
});



card.append(cardElements);})


  function openEditWindow() {
    popup.classList.add('popup_opened');
    inputFormName.value = Name.textContent;
    inputFormSpeciality.value = Speciality.textContent;

  return
  }

  function closeEditWindow(){
    popup.classList.add('popup_closed');
    setTimeout( function () {popup.classList.remove('popup_opened', 'popup_closed')}, 300)
  return
  }

  function saveChanges(evt){
    evt.preventDefault();

    Name.textContent = inputFormName.value;
    Speciality.textContent = inputFormSpeciality.value;

    popup.classList.remove('popup_opened');
    return
  }

editBottom.addEventListener('click', () => {
  popup.classList.add('popup_opened');
  popup.querySelector('.popup__title').textContent = 'Редактировать профиль';
  inputFormName.setAttribute("placeholder", 'Введите имя');
  inputFormSpeciality.setAttribute('placeholder', 'Введите специальность');
  inputFormName.value = Name.textContent;
  inputFormSpeciality.value = Speciality.textContent;
  saveButton.textContent = 'Сохранить';
});

addImage.addEventListener('click', () => { 
  popup.classList.add('popup_opened');
  popup.querySelector('.popup__title').textContent = 'Новое место';
  inputFormName.setAttribute("placeholder", 'Название');
  inputFormSpeciality.setAttribute('placeholder', 'Ссылка на картинку');
  inputFormName.value = '';
  inputFormSpeciality.value = '';
  saveButton.textContent = 'Создать';
})

exitButton.addEventListener('click', closeEditWindow);
form.addEventListener('submit', evt => {
  evt.preventDefault();
  if (saveButton.textContent === 'Сохранить'){
    Name.textContent = inputFormName.value;
    Speciality.textContent = inputFormSpeciality.value;
    popup.classList.remove('popup_opened');
    return
  }else if (inputFormSpeciality.value !== '') {
    const srcForm = inputFormSpeciality.value;
    const titleForm = inputFormName.value;
    const cardTamplate = document.querySelector('#photo-grid__cell').content;
    const card = document.querySelector('.photo-grid');
    const cardElements = cardTamplate.querySelector('.photo-grid__cell').cloneNode(true);

      cardElements.querySelector('.photo-grid__photo').src = srcForm;
      cardElements.querySelector('.photo-grid__photo').alt = titleForm;
      cardElements.querySelector('.photo-grid__title').textContent = titleForm;

      cardElements.querySelector('.photo-grid__like-button-image').addEventListener('click', () => {
      cardElements.querySelector('.photo-grid__like-button-image').classList.toggle('photo-grid__like-button-image_active');})

      cardElements.querySelector('.photo-grid__delete-button').addEventListener('click', () => {
        const deleteButton = cardElements.querySelector('.photo-grid__delete-button').closest('.photo-grid__cell')
        deleteButton.remove();
      });

      cardElements.querySelector('.photo-grid__photo').addEventListener('click', () => {
        const popupPictureOpened = document.querySelector('.popup-picture');
        popupPictureOpened.classList.add('popup-picture_opened');
        popupPictureOpened.querySelector('.popup-picture__photo').src = srcForm;
        popupPictureOpened.querySelector('.popup-picture__photo').alt = titleForm;
        popupPictureOpened.querySelector('.popup-picture__title').textContent = titleForm;

        popupPictureOpened.querySelector('.popup-picture__exit').addEventListener('click', () => {
          popupPictureOpened.classList.add('popup-picture_closed');
          setTimeout( function () {popupPictureOpened.classList.remove('popup-picture_opened', 'popup-picture_closed')}, 300);
        });
        cardElements.querySelector('.photo-grid__photo').addEventListener('click', () => {
          const popupPictureOpened = document.querySelector('.popup-picture');
          popupPictureOpened.classList.add('popup-picture_opened');
          popupPictureOpened.querySelector('.popup-picture__photo').src = srcForm;
          popupPictureOpened.querySelector('.popup-picture__photo').alt = titleForm;
          popupPictureOpened.querySelector('.popup-picture__title').textContent = titleForm;

          
        });
      });

    card.prepend(cardElements);
    popup.classList.remove('popup_opened');
  }else{
    popup.classList.remove('popup_opened');
  }
});


/*

function likeActivate(){
  for (let i = 0; i < 6; i++){
    likeButton[i].addEventListener('click', function likeCondition(){
      likeButton[i].classList.toggle('photo-grid__like-button-image_active');
    });
  }
}

likeActivate();*/