export const FETCH_ONE_WEEK_DOTS = "FETCH_ONE_WEEK_DOTS";
export const fetch_oneWeekDots = (oneWeekDots) => {
	return {
		type: FETCH_ONE_WEEK_DOTS,
		payload: oneWeekDots,
	};
};