import * as Actions from "./action";
import initialState from "../store/initialState";

export const OneWeekDotsReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.FETCH_ONE_WEEK_DOTS:
			return action.payload;
		default:
			return state;
	}
};