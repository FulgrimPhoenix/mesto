let editBottom = document.querySelector('.profile__button-image');
let popup = document.querySelector('.popup');
let exitButton = document.querySelector('.popup__exit');
let profileInfo = document.querySelector('.profile__cell');
let saveButton = document.querySelector('.popup__save-button');
let Name = document.querySelector('.profile__name');
let Speciality = document.querySelector('.profile__info');
let likeButton = document.querySelectorAll('.photo-grid__like-button-image');
let form = popup.querySelector('.popup__form');
let inputFormName = document.querySelector('.popup__input_field_name');
let inputFormSpeciality = document.querySelector('.popup__input_field_speciality');

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

editBottom.addEventListener('click', openEditWindow);
exitButton.addEventListener('click', closeEditWindow);
form.addEventListener('submit', saveChanges);


function likeActivate(){
  for (let i = 0; i < 6; i++){
    likeButton[i].addEventListener('click', function likeCondition(){
      likeButton[i].classList.toggle('photo-grid__like-button-image_active');
    });
  }
}

likeActivate();