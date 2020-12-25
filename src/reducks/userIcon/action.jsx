export const FETCH_ICONS = "FETCH_ICONS";
export const fetch_icons = (iconsData) => {
	return {
		type: FETCH_ICONS,
		payload: iconsData,
	};
};

export const ADD_ICON = "ADD_ICON";
export const add_icon = (iconData) => {
	return {
		type: ADD_ICON,
		payload: iconData,
	};
};

export const DELETE_ICON = "DELETE_ICON";
export const delete_icon = (iconData) => {
	return {
		type: DELETE_ICON,
		payload: iconData.userId,
	};
};
