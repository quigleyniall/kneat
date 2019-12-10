import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { initialState } from './initialState';
import rootReducer from './rootReducer';

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(thunk))
);

export default store;
