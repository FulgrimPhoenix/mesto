class Section {
  constructor({ renedererMyItems, rendererOwnItems }, selector) {
    this._rendererMyItems = renedererMyItems;
    this._rendererOwnItems = rendererOwnItems;
    this._container = selector;
  }

  setItem(el){
    this._container.append(el)
  }

  addItem(el){
    this._container.prepend(el)
  }

  renderMyItems(item){
    this._rendererMyItems(item);
  }

  renderOwnItems(item){
    this._rendererOwnItems(item)
  }
}

export default Section;