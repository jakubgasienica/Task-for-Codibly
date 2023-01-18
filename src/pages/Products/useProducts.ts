import { useEffect, useState } from "react";
import { Error } from "../../components/ErrorFetch/ErrorFetch";

type Product = {
	id: number;
	name: string;
	year: number;
	color: string;
	pantoneValue: string;
};

type ResponseData = {
	data: {
		id: number;
		name: string;
		year: number;
		color: string;
		pantone_value: string;
	}[];
};

type ResponseDataSearch = {
	data: {
		id: number;
		name: string;
		year: number;
		color: string;
		pantone_value: string;
	};
};
type ResponseDataPage = {
	total_pages: number;
};
type ResponseDataPageP = {
	page: number;
};

function mapResponse(data: ResponseData): Product[] {
	return data.data.map(data => ({
		id: data.id,
		name: data.name,
		year: data.year,
		color: data.color,
		pantoneValue: data.pantone_value,
	}));
}
function mapResponseData(data: ResponseDataPage) {
	return data.total_pages;
}
function mapResponsePage(data: ResponseDataPageP) {
	return data.page;
}

function mapResponseSearch(data: ResponseDataSearch): Product[] {
	const obj = [
		{
			id: data.data.id,
			name: data.data.name,
			year: data.data.year,
			color: data.data.color,
			pantoneValue: data.data.pantone_value,
		},
	];
	return obj;
}

function useProducts() {
	const [products, setProducts] = useState<Product[]>([]);
	const [error, setError] = useState<Error | null>(null);
	const [totalPages, setTotalPages] = useState(1);
	const [productsPerPage, setProductsPerPage] = useState(5);
	const [selectedItem, setSelectedItem] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);

	const fetchProducts = () => {
		return fetch(
			`https://reqres.in/api/products?page=1&per_page=${productsPerPage}`
		);
	};
	useEffect(() => {
		const doFetch = async () => {
			try {
				setError(null);
				const response = await fetchProducts();
				const json = await response.json();
				setProducts(mapResponse(json));
				setTotalPages(mapResponseData(json));
				setCurrentPage(mapResponsePage(json));
				console.log(currentPage);
			} catch {
				setError(Error.FetchProducts);
			}
		};

		doFetch();
	}, []);

	function goToPage(
		numberPage: number,
		currentPage: number,
		direction: "next" | "previous",
		totalPages: number
	) {
		if (currentPage === 1 && direction === "previous") {
			numberPage = 3;
		} else if (currentPage === 3 && direction === "next") {
			numberPage = 1;
		} else if (currentPage === 3 && direction === "previous") {
			numberPage = 2;
		} else if (currentPage <= totalPages) {
			if (direction === "next") {
				numberPage = currentPage + 1;
			} else if (direction === "previous") {
				numberPage = currentPage - 1;
			}
		}
		const doFetch = async () => {
			try {
				setError(null);
				const response = await fetch(
					`https://reqres.in/api/products?page=${numberPage}&per_page=5`
				);

				const json = await response.json();
				setProducts(mapResponse(json));
				setCurrentPage(mapResponsePage(json));
			} catch {
				setError(Error.FetchProducts);
			}
		};
		doFetch();
	}

	function search(id: number) {
		if (!id) {
			const doFetch = async () => {
				try {
					setError(null);
					const response = await fetch(
						`https://reqres.in/api/products?page=1&per_page=${productsPerPage}`
					);
					const json = await response.json();
					setProducts(mapResponse(json));
					setTotalPages(mapResponseData(json));
					setCurrentPage(mapResponsePage(json));
					console.log(currentPage);
				} catch {
					setError(Error.FetchProducts);
				}
			};

			doFetch();
		} else {
			const doSearch = async () => {
				try {
					const response = await fetch(`https://reqres.in/api/products/${id}`);
					const json = await response.json();
					setProducts(mapResponseSearch(json));
				} catch {
					setError(Error.FetchItem);
				}
			};
			doSearch();
		}
	}

	function selectItem(id: number, totalPages: number) {
		if (!selectedItem) {
			setSelectedItem(true);
			const doSelect = async () => {
				try {
					const response = await fetch(`https://reqres.in/api/products/${id}`);
					const json = await response.json();
					setProducts(mapResponseSearch(json));
				} catch {
					setError(Error.FetchItem);
				}
			};
			doSelect();
		} else {
			setSelectedItem(false);
			const doFetch = async () => {
				try {
					console.log(currentPage);
					const response = await fetch(
						`https://reqres.in/api/products?page=${currentPage}&per_page=5`
					);
					const json = await response.json();
					setProducts(mapResponse(json));
					setTotalPages(mapResponseData(json));
				} catch {
					setError(Error.FetchProducts);
				}
			};

			doFetch();
		}
	}

	return {
		productsPerPage,
		totalPages,
		products,
		error,
		currentPage,
		selectedItem,
		goToPage,
		search,
		selectItem,
		fetchProducts,
	};
}

export { useProducts, mapResponse };
