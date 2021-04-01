import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchListPosts } from "../components/actions/listPosts";
import { IPost } from "../types";

const Index = ({ dispatch, listPosts }) => {
	useEffect(() => {
		dispatch(fetchListPosts());
	}, [dispatch]);

	return (
		<div>
			<ul>
				{listPosts.listPosts.map((post: IPost) => (
					<li key={post.id}>
						<h4>{post.title}</h4>
						<p>{post.body}</p>
						<hr />
					</li>
				))}
			</ul>
		</div>
	);
};

export default connect((state) => state)(Index);
