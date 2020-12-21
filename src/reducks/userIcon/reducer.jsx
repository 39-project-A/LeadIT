import * as Actions from "./action";
import initialState from "../store/initialState";

export const IconReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.FETCH_ICONS:
			return action.payload;
		default:
			return state;
	}
};
