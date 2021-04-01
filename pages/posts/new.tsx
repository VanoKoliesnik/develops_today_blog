import { useEffect } from "react";
import { connect } from "react-redux";
import { createPost } from "../../components/actions/post";

const NewPost = ({ dispatch }) => {
	return <div>New Post</div>;
};

export default connect((state) => state)(NewPost);
