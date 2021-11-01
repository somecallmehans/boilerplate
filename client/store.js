import { createStore, applyMiddleware } from 'redux';
import appReducer from './redux';
import ThunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

export default createStore(
  appReducer,
  applyMiddleware(
    ThunkMiddleware, createLogger()
    )
  );
