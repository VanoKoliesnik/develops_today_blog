import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import styled from "styled-components";
import Head from "next/head";
import { Button, Divider, Form, Grid } from "semantic-ui-react";

import Header from "../../components/Header";
import CommentItem from "../../components/CommentItem";

import { fetchPostById, cleanUpPost, createComment } from "../../components/actions/post";
import { IPost } from "../../types";

const StyledMain = styled.main`
	padding: 20px;
	padding-top: 90px;
`;

interface IPostItemProps {
	dispatch: Dispatch;
	post: {
		post: IPost;
	};
}

const PostItem: FC<IPostItemProps> = ({ dispatch, post }) => {
	return (
		<Grid.Column>
			<Grid.Row>
				<Grid.Column width={16}>
					<h2>{post.post.title}</h2>
				</Grid.Column>

				<Grid.Column width={16}>
					<p>{post.post.body}</p>
				</Grid.Column>
			</Grid.Row>

			<Divider />
			<Grid.Row>
				<Grid.Column>
					<NewComment dispatch={dispatch} postId={post.post.id} />
				</Grid.Column>
			</Grid.Row>

			{post.post.comments.length ? (
				<Divider>
					<Divider />
					<Grid.Row columns={1}>
						<Grid.Column>
							<h3>Comment Section</h3>
						</Grid.Column>
						{post.post.comments.map((comment) => (
							<Grid.Column key={comment.id}>
								<CommentItem comment={comment} />
							</Grid.Column>
						))}
					</Grid.Row>
				</Divider>
			) : null}
		</Grid.Column>
	);
};

const NewComment = ({ dispatch, postId }) => {
	const [commentBody, setCommentBody] = useState("");

	function handleChange(e, { value }) {
		setCommentBody(value);
	}

	function handleCreateComment() {
		setCommentBody("");
		dispatch(
			createComment({
				body: commentBody,
				postId: postId,
			}),
		);
	}

	return (
		<Form onSubmit={handleCreateComment}>
			<Form.Field>
				<label>Comment:</label>
				<Form.TextArea value={commentBody} name="body" onChange={handleChange} />
			</Form.Field>

			<Button color="black" type="submit">
				Add comment
			</Button>
		</Form>
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

			<StyledMain>
				{post ? <PostItem dispatch={dispatch} post={post} /> : <p>Loading ...</p>}
			</StyledMain>
		</>
	);
};

export default connect((state) => state)(Post);
