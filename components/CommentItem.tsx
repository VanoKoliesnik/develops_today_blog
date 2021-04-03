import styled from "styled-components";
import { Comment,Image } from "semantic-ui-react";

const StyledComment = styled(Comment)`
	margin: 20px 40px;
`;

const CommentItem = ({ comment }) => (
	<StyledComment key={comment.id}>
		<Comment.Content>
			<Image
				avatar
				fluid
				rounded={false}
				src={`https://avatar.oxro.io/avatar.svg?name=${comment.id[0].toUpperCase()}&background=1b1c1d&length=1`}
			/>

			{comment.body}
		</Comment.Content>
	</StyledComment>
);

export default CommentItem;
