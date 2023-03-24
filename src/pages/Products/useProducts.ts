import { useEffect, useState, useCallback } from "react";
import { Error } from "../../components/ErrorFetch/ErrorFetch";
import type {
	ResponseData,
	ResponseDetails,
	MappedResponseData,
	Product,
} from "../../utils/utils";
import { fetchProducts, fetchDetails } from "../../utils/fetchProducts";

function mapResponse(response: ResponseData): MappedResponseData {
	return {
		page: response.page,
		perPage: response.per_page,
		total: response.total,
		totalPages: response.total_pages,
		products: response.data.map(product => ({
			id: product.id,
			name: product.name,
			year: product.year,
			color: product.color,
			pantoneValue: product.pantone_value,
		})),
	};
}

function mapResponseDetails(data: ResponseDetails): Product {
	const obj = {
		id: data.data.id,
		name: data.data.name,
		year: data.data.year,
		color: data.data.color,
		pantoneValue: data.data.pantone_value,
	};

	return obj;
}

const productsPerPage = 5;

function useProducts() {
	const [products, setProducts] = useState<Product[]>([]);
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
	const [error, setError] = useState<Error | null>(null);
	const [totalPages, setTotalPages] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchItem, setSearchItem] = useState(0);

	const fetchAllProducts = useCallback(async () => {
		try {
			// setSelectedProduct(null);
			setError(null);
			const response = await fetchProducts(productsPerPage, currentPage);

			const json = await response.json();
			const data: MappedResponseData = mapResponse(json);
			setProducts(data.products);
			setTotalPages(data?.totalPages ?? 1);
			setCurrentPage(data?.page ?? 1);
		} catch {
			setError(Error.FetchProducts);
		}
	}, [currentPage]);

	useEffect(() => {
		fetchAllProducts();
	}, [fetchAllProducts]);

	function goToNextPage() {
		setCurrentPage(page => (totalPages === currentPage ? 1 : page + 1));
	}

	function goToPreviousPage() {
		setCurrentPage(page => (currentPage === 1 ? totalPages : page - 1));
	}

	function handleSearch(item: number) {
		setSearchItem(item);
	}

	async function searchDetails(id = searchItem) {
		try {
			const response = await fetchDetails(id);
			const json = await response.json();
			setSelectedProduct(mapResponseDetails(json));
			setError(null);
		} catch {
			setError(Error.FetchItem);
		}
	}

	return {
		productsPerPage,
		totalPages,
		products,
		selectedProduct,
		error,
		currentPage,
		searchItem,
		goToPreviousPage,
		goToNextPage,
		searchDetails,
		fetchProducts,
		handleSearch,
		fetchAllProducts,
	};
}

export { useProducts, mapResponse };
