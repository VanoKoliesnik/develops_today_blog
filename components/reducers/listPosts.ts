import { AnyAction } from "redux";

import { IListPosts } from "../../types";

import {
	FETCH_LIST_OF_POSTS,
	BEGIN_LOADING,
	END_LOADING,
	CREATE_ERROR,
	REMOVE_ERROR,
} from "../../constants";

const initialState: IListPosts = {
	listPosts: [],
	loading: 0,
	error: null,
};

export const listPostsReducer = (state: IListPosts = initialState, action: AnyAction) => {
	switch (action.type) {
		case FETCH_LIST_OF_POSTS:
			return {
				...state,
				listPosts: action.payload,
			};

		case BEGIN_LOADING:
			return {
				...state,
				loading: state.loading + 1,
			};

		case END_LOADING:
			return {
				...state,
				loading: state.loading - 1,
			};

		case CREATE_ERROR:
			return {
				...state,
				error: action.payload,
			};

		case REMOVE_ERROR:
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};
