let editBottom = document.querySelector('.profile__button');
let form = document.querySelector('.form');
let exitButton = document.querySelector('.form__exit');
let formWindow = document.querySelector('.form__background');
let profileInfo = document.querySelector('.profile__cell');
let saveButton = document.querySelector('.form__save-button');
let formName = document.querySelector('.form__name');
let formInfo = document.querySelector('.form__info');

  function openEditWindow() {
    form.classList.add('form_active');
  return
  }

  function closeEditWindow(){
    form.classList.remove('form_active');
  return
  }

  function saveChanges(){
    formName = document.querySelector('.form__name');
    formInfo = document.querySelector('.form__info');

    console.log(formName.value);
    console.log(formInfo.value);

    formName.setAttribute('placeholder', formName.value);
    formInfo.setAttribute('placeholder', formInfo.value);

    profileInfo.innerHTML = `<h2 class="profile__name">${formName.value}</h2>
    <p class="profile__info">${formInfo.value}</p>`

    console.log('x');
    formName.value = '';
    formInfo.value = '';
    form.classList.remove('form_active');
    return
  }

editBottom.addEventListener('click', openEditWindow);
exitButton.addEventListener('click', closeEditWindow);
saveButton.addEventListener('click', saveChanges);
