const fetchProducts = (productsPerPage: number, page = 1) => {
	return fetch(
		`https://reqres.in/api/products?page=${page}&per_page=${productsPerPage}`
	);
};
const fetchDetails = (id: number) => {
	return fetch(`https://reqres.in/api/products/${id}`);
};

export { fetchProducts, fetchDetails };
