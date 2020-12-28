import * as Actions from "./action";
import initialState from "../store/initialState";

export const IconReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.FETCH_ICONS:
			return action.payload;
		case Actions.ADD_ICON:
			return [...state, action.payload];
		case Actions.DELETE_ICON:
			return state.filter((iconData) => iconData.userId !== action.payload);
		case Actions.RESET_ICON:
			return action.payload;
		default:
			return state;
	}
};
