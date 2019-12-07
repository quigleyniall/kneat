import { ActionTypes, Action } from '../actions';

const loading = (state: boolean = false, action: Action) => {
  switch (action.type) {
    case ActionTypes.loading:
      return action.payload;
    default:
      return state;
  }
};

export default loading;
