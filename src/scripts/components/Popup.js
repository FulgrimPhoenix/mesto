class Popup{
  constructor(selector){
    this._popup = selector;
  }

  open(){
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose(this._popup));
  }

  close(){
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose)
  }

  _handleEscClose(popup){
      if (event.key === 'Escape'){
        console.log(this._popup)
        console.log('12')
        popup.classList.remove('popup_opened');
      }
  }
  _closeByMissclick(){
    this._popup.addEventListener('click', (event)=>{
      if (event.target.classList.contains('popup')){
        this.close();
      }
    });
  }
  setEventListeners(){
    this._popup.querySelector('.popup__exit').addEventListener('click', () => {
      this.close();
    });
    this._closeByMissclick();
  }
}

export default Popup