import { FC, useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import styled from "styled-components";

import Header from "../../components/Header";

import { fetchPostById } from "../../components/actions/post";
import { IPost } from "../../types";

const StyledMain = styled.main`
	padding: 20px;
	padding-top: 80px;
`;

interface IPostItemProps {
	post: {
		post: IPost;
	};
}

const PostItem: FC<IPostItemProps> = ({ post }) => {
	return (
		<div>
			<h2>{post.post.title}</h2>

			<p>{post.post.body}</p>
		</div>
	);
};

const Post = ({ dispatch, post }) => {
	const { id } = useRouter().query;

	useEffect(() => {
		dispatch(fetchPostById(+id));
	}, [dispatch, id]);

	return (
		<>
			<Header />

			<StyledMain>{post ? <PostItem post={post} /> : <p>Loading ...</p>}</StyledMain>
		</>
	);
};

export default connect((state) => state)(Post);
