import icons from 'url:../../img/icons.svg';
export default class view {
  _data;
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newmarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newmarkup);
    const newElement = Array.from(newDom.querySelectorAll('*'));
    const currentElement = Array.from(this._parentEl.querySelectorAll('*'));
    newElement.forEach((el, i) => {
      const currEl = currentElement[i];
      if (!el.isEqualNode(currEl) && el.firstChild?.nodeValue.trim() !== '') {
        currEl.textContent = el.textContent;
      }
      if (!el.isEqualNode(currEl)) {
        Array.from(el.attributes).forEach(att => {
          currEl.setAttribute(att.name, att.value);
        });
      }
    });
  }
  _clear() {
    this._parentEl.innerHTML = '';
  }

  renderSpinner = function (parentEl) {
    const markup = `
      <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  };
  renderError(message = this._erroMessage) {
    const markup = `<div class="error"><div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message = this._message) {
    const markup = `<div class="message"><div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
