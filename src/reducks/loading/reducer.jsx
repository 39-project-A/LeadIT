import * as Actions from "./action";
import initialState from "../store/initialState";

export const LoadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.COMPLETE_LOADING:
      return action.payload;
    default:
      return state;
  }
};
