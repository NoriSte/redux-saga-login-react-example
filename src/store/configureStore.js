import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import { logActions, loginFlow } from './../sagas';


export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware()
  const composeArgs = [
    applyMiddleware(sagaMiddleware),
    applyMiddleware(thunk),
  ];
  if(window && window.__REDUX_DEVTOOLS_EXTENSION__) {
    composeArgs.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  const store = createStore(
    rootReducer,
    compose.apply(undefined, composeArgs)
  );

  sagaMiddleware.run(loginFlow);
  sagaMiddleware.run(logActions);

  return store;
}
