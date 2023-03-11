import { useProducts } from "./useProducts";
import css from "./Products.module.css";
import { ButtonCustom } from "../../components/Button/Button";
import React from "react";
import { Input } from "../../components/Input/Input";
import { ErrorFetch, Error } from "../../components/ErrorFetch/ErrorFetch";
import { TableRowProduct } from "../../components/TableRowProduct/TableRowProduct";

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
		selectedProduct,
		totalPages,
		error,
		goToNextPage,
		goToPreviousPage,
		searchDetails,
		searchItem,
		handleSearch,
	} = useProducts();

	const pageNumbers: number[] = [];
	for (let i = 1; i <= Math.ceil(totalPages); i++) {
		pageNumbers.push(i);
	}

	return (
		<div className={css.container}>
			<Input onChange={e => handleSearch(parseInt(e.target.value))} />
			<ButtonCustom
				onClick={() => searchDetails(searchItem)}
				textButton='Search'
			/>

			<div>
				{error && <ErrorFetch type={Error.SelectItem} />}
				<Table sx={{ minWidth: 300, minHeight: 300 }}>
					<TableHead>
						<TableRow>
							<TableCell align='right'>ID</TableCell>
							<TableCell align='right'>NAME</TableCell>
							<TableCell align='right'>YEAR</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{(selectedProduct && (
							<TableRowProduct
								key={selectedProduct.id}
								product={selectedProduct}
								handleSearch={searchDetails}
							/>
						)) ||
							products.map(product => (
								<TableRowProduct
									key={product.id}
									product={product}
									handleSearch={searchDetails}
								/>
							))}
					</TableBody>
				</Table>
			</div>
			{selectedProduct && (
				<ButtonCustom onClick={() => searchDetails(0)} textButton={"go back"} />
			)}
			<Box
				sx={{
					height: 20,
				}}
			/>
			<ButtonGroup variant='outlined'>
				<ButtonCustom
					onClick={() => {
						goToPreviousPage();
					}}
					textButton={"previous"}
				/>
				<ButtonCustom
					onClick={() => {
						goToNextPage();
					}}
					textButton={"next"}
				/>
			</ButtonGroup>
		</div>
	);
}

export { Products };
