import { ADD_USER, LOGIN, ADD_RECIPE, DELETE_RECIPE, GET_RECIPES, EDIT_USER, CHECK_SESSION } from "../constants";

const initialState = {
  currentUser: null,
  users: [],
  recipes: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_USER:
      state.currentUser = action.payload;
      return state;
    case LOGIN:
      state.currentUser = action.data;
      return state;
    case GET_RECIPES:
      state.recipes = action.data;
      return state;
    case EDIT_USER:
      state.currentUser = action.data;
      return state;
    case CHECK_SESSION:
      state.currentUser = action.data;
      return state;
    case ADD_RECIPE:
      state.recipes.push(action.data);
      return state;
    case DELETE_RECIPE:
      state.recipes.splice(state.recipes.findIndex(r => r._id === action.data._id), 1);
      return state;
    default:
      return state;
  }
}

export default rootReducer;