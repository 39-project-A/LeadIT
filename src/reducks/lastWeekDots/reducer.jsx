import * as Actions from "./action";
import initialState from "../store/initialState";

export const LastWeekDotsReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.FETCH_LAST_WEEK_DOTS:
			return action.payload;
		default:
			return state;
	}
};