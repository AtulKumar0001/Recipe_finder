import icons from 'url:../../img/icons.svg';
import view from './View.js';
import previewView from './previewView.js';

class resultView extends view {
  _parentEl = document.querySelector('.results');
  _erroMessage = 'No recipe found for your query. Please try another one!';
  _message = '';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}
export default new resultView();
