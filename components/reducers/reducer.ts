import { combineReducers } from "redux";

import { listPostsReducer as listPosts } from "./listPosts";
import { postReducer as post } from "./post";

export const reducer = combineReducers({
	post,
	listPosts,
});
