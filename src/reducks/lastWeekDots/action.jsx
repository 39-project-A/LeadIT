export const FETCH_LAST_WEEK_DOTS = "FETCH_LAST_WEEK_DOTS";
export const fetch_lastWeekDots = (lastWeekDots) => {
	return {
		type: FETCH_LAST_WEEK_DOTS,
		payload: lastWeekDots,
	};
};
