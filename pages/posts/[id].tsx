import { useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";

import { fetchPostById } from "../../components/actions/post";

const Post = ({ dispatch, post }) => {
	const { id } = useRouter().query;

	useEffect(() => {
		dispatch(fetchPostById(+id));
	}, [dispatch, id]);

	return (
		<>
			<div>Post_id is {id}</div>

			{post ? <div>{post.post.title}</div> : <p>Loading ...</p>}
		</>
	);
};

export default connect((state) => state)(Post);
