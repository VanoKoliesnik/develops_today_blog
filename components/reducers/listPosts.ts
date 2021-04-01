import { AnyAction } from "redux";

import { IListPosts } from "../../types";

import { FETCH_LIST_OF_POSTS } from "../../constants";

const initialState: IListPosts = {
	listPosts: [],
};

export const listPostsReducer = (state: IListPosts = initialState, action: AnyAction) => {
	switch (action.type) {
		case FETCH_LIST_OF_POSTS:
			return {
				...state,
				listPosts: action.payload,
			};

		default:
			return state;
	}
};
