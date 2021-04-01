import React from "react";
import { wrapper } from "../store";
import "normalize.css";
import "semantic-ui-css/semantic.min.css";

const WrappedApp = ({ Component, pageProps }) => {
	return <Component {...pageProps} />;
};

export default wrapper.withRedux(WrappedApp);
