import React from "react";
import Link from "next/link";
import { Menu } from "semantic-ui-react";

export default function Header() {
	return (
		<Menu fixed="top" fluid stackable borderless>
			<Link href="/">
				<Menu.Item header>DevelopsToday's Blog 👽</Menu.Item>
			</Link>

			<Link href="/posts/new">
				<Menu.Item position="right">Create Post</Menu.Item>
			</Link>
		</Menu>
	);
}
