import axios from "axios";
import { Dispatch } from "redux";

import { API_URL, FETCH_POST_BY_ID, CLEAN_UP_POST } from "../../constants";
import { IComment, IPost } from "../../types";

// * BEGIN API SECTION
const apiFetchPostById = (postId: number, dispatch: Dispatch) => {
	return axios
		.get(`${API_URL}/posts/${postId}?_embed=comments`)
		.then(({ data }) => {
			dispatch({ type: FETCH_POST_BY_ID, payload: data });
		})
		.catch((err) => console.log(err));
};

const apiCreatePost = (post: IPost, dispatch: Dispatch) => {
	return axios
		.post(`${API_URL}/posts`, post)
		.then((res) => console.log(res))
		.catch((err) => console.log(err));
};

const apiCreateComment = (comment: IComment, dispatch: Dispatch) => {
	return axios
		.post(`${API_URL}/comments`, comment)
		.then((res) => {
			apiFetchPostById(comment.postId, dispatch);
			console.log(res);
		})
		.catch((err) => console.log(err));
};
// * END API SECTION

export const fetchPostById = (postId: number) => (dispatch: Dispatch) => {
	return apiFetchPostById(postId, dispatch);
};

export const createPost = (post: IPost) => (dispatch: Dispatch) => {
	return apiCreatePost(post, dispatch);
};

export const createComment = (comment: IComment) => (dispatch: Dispatch) => {
	return apiCreateComment(comment, dispatch);
};

export const cleanUpPost = () => (dispatch: Dispatch) => {
	return dispatch({ type: CLEAN_UP_POST });
};
