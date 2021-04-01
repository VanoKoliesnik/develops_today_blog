import axios from "axios";
import { Dispatch } from "redux";

import { API_URL, FETCH_POST_BY_ID } from "../../constants";
import { IPost } from "../../types";

export const fetchPostById = (postId: number) => (dispatch: Dispatch) =>
	axios
		.get(`${API_URL}/posts/${postId}?_embed=comments`)
		.then(({ data }) => {
			console.log(data);
			dispatch({ type: FETCH_POST_BY_ID, payload: data });
		})
		.catch((err) => console.log(err));

export const createPost = (post: IPost) => (dispatch: Dispatch) =>
	axios
		.post(`${API_URL}/posts`, post)
		.then((res) => console.log(res))
		.catch((err) => console.log(err));
