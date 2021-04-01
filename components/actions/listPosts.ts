import axios from "axios";
import { Dispatch } from "redux";

import { API_URL, FETCH_LIST_OF_POSTS } from "../../constants";

export const fetchListPosts = () => (dispatch: Dispatch) =>
	axios
		.get(`${API_URL}/posts?_embed=comments`)
		.then(({ data }) => {
			dispatch({ type: FETCH_LIST_OF_POSTS, payload: data });
		})
		.catch((err) => console.log(err));
