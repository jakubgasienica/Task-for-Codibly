type Product = {
	id: number;
	name: string;
	year: number;
	color: string;
	pantoneValue: string;
};

type MappedResponseData = {
	page?: number;
	perPage?: number;
	total?: number;
	totalPages?: number;
	products: Product[];
};

type ResponseData = {
	page?: number;
	per_page?: number;
	total?: number;
	total_pages?: number;
	data: {
		id: number;
		name: string;
		year: number;
		color: string;
		pantone_value: string;
	}[];
};

type ResponseDetails = {
	data: {
		id: number;
		name: string;
		year: number;
		color: string;
		pantone_value: string;
	};
};

export type { ResponseData, ResponseDetails, MappedResponseData, Product };
