const forms = document.querySelectorAll('.form');
//проверка валидности каждого инпута
function inputCheck(inputList){
  inputListArray = Array.from(inputList);
  return inputListArray.some((item) => {
    return (!item.validity.valid)
  })
}

//
function showInputError(currentForm, currentInput, errorMessage){

}
//состояние сабмита
function submitToggle(inputList, currentButton, errorMarker){
  inputListArray = Array.from(inputList);
  if (inputCheck(inputListArray)){
    currentButton.classList.add(errorMarker);
  }else{
    currentButton.classList.remove(errorMarker);
  }
}
//валидация инпута
function validation (currentForm, currentInput){
  if (!currentInput.validity.valid){
    showInputError(currentForm, currentInput, currentInput.validationMessage);
  }else{
    hideInputError(currentForm, currentInput);
  }
}

//ФУНКЦИОНАЛ
function enableValidation(parametres){
  parametres.formSelector.forEach((currentForm)=>{
    const inputList = Array.from(currentForm.querySelectorAll(parametres.inputSelector));
    const currentButton = currentForm.querySelector(parametres.submitButtonSelector);
    submitToggle(inputList, currentButton, parametres.inactiveButtonClass);
    inputList.forEach((currentInput)=>{
      currentInput.addEventListener('input', () => {
        validation(currentForm, currentInput);
        submitToggle(inputList, currentButton, parametres.inactiveButtonClass);
      });
    })
  });
}
const a = {
  formSelector: 'form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: '.form__submit_disbled',
  inputErrorClass: '.form__input-error_active',
};

console.log(a.formSelector)

//formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass