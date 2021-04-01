import React from "react";
import styled from "styled-components";
import Head from "next/head";

import Header from "../components/Header";
import ListPosts from "../components/ListPosts";

const StyledMain = styled.main`
	padding: 20px;
	padding-top: 80px;
	height: 100vh;
`;

const Index = () => {
	return (
		<>
			<Head>
				<title>Latest Posts</title>
			</Head>

			<Header />

			<StyledMain>
				<h2>Latest Posts</h2>

				<ListPosts />
			</StyledMain>
		</>
	);
};

export default Index;
