import actionTypes from '../actions/actionTypes';
import { LOGGED_IN, LOGGED_OUT, LOGIN_CANCELLED, LOGIN_ERROR } from './../statusTypes';
import initialState from './initialState';

export default function userRole(state = initialState.login, action) {
  let newState;
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      newState = {...state, status: LOGGED_IN};
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
      newState = {...state, status: LOGGED_OUT};
      return newState;
    case actionTypes.LOGIN_ERROR:
      newState = {...state, status: LOGIN_ERROR};
      return newState;
    case actionTypes.LOGIN_CANCELLED:
      newState = {...state, status: LOGIN_CANCELLED};
      return newState;
    default:
      return state;
  }
}
