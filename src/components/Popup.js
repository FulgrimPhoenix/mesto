class Popup{
  constructor(selector){
    this._popup = selector;
    this.close = this.close.bind(this)
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  open(){
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close(){
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose)
  }

  _handleEscClose(){
    if (event.key === 'Escape'){
      this.close()
    }
  }
  _closeByMissclick(){
    this._popup.addEventListener('click', (event)=>{
      if (event.target.classList.contains('popup')){
        console.log('11')
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