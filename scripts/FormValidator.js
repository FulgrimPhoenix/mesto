class FormValidator{
  constructor(parametres, currentForm){
    this._currentForm = currentForm;
    this._formSelector = parametres.formSelector;
    this._inputSelector = parametres.inputSelector;
    this._submitButtonSelector = parametres.submitButtonSelector;
    this._inactiveButtonClass = parametres.inactiveButtonClass;
    this._inputErrorClass = parametres.inputErrorClass;
    this._errorClass = parametres.errorClass;
    this._inputList = Array.from(this._currentForm.querySelectorAll(this._inputSelector));
  }
  //показать ошибку валидации
  _showInputError(item){
      const errorSpan = this._currentForm.querySelector(`.${item.id}-error`);
      item.classList.add(this._errorClass);
      errorSpan.textContent = item.validationMessage;
      errorSpan.classList.add(this._inputErrorClass);
  }
  //скрыть ошибку валидации
  _hideInputError(item){
      const errorSpan = this._currentForm.querySelector(`.${item.id}-error`);
      item.classList.remove(this._errorClass);
      errorSpan.textContent = '';
      errorSpan.classList.remove(this._inputErrorClass);
  }
  //проверка инпута
  _validateInput (item){
    if (!item.validity.valid){
      this._showInputError(item);
    }else{
      this._hideInputError(item);
    }
  }
  //проверка инпутов формы на валидность
  _hasInvalidInput(){
    return this._inputList.some((item) => {
      return (!item.validity.valid)
    })
  }
  //включить кнопку
  _switchingOffButton(){
    this._currentForm.querySelector(this._submitButtonSelector).classList.add(this._inactiveButtonClass);
    this._currentForm.querySelector(this._submitButtonSelector).setAttribute("disabled", "disabled");
  }
  //выключить кнопку
  _switchingOnButton(){
    this._currentForm.querySelector(this._submitButtonSelector).classList.remove(this._inactiveButtonClass);
    this._currentForm.querySelector(this._submitButtonSelector).removeAttribute("disabled", "disabled");
  }
  //анализатор состояния формы
  _toggleSubmit(){
    if (this._hasInvalidInput()){
      this._switchingOffButton();
    }else{
      this._switchingOnButton();
    }
  }
  resetValidation() {
    this._inputList.forEach((input) => {
      this._hideInputError(input)
    })
    this._toggleSubmit()
  }
  //активация валидации
  enableValidation(){
    this._inputList.forEach(item => {
      item.addEventListener('input', () => {
        this._validateInput(item);
        this._toggleSubmit();
      })
    })
  }
}

export default FormValidator;
