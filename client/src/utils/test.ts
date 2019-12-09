import { checkPropTypes } from 'prop-types';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../store/rootReducer';

const middlwares = [thunk];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const findByTestAttr = (wrapper: any, dataTestId: string) => {
  return wrapper.find(`[data-test="${dataTestId}"]`);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const checkProps = (component: any, conformingProps: any) => {
  const propError = checkPropTypes(
    component.propTypes,
    conformingProps,
    'prop',
    component.name
  );
  // eslint-disable-next-line no-undef
  expect(propError).toBeUndefined();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const storeFactory = (initialState: any) => {
  const createStoreWithMiddleware = applyMiddleware(...middlwares)(createStore);
  return createStoreWithMiddleware(rootReducer, initialState);
};
