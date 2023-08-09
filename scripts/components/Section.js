class Section {
  constructor({ 
    items,
    renederer}, selector) {
    this._initArray = items;
    this._renderer = renederer;
    this._container = selector;
  }

  _setItem(el){
    this._container.append(el)
  }

  addItem(el){
    this._container.prepend(el)
  }

  renderItems(){
    this._initArray.forEach(item => {
      this._renderer(item);
    })
  }

}

export default Section;