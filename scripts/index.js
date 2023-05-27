let editBottom = document.querySelector('.profile__button');
let popup = document.querySelector('.popup');
let exitButton = document.querySelector('.popup__exit');
let profileInfo = document.querySelector('.profile__cell');
let saveButton = document.querySelector('.popup__save-button');
let Name = document.querySelector('.profile__name');
let Speciality = document.querySelector('.profile__info');
let likeButton = document.querySelectorAll('.photo-grid__like-button-image');
let form = popup.querySelector('.popup__form')

  function openEditWindow() {
    popup.classList.add('popup_opened');
  return
  }

  function closeEditWindow(){
    popup.classList.remove('popup_opened');
  return
  }

  

  function saveChanges(evt){
    evt.preventDefault();
    inputFormName = document.querySelector('.popup__input_field_name');
    inputFormSpeciality = document.querySelector('.popup__input_field_speciality');

    Name.textContent = inputFormName.value;
    Speciality.textContent = inputFormSpeciality.value;

    inputFormName.value = '';
    inputFormSpeciality.value = '';
    popup.classList.remove('popup_opened');
    return
  }

editBottom.addEventListener('click', openEditWindow);
exitButton.addEventListener('click', closeEditWindow);
form.addEventListener('submit', saveChanges);
saveButton.addEventListener('click', saveChanges);

function likeActivate(){
  for (let i = 0; i < 6; i++){
    likeButton[i].addEventListener('click', function likeCondition(){
      likeButton[i].classList.toggle('photo-grid__like-button-image_active');
    });
  }
}

likeActivate();