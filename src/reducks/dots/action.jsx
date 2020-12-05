export const ADD_DOT = "ADD_DOT";
export const add_dot = (dot) => {
	return {
		type: ADD_DOT,
		payload: dot,
	};
};

export const FETCH_DOT = "FETCH_DOT";
export const fetch_dot = (dot) => {
	return {
		type: FETCH_DOT,
		payload: dot,
	};
};

export const DELETE_DOT = "DELETE_DOT";
export const delete_dot = (dot) => {
	return {
		type: DELETE_DOT,
		payload: dot,
	};
};
