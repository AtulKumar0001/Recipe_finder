import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultsView.js';
import bookmarkView from './views/BookmarkView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addrecipeview.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import addrecipeview from './views/addrecipeview.js';

// if(module.hot){
//   module.hot.accept();
// }

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // update view mark to selected
    resultView.update(model.getSearchResultsPage());
    bookmarkView.update(model.state.bookmarks);

    // Load Recipe
    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResult = async function () {
  try {
    resultView.renderSpinner();
    //Getting search query
    const query = searchView.getQuery();
    if (!query) return;

    // load the result
    await model.loadSearchRecipe(query);
    // Render data
    resultView.render(model.getSearchResultsPage());
    //Pagination
    paginationView.render(model.state.search);
  } catch (err) {
    recipeView.renderError(err);
  }
};
const controlPagination = function (goToPage) {
  // Render New data
  resultView.render(model.getSearchResultsPage(goToPage));
  //Pagination
  paginationView.render(model.state.search);
};
const controlServings = function (newServing) {
  // Update the recipe servings
  model.updateServings(newServing);
  // Update the view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //Add or remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // Update view
  recipeView.update(model.state.recipe);
  // Render bookmark
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    //Render recipe
    recipeView.render(model.state.recipe);

    addRecipeView.renderMessage();

    //Render Bookmark View
    bookmarkView.render(model.state.bookmarks);

    //Change id in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addrecipeview.renderError(err.message);
  }
};
const init = function () {
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdate(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
