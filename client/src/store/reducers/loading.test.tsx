import { ActionTypes } from '../actions';
import loading from './loading';

test('returns loading is true', () => {
  const result = loading(false, {
    type: ActionTypes.loading,
    payload: true
  });
  expect(result).toBe(true);
});

test('returns loading is false', () => {
  const result = loading(true, {
    type: ActionTypes.loading,
    payload: false
  });
  expect(result).toBe(false);
});
