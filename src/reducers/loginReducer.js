import actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default function userRole(state = initialState.login, action) {
  let newState;
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      newState = {...state};
      return newState;
    case actionTypes.SAVE_TOKEN:
      newState = {...state, token: action.token};
      newState.token = action.token;
      return newState;
    case actionTypes.DELETE_TOKEN:
      newState = {...state, token: null};
      newState.token = null;
      return newState;
    case actionTypes.LOGOUT:
      newState = {...state};
      return newState;
    default:
      return state;
  }
}
