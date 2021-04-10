import axios from "axios";
import { Dispatch } from "redux";

import {
	API_URL,
	FETCH_LIST_OF_POSTS,
	BEGIN_LOADING,
	END_LOADING,
	CREATE_ERROR,
	REMOVE_ERROR,
} from "../../constants";

export const fetchListPosts = () => (dispatch: Dispatch) => {
	dispatch({ type: BEGIN_LOADING });
	axios
		.get(`${API_URL}/posts?_embed=comments`)
		.then(({ data }) => {
			dispatch({ type: END_LOADING });
			dispatch({ type: FETCH_LIST_OF_POSTS, payload: data });
			dispatch({ type: REMOVE_ERROR });
		})
		.catch((err) => {
			dispatch({ type: END_LOADING });
			dispatch({ type: CREATE_ERROR, payload: err });
		});
};
