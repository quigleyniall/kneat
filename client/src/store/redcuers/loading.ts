import { ActionTypes, Action } from '../actions';

const initialState = false;

const loading = (state: boolean = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.loading:
      return action.payload;
    default:
      return state;
  }
};

export default loading;
