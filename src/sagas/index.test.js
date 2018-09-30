import { call, cancel, cancelled, fork, put, take } from 'redux-saga/effects';
import { createMockTask } from 'redux-saga/utils';
import { authorize, fakeAuthorize, loginFlow } from './index';

describe('login saga effects', () => {
  describe('standard login flow', () => {
    const gen = loginFlow();
    const credentials = {user: 'ste', password: 'admin'};
    const authorizeForkMock = createMockTask(fork(authorize, credentials.user, credentials.password));

    test('it waits for a LOGIN_REQUEST action', () => {
      expect(gen.next().value).toEqual(take('LOGIN_REQUEST'));
    });
    test('then it forks the authorize method', () => {
      expect(gen.next(credentials).value).toEqual(fork(authorize, credentials.user, credentials.password));
    });
    test('then it waits for a LOGOUT or LOGIN_ERROR action', () => {
      expect(gen.next(authorizeForkMock).value).toEqual(take(['LOGOUT', 'LOGIN_ERROR']));
    });
    test('then it cancels the authorize call on a LOGOUT action', () => {
      expect(gen.next({type: 'LOGOUT'}).value).toEqual(cancel(authorizeForkMock));
    });
    test('then it triggers a DELETE_TOKEN action', () => {
      expect(gen.next().value).toEqual(put({type: 'DELETE_TOKEN'}));
    });
    test('and finally it waits again for a LOGIN_REQUEST action', () => {
      expect(gen.next().value).toEqual(take('LOGIN_REQUEST'));
    });
  });

  describe('login error flow', () => {
    const gen = loginFlow();
    const credentials = {user: 'ste', password: 'admin'};
    const authorizeForkMock = createMockTask(fork(authorize, credentials.user, credentials.password));
    let value;

    beforeAll(() => {
      // send the generator straight to the LOGIN_ERROR management
      gen.next();
      gen.next(credentials);
      gen.next(authorizeForkMock);
      value = gen.next({type: 'LOGIN_ERROR'});
    });

    test('if a LOGIN_ERROR action happens it doesn\'t cancel the authorize task (because it\'s the authorize task itself that triggers the LOGIN_ERROR action)', () => {
      expect(value).not.toEqual(cancel(authorizeForkMock));
    });
    test('neither it triggers a DELETE_TOKEN action', () => {
      expect(value).not.toEqual(put({type: 'DELETE_TOKEN'}));
    });
  });
});


describe('authorize saga effects', () => {
  const credentials = {user: 'ste', password: 'admin'};
  const fakeToken = 100;
  let gen;
  describe('standard login flow', () => {
    beforeAll(() => {
      gen = authorize(credentials.user, credentials.password);
    });
    test('it calls the authorization method', () => {
      expect(gen.next().value).toEqual(call(fakeAuthorize, credentials.user, credentials.password));
    });
    test('then it triggers a LOGIN_SUCCESS action', () => {
      expect(gen.next(fakeToken).value).toEqual(put({type: 'LOGIN_SUCCESS'}));
    });
    test('then it triggers a SAVE_TOKEN action', () => {
      expect(gen.next().value).toEqual(put({type: 'SAVE_TOKEN', token:fakeToken}));
    });
    test('finally it checks if it\'s been cancelled by another generator', () => {
      expect(gen.next().value).toEqual(cancelled());
    });
  });

  describe('external cancellation', () => {
    beforeAll(function () {
      // send the generator straight to the cencelled() check
      gen = authorize(credentials.user, credentials.password);
      gen.next();
      gen.next(fakeToken);
      gen.next();
      gen.next();
    });
    test('It triggers a LOGIN_CANCELLED action if cancelled externally', () => {
      expect(gen.next(true).value).toEqual(put({type: 'LOGIN_CANCELLED'}));
    });
  });

  describe('login error flow', () => {
    beforeAll(() => {
      gen = authorize(credentials.user, credentials.password);
      gen.next();
    });
    test('it triggers a LOGIN_ERROR action in case of login error', () => {
      expect(gen.throw('Login error').value).toEqual(put({type: 'LOGIN_ERROR', error:'Login error'}));
    });
  });
});
