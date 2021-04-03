import axios from "axios";
import { Dispatch } from "redux";

import {
	API_URL,
	FETCH_POST_BY_ID,
	CLEAN_UP_POST,
	BEGIN_LOADING,
	END_LOADING,
	CREATE_ERROR,
	REMOVE_ERROR,
} from "../../constants";
import { IComment, IPost } from "../../types";

export const fetchPostById = (postId: number) => (dispatch: Dispatch) => {
	dispatch({ type: BEGIN_LOADING });
	return axios
		.get(`${API_URL}/posts/${postId}?_embed=comments`)
		.then(({ data }) => {
			dispatch({ type: END_LOADING });
			dispatch({ type: REMOVE_ERROR });
			dispatch({ type: FETCH_POST_BY_ID, payload: data });
		})
		.catch((err) => {
			dispatch({ type: END_LOADING });
			dispatch({ type: CREATE_ERROR, payload: err });
		});
};

export const createPost = (post: IPost) => (dispatch: Dispatch) => {
	dispatch({ type: BEGIN_LOADING });
	return axios
		.post(`${API_URL}/posts`, post)
		.then(() => {
			dispatch({ type: END_LOADING });
			dispatch({ type: REMOVE_ERROR });
		})
		.catch((err) => {
			dispatch({ type: END_LOADING });
			dispatch({ type: CREATE_ERROR, payload: err });
		});
};

export const createComment = (comment: IComment) => (dispatch: Dispatch) => {
	dispatch({ type: BEGIN_LOADING });
	return axios
		.post(`${API_URL}/comments`, comment)
		.then(() => {
			axios
				.get(`${API_URL}/posts/${comment.postId}?_embed=comments`)
				.then(({ data }) => {
					dispatch({ type: END_LOADING });
					dispatch({ type: REMOVE_ERROR });
					dispatch({ type: FETCH_POST_BY_ID, payload: data });
				})
				.catch((err) => {
					dispatch({ type: END_LOADING });
					dispatch({ type: CREATE_ERROR, payload: err });
				});
		})
		.catch((err) => {
			dispatch({ type: END_LOADING });
			dispatch({ type: CREATE_ERROR, payload: err });
		});
};

export const cleanUpPost = () => (dispatch: Dispatch) => {
	return dispatch({ type: CLEAN_UP_POST });
};
