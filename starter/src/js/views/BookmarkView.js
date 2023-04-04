import icons from 'url:../../img/icons.svg';
import view from './View.js';
import previewView from './previewView.js';

class bookmarkView extends view {
  _parentEl = document.querySelector('.bookmarks__list');
  _erroMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}
export default new bookmarkView();
