import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import styled from "styled-components";
import Head from "next/head";
import { Button, Divider, Form, Grid, Loader } from "semantic-ui-react";

import Header from "../../components/Header";
import CommentItem from "../../components/CommentItem";
import ErrorMessage from "../../components/ErrorMessage";

import { fetchPostById, cleanUpPost, createComment } from "../../components/actions/post";
import { IPost } from "../../types";

const StyledMain = styled.main`
	padding: 20px;
	padding-top: 90px;
`;

interface IPostItemProps {
	dispatch: Dispatch;
	post: IPost;
}

const PostItem: FC<IPostItemProps> = ({ dispatch, post }) => {
	return (
		<Grid.Column>
			<Grid.Row>
				<Grid.Column width={16}>
					<h2>{post.title}</h2>
				</Grid.Column>

				<Grid.Column width={16}>
					<p>{post.body}</p>
				</Grid.Column>
			</Grid.Row>

			<Divider />
			<Grid.Row>
				<Grid.Column>
					<NewComment dispatch={dispatch} postId={post.id} />
				</Grid.Column>
			</Grid.Row>

			{post.comments.length ? (
				<Divider>
					<Divider />
					<Grid.Row columns={1}>
						<Grid.Column>
							<h3>Comment Section</h3>
						</Grid.Column>
						{post.comments.map((comment) => (
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
		<Grid stretched fluid>
			<Grid.Column tablet={4} computer={4} largeScreen={5} widescreen={5} />
			<Grid.Column mobile={16} tablet={8} computer={8} largeScreen={6} widescreen={6}>
				<Form onSubmit={handleCreateComment}>
					<Form.Field>
						<label>Comment:</label>
						<Form.TextArea value={commentBody} name="body" onChange={handleChange} />
					</Form.Field>

					<Button color="black" type="submit">
						Add comment
					</Button>
				</Form>
			</Grid.Column>
		</Grid>
	);
};

const Post = ({ dispatch, post }) => {
	const { id } = useRouter().query;

	useEffect(() => {
		id ? dispatch(fetchPostById(+id)) : null;
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
				{post.loading ? (
					<Loader active />
				) : post.error ? (
					<ErrorMessage error={post.error} />
				) : post.post ? (
					<PostItem dispatch={dispatch} post={post.post} />
				) : null}
			</StyledMain>
		</>
	);
};

export default connect((state) => state)(Post);
