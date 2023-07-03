//проверка валидности каждого инпута
function inputCheck(inputList){
  inputListArray = Array.from(inputList);
  return inputListArray.some((item) => {
    return (!item.validity.valid)
  })
}
//показать ошибку валидации
function showInputError(currentForm, currentInput, errorMessage, textErrorVision, inputErrorMarker){
  const errorSpan = currentForm.querySelector(`.${currentInput.id}-error`);
  currentInput.classList.add(inputErrorMarker);
  errorSpan.textContent = errorMessage;
  errorSpan.classList.add(textErrorVision);
}
//скрыть ошибку валидации
function hideInputError (currentForm, currentInput, textErrorVision, inputErrorMarker){
  const errorSpan = currentForm.querySelector(`.${currentInput.id}-error`);
  currentInput.classList.remove(inputErrorMarker);
  errorSpan.textContent = '';
  errorSpan.classList.remove(textErrorVision);
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
function validation (currentForm, currentInput, textErrorVision, inputErrorMarker){
  if (!currentInput.validity.valid){
    showInputError(currentForm, currentInput, currentInput.validationMessage, textErrorVision, inputErrorMarker);
  }else{
    hideInputError(currentForm, currentInput, textErrorVision, inputErrorMarker);
  }
}

//ФУНКЦИОНАЛ
function enableValidation(parametres){
  document.querySelectorAll(parametres.formSelector).forEach((currentForm)=>{
    const inputList = Array.from(currentForm.querySelectorAll(parametres.inputSelector));
    const currentButton = currentForm.querySelector(parametres.submitButtonSelector);
    submitToggle(inputList, currentButton, parametres.inactiveButtonClass);
    inputList.forEach((currentInput)=>{
      currentInput.addEventListener('input', () => {
        validation(currentForm, currentInput, parametres.inputErrorClass, parametres.errorClass);
        submitToggle(inputList, currentButton, parametres.inactiveButtonClass);
      });
    })
  });
}
enableValidation({
  formSelector: 'form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input-error_active',
  errorClass: 'form__input_validation_error'
});