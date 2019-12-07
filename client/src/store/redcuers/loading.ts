import { ActionTypes } from '../actions';

const loading = (state = false, action) => {
  switch (action.type) {
    case ActionTypes.loading:
      return action.payload;
    default:
      return state;
  }
};

export default loading;
