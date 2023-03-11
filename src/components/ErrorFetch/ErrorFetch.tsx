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
	let textError: string;
	type === Error.SelectItem
		? (textError = "Products can't be render")
		: (textError = "Single product can't be render");
	return (
		<div className={css.box}>
			<span className={css.span}>{textError}</span>
			<Icon>error</Icon>
		</div>
	);
}
export { ErrorFetch, Error };
