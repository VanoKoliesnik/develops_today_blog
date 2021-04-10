import { Message } from "semantic-ui-react";

const ErrorMessage = (error) => (
	<Message error>
		<Message.Header>Ooops.. Something went wrong! 😱</Message.Header>

		<p>
			Please, try again later. If error still alive, contact me{" "}
			<a
				href={`mailto:kolesnikivan1002@gmail.com?subject=DevelopsToday's Blog Error&body=Error log: ${JSON.stringify(
					error,
				)}`}
			>
				contact me 📧
			</a>
		</p>
	</Message>
);

export default ErrorMessage;
