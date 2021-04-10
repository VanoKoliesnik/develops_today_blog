import { useEffect } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import { Card, Icon, Loader, Message } from "semantic-ui-react";

import { fetchListPosts } from "./actions/listPosts";
import { IPost } from "../types";

import ErrorMessage from "./ErrorMessage";

const InfoMessage = () => (
	<Message warning>
		<Message.Header>There's nothing to display. 🤔</Message.Header>
		<p>
			You can be the first to add a new post here! Just{" "}
			<Link href="/posts/new">Create Post</Link>
		</p>
	</Message>
);

const CardGroup = ({ posts }) => (
	<Card.Group centered stackable itemsPerRow={2}>
		{posts.map((post: IPost) => (
			<Link href={`/posts/${post.id}`} key={post.id}>
				<Card>
					<Card.Content>
						<Card.Header>{post.title}</Card.Header>

						<Card.Description>
							{post.body.length >= 200 ? `${post.body.slice(0, 200)} ...` : post.body}
						</Card.Description>
					</Card.Content>
					{post.comments ? (
						<Card.Content extra>
							<Icon name="comment" />
							{post.comments.length} comment
							{post.comments.length === 1 ? null : "s"}
						</Card.Content>
					) : null}
				</Card>
			</Link>
		))}
	</Card.Group>
);

const ListPosts = (props) => {
	const { dispatch, listPosts } = props;

	useEffect(() => {
		dispatch(fetchListPosts());
	}, [dispatch]);

	return (
		<>
			{listPosts.loading ? (
				<Loader active />
			) : listPosts.error ? (
				<ErrorMessage error={listPosts.error} />
			) : listPosts.listPosts.length === 0 ? (
				<InfoMessage />
			) : (
				<CardGroup posts={listPosts.listPosts} />
			)}
		</>
	);
};

export default connect((state) => state)(ListPosts);
