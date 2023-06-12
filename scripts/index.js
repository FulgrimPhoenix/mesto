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
    cardElements.querySelector('.photo-grid__like-button-image').classList.toggle('photo-grid__like-button-image_active');
  });


card.append(cardElements);})


  function openEditWindow() {
    popup.classList.add('popup_opened');
    inputFormName.value = Name.textContent;
    inputFormSpeciality.value = Speciality.textContent;
  return
  }

  function closeEditWindow(){
    popup.classList.remove('popup_opened');
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