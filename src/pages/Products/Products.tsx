import { useProducts } from "./useProducts";
import css from "./Products.module.css";
import { ButtonCustom } from "../../components/Button/Button";
import React from "react";
import { Input } from "../../components/Input/Input";
import { ErrorFetch, Error } from "../../components/ErrorFetch/ErrorFetch";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";

function Products() {
	const {
		products,
		totalPages,
		currentPage,
		selectedItem,
		error,
		goToPage,
		search,
		selectItem,
	} = useProducts();

	const pageNumbers: number[] = [];
	for (let i = 1; i <= Math.ceil(totalPages); i++) {
		pageNumbers.push(i);
	}

	return (
		<div className={css.container}>
			<Input onChange={e => search(parseInt(e.target.value))}></Input>

			<div>
				<Table sx={{ minWidth: 300, minHeight: 300 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell align='right'>ID</TableCell>
							<TableCell align='right'>NAME</TableCell>
							<TableCell align='right'>YEAR</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{error && <ErrorFetch type={Error.SelectItem}></ErrorFetch>}
						{products.map(product => (
							<TableRow
								key={product.id}
								style={{ backgroundColor: product.color }}
								onClick={() => selectItem(product.id, totalPages)}
								className={css.tableRow}>
								<TableCell align='right'>{product.id}</TableCell>
								<TableCell align='right'>{product.name}</TableCell>
								<TableCell align='right'>{product.year}</TableCell>
								{selectedItem && (
									<TableCell align='right'>
										<ButtonCustom
											textButton={"Back to all items"}
											onClick={() =>
												selectItem(product.id, totalPages)
											}></ButtonCustom>
									</TableCell>
								)}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			<Box
				sx={{
					height: 20,
				}}></Box>
			<ButtonGroup variant='outlined' aria-label='outlined button group'>
				<ButtonCustom
					onClick={() => {
						goToPage(totalPages, currentPage, "previous", totalPages);
					}}
					textButton={"previous"}
				/>
				<ButtonCustom
					onClick={() => {
						goToPage(totalPages, currentPage, "next", totalPages);
					}}
					textButton={"next"}
				/>
			</ButtonGroup>
		</div>
	);
}

export { Products };
