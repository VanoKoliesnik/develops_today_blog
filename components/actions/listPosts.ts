import axios from "axios";
import { Dispatch } from "redux";

import {
	API_URL,
	FETCH_LIST_OF_POSTS,
	BEGIN_LOADING,
	END_LOADING,
	SET_ERROR,
} from "../../constants";

export const fetchListPosts = () => (dispatch: Dispatch) => {
	dispatch({ type: BEGIN_LOADING });
	axios
		.get(`${API_URL}/posts?_embed=comments`)
		.then(({ data }) => {
			dispatch({ type: END_LOADING });
			dispatch({ type: FETCH_LIST_OF_POSTS, payload: data });
		})
		.catch((err) => {
			dispatch({ type: END_LOADING });
			dispatch({ type: SET_ERROR, payload: err });
		});
};
