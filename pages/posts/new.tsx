import { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Container, Form, Button } from "semantic-ui-react";

import Header from "../../components/Header";

import { createPost } from "../../components/actions/post";

const StyledMain = styled.main`
	margin-top: 80px;
	padding: 20px;
`;

const NewPost = ({ dispatch }) => {
	const [post, setPost] = useState({
		title: "",
		body: "",
	});
	function createNewPost() {
		// TODO: make this works
		console.log("todo");
	}

	return (
		<>
			<Header />

			<StyledMain>
				<Container>
					<Form>
						<Form.Field>
							<label>Title:</label>
							<Form.Input value={post.title} />
						</Form.Field>

						<Form.Field>
							<label>Content:</label>
							<Form.TextArea value={post.body} />
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
