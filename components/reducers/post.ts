import { AnyAction } from "redux";

import { IPost } from "../../types";

import {
	FETCH_POST_BY_ID,
	CREATE_POST,
	DELETE_POST,
	CREATE_COMMENT,
	CLEAN_UP_POST,
	BEGIN_LOADING,
	END_LOADING,
	CREATE_ERROR,
	REMOVE_ERROR,
} from "../../constants";

const initialState: IPost = {
	loading: 0,
	error: null,
};

export const postReducer = (state: IPost = initialState, action: AnyAction) => {
	switch (action.type) {
		case FETCH_POST_BY_ID:
			return {
				...state,
				post: action.payload,
			};

		case CREATE_POST:
			return state;

		case DELETE_POST:
			return {
				...initialState,
				removed: true,
			};

		case CREATE_COMMENT:
			return state;

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

		case CLEAN_UP_POST:
			return initialState;

		default:
			return state;
	}
};
