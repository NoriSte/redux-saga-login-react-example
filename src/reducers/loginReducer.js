import actionTypes from '../actions/actionTypes';
import initialState from './initialState';

export default function userRole(state = initialState.login, action) {
  let newState;
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      newState = {...state, status: 'logged in'};
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
      newState = {...state, status: 'logged out'};
      return newState;
    case actionTypes.LOGIN_ERROR:
      newState = {...state, status: 'login error'};
      return newState;
    case actionTypes.LOGIN_CANCELLED:
      newState = {...state, status: 'login cancelled'};
      return newState;
    default:
      return state;
  }
}
