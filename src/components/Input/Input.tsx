import css from "./Input.module.css";
import React from "react";
import TextField from "@mui/material/TextField";
import { alpha, styled } from "@mui/material/styles";

type Props = {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
};
const CssTextField = styled(TextField)({
	"& label.Mui-focused": {
		color: "#1976d2",
	},
	"& .MuiInput-underline:after": {
		borderBottomColor: "#1976d2",
	},
	"& .MuiOutlinedInput-root": {
		"& fieldset": {
			borderColor: "#1976d2",
		},
		"&:hover fieldset": {
			borderColor: "#1976d2",
		},
		"&.Mui-focused fieldset": {
			borderColor: "#1976d2",
		},
	},
});

const InputCustom = styled(Input)(({ theme }) => ({
	"label + &": {
		marginTop: theme.spacing(3),
	},
}));

function Input({ onChange }: Props) {
	return (
		<>
			<CssTextField
				label='Write id of offer'
				id='filled-basic'
				onChange={onChange}
				type='number'
			/>
			{/* <TextField
				id='filled-basic'
				InputLabelProps={{
					shrink: true,
				}}
				label='Write id of offer'
				variant='filled'
				
				color='secondary'
				></TextField> */}
		</>
	);
}

export { Input };