import { useEffect } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import { Card } from "semantic-ui-react";

import { fetchListPosts } from "./actions/listPosts";
import { IPost } from "../types";

const ListPosts = (props) => {
	const { dispatch, listPosts } = props;

	useEffect(() => {
		dispatch(fetchListPosts());
	}, [dispatch]);

	return (
		<Card.Group centered stackable itemsPerRow={2}>
			{listPosts.listPosts.map((post: IPost) => (
				<Link href={`/posts/${post.id}`} key={post.id}>
					<Card>
						<Card.Content>
							<Card.Header>{post.title}</Card.Header>
							<Card.Description>{post.body}</Card.Description>
						</Card.Content>
					</Card>
				</Link>
			))}
		</Card.Group>
	);
};

export default connect((state) => state)(ListPosts);
