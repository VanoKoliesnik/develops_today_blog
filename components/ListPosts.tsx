import { useEffect } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import { Card, Icon, Loader, Message } from "semantic-ui-react";

import { fetchListPosts } from "./actions/listPosts";
import { IPost } from "../types";

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
				<Message warning>
					<Message.Header>Ooops.. Something went wrong! 😱</Message.Header>

					<p>
						Please, try again later. If error still alive, contact me{" "}
						<a
							href={`mailto:kolesnikivan1002@gmail.com?subject=DevelopsToday's Blog Error&body=Error log: ${listPosts.error}`}
						>
							contact me 📧
						</a>
					</p>
				</Message>
			) : // todo: complete view logic
			listPosts.listPosts === [] ? (
				<Message warning>
					<Message.Header>There's nothing to display. 🤔</Message.Header>

					<p>
						You can be the first to add a new post here! Just{" "}
						<Link href="/posts/new">Create Post</Link>
					</p>
				</Message>
			) : (
				<Card.Group centered stackable itemsPerRow={2}>
					{listPosts.listPosts.map((post: IPost) => (
						<Link href={`/posts/${post.id}`} key={post.id}>
							<Card>
								<Card.Content>
									<Card.Header>{post.title}</Card.Header>

									<Card.Description>{post.body}</Card.Description>
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
			)}
		</>
	);
};

export default connect((state) => state)(ListPosts);
