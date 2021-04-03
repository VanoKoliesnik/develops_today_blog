import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import styled from "styled-components";
import Head from "next/head";
import Link from "next/link";
import { Button, Divider, Form, Grid, Loader, Message } from "semantic-ui-react";

import Header from "../../components/Header";
import CommentItem from "../../components/CommentItem";
import ErrorMessage from "../../components/ErrorMessage";

import {
	fetchPostById,
	cleanUpPost,
	createComment,
	deletePost,
} from "../../components/actions/post";

const StyledMain = styled.main`
	padding: 20px;
	padding-top: 90px;
`;

const PostItem = ({ dispatch, post, loading, error, removed }) => {
	function handleDeletePost() {
		dispatch(deletePost(post.post.id));
	}

	return (
		<Grid>
			<Grid.Row columns={1}>
				<Grid.Column>
					<h2>{post.post.title}</h2>
				</Grid.Column>

				<Grid.Column>
					<p>{post.post.body}</p>
				</Grid.Column>
			</Grid.Row>

			<Grid.Row>
				<Grid.Column>
					<Button onClick={handleDeletePost}>❌</Button>
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
		</Grid>
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
		<Grid stretched>
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

const Post = (props) => {
	const { dispatch, post } = props;
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
				) : post.removed ? (
					<Message warning>
						<Message.Header>Post has been removed! 👌</Message.Header>

						<p>
							You can write a <Link href="/posts/new">new post</Link> or{" "}
							<Link href="/">explore</Link> something else.
						</p>
					</Message>
				) : post.post ? (
					<PostItem {...props} />
				) : null}
			</StyledMain>
		</>
	);
};

export default connect((state) => state)(Post);
