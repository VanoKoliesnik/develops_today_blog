import { AnyAction } from "redux";

import { IPost } from "../../types";

import { FETCH_POST_BY_ID, CREATE_POST } from "../../constants";

const initialState: IPost | null = null;

export const postReducer = (state: IPost = initialState, action: AnyAction) => {
	switch (action.type) {
		case FETCH_POST_BY_ID:
			return {
				...state,
				post: action.payload,
			};

		case CREATE_POST:
			return state

		default:
			return state;
	}
};
