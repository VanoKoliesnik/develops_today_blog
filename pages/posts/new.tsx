import { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Container, Form, Button } from "semantic-ui-react";
import Head from "next/head";

import Header from "../../components/Header";

import { createPost } from "../../components/actions/post";

const StyledMain = styled.main`
	padding: 20px;
	padding-top: 90px;
`;

const NewPost = ({ dispatch }) => {
	const [post, setPost] = useState({
		title: "",
		body: "",
	});

	function handleChange(e, { name, value }) {
		setPost({
			...post,
			[name]: value,
		});
	}

	function handleSubmit() {
		setPost({
			title: "",
			body: "",
		});
		dispatch(createPost(post));
	}

	return (
		<>
			<Head>
				<title>Create Post</title>
			</Head>

			<Header />

			<StyledMain>
				<Container>
					<Form onSubmit={handleSubmit}>
						<Form.Field>
							<label>Title:</label>
							<Form.Input value={post.title} name="title" onChange={handleChange} />
						</Form.Field>

						<Form.Field>
							<label>Content:</label>
							<Form.TextArea value={post.body} name="body" onChange={handleChange} />
						</Form.Field>
						<Button color="black" type="submit">
							Create!
						</Button>
					</Form>
				</Container>
			</StyledMain>
		</>
	);
};

export default connect((state) => state)(NewPost);
