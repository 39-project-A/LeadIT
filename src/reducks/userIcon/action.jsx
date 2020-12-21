export const FETCH_ICONS = "FETCH_ICONS";
export const fetch_icons = (iconsData) => {
	return {
		type: FETCH_ICONS,
		payload: iconsData,
	};
};