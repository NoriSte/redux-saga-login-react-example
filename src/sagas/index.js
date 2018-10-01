import { get } from 'axios';
import { call, cancel, cancelled, fork, put, take } from 'redux-saga/effects';

export function fakeAuthorize (user, password) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await get('http://localhost:3001/login');
      resolve(result.data.token);
    } catch(error) {
      reject(error);
    }
  });
}

export function* authorize(user, password) {
  try {
    const token = yield call(fakeAuthorize, user, password)
    yield put({type: 'LOGIN_SUCCESS'})
    yield put({type: 'SAVE_TOKEN', token});
  } catch(error) {
    yield put({type: 'LOGIN_ERROR', error})
  }
  finally {
    if (yield cancelled()) {
      yield put({type: 'LOGIN_CANCELLED'})
    }
  }
}

export function* loginFlow() {
  while (true) {
    const {user, password} = yield take('LOGIN_REQUEST')
    const task = yield fork(authorize, user, password)
    const action = yield take(['LOGOUT', 'LOGIN_ERROR'])
    if (action.type === 'LOGOUT') {
      yield cancel(task)
      yield put({type: 'DELETE_TOKEN'})
    }
  }
}
