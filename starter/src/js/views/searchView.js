class searchView {
  _parentEl = document.querySelector('.search');
  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }
  addHandlerSearch(handler) {
    this._parentEl.addEventListener('click', function (e) {
      e.preventDefault();
      handler();
    });
  }
  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }
}
export default new searchView();
