import React from "react";
import Button from "@mui/material/Button";

type Props = {
	onClick: () => void;
	textButton: string;
};

function ButtonCustom({ onClick, textButton }: Props) {
	return (
		<Button
			variant='outlined'
			onClick={() => {
				onClick();
			}}>
			{textButton}
		</Button>
	);
}

export { ButtonCustom };
