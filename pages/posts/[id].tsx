import { FC, useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import styled from "styled-components";
import Head from "next/head";
import { Comment, Image } from "semantic-ui-react";

import Header from "../../components/Header";

import { fetchPostById, cleanUpPost } from "../../components/actions/post";
import { IPost } from "../../types";

const StyledMain = styled.main`
	padding: 20px;
	padding-top: 90px;
`;

interface IPostItemProps {
	post: {
		post: IPost;
	};
}

const CommentItem = ({ comment }) => (
	<Comment key={comment.id}>
		<Comment.Content>
			<Image
				avatar
				fluid
				rounded={false}
				src={`https://avatar.oxro.io/avatar.svg?name=${comment.id[0].toUpperCase()}&background=1b1c1d&length=1`}
			/>

			{comment.body}
		</Comment.Content>
	</Comment>
);

const PostItem: FC<IPostItemProps> = ({ post }) => {
	return (
		<div>
			<h2>{post.post.title}</h2>

			<p>{post.post.body}</p>

			{post.post.comments ? (
				<>
					<h4>Comment Section</h4>
					{post.post.comments.map((comment) => (
						<CommentItem comment={comment} key={comment.id} />
					))}
				</>
			) : null}
		</div>
	);
};

const Post = ({ dispatch, post }) => {
	const { id } = useRouter().query;

	useEffect(() => {
		dispatch(fetchPostById(+id));
	}, [dispatch, id]);

	useEffect(() => {
		return () => {
			dispatch(cleanUpPost());
		};
	}, []);

	return (
		<>
			<Head>
				<title>Post</title>
			</Head>

			<Header />

			<StyledMain>{post ? <PostItem post={post} /> : <p>Loading ...</p>}</StyledMain>
		</>
	);
};

export default connect((state) => state)(Post);
