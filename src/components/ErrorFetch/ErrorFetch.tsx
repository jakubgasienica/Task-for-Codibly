import Icon from "@mui/material/Icon";
import React from "react";
import css from "./ErrorFetch.module.css";

enum Error {
	SelectItem,
	FetchProducts,
	FetchItem,
}

type Props = {
	type: Error;
};

function ErrorFetch({ type }: Props) {
	return (
		<div className={css.box}>
			<span className={css.span}>Products can't be render</span>
			<Icon>error</Icon>
		</div>
	);
}
export { ErrorFetch, Error };
