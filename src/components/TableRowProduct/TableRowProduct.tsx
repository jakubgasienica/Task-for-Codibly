import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import type { Product } from "../../utils/utils";

type Props = {
	product: Product;
	handleSearch: (id: number) => void;
};

function TableRowProduct({ product, handleSearch }: Props) {
	return (
		<TableRow
			key={product.id}
			style={{ backgroundColor: product.color }}
			onClick={() => handleSearch(product.id)}>
			<TableCell align='right'>{product.id}</TableCell>
			<TableCell align='right'>{product.name}</TableCell>
			<TableCell align='right'>{product.year}</TableCell>
		</TableRow>
	);
}

export { TableRowProduct };
