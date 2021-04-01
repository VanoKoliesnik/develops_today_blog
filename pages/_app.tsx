import React from "react";
import "normalize.css";

const WrappedApp = ({ Component, pageProps }) => {
	return <Component {...pageProps} />;
};

export default WrappedApp;
